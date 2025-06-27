import User from '../models/User.js';
import fetch from 'node-fetch';
import sequelize from '../db.js';

const sendUserNotFound = (res) => res.status(404).json({ message: 'Пользователь не найден' });

// Проверяем, что email правильный
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// fetch с таймаутом, чтобы не ждать слишком долго
async function fetchWithTimeout(url, timeoutMs) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Время ожидания истекло')), timeoutMs))
  ]);
}

// Регистрация пользователя
export async function registerUser(req, res) {
  const { email, firstName, lastName } = req.body;

  // Проверяем нужные данные
  if (!email || !firstName || !lastName) {
    return res.status(400).json({ error: 'Нужно email, имя и фамилию' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Плохой формат email' });
  }

  try {
    const user = await sequelize.transaction(async (t) => {
      // Проверяем, есть ли уже такой email
      const exist = await User.findOne({ where: { email }, transaction: t, lock: t.LOCK.UPDATE });
      if (exist) throw new Error('Пользователь с таким email уже есть');

      let isVip = false;
      try {
        const resVip = await fetchWithTimeout(`https://api.example.com/api/vip-status/${email}`, 2000);
        if (resVip.ok) {
          const data = await resVip.json();
          isVip = data.isVip;
        }
      } catch {}

      // Создаём пользователя
      return User.create({ email, firstName, lastName, isVip }, { transaction: t });
    });

    // Возвращаем нового пользователя
    return res.status(201).json(user);
  } catch (err) {
    // Если email занят - ошибка 409
    if (err.message.includes('Пользователь с таким email уже есть')) {
      return res.status(409).json({ message: err.message });
    }
    // Иначе ошибка сервера
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
}

// Обновление VIP-статуса пользователя
export async function registerUserVip(req, res, next) {
  const { email, isVip } = req.body;

  // Проверяем данные
  if (!email) return res.status(400).json({ error: 'Нужен email' });
  if (typeof isVip !== 'boolean') return res.status(400).json({ error: 'isVip должно быть true или false' });
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Плохой формат email' });

  try {
    const result = await sequelize.transaction(async (t) => {
      const user = await User.findOne({ where: { email }, transaction: t, lock: t.LOCK.UPDATE });
      if (!user) throw new Error('Пользователь не найден');

      user.isVip = isVip;
      await user.save({ transaction: t });

      return { email, isVip };
    });

    return res.json(result);
  } catch (err) {
    if (err.message === 'Пользователь не найден') return sendUserNotFound(res);
    next(err);
  }
}

// Получить пользователя по ID
export async function getUserById(req, res, next) {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) return sendUserNotFound(res);
    return res.json(user);
  } catch (err) {
    next(err);
  }
}
