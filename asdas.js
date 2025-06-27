import User from '../models/User.js';
import fetch from 'node-fetch';
import sequelize from '../db.js';

const sendUserNotFound = (res) => res.status(404).json({ message: 'Пользователь не найден' });

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export async function registerUser(req, res) {
  const { email, firstName, lastName } = req.body;

  // Исправлено условие проверки обязательных полей
  if (!email || !firstName || !lastName) {
    return res.status(400).json({ error: 'Необходимо указать email, firstName, lastName' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Некорректный формат email' });
  }

  try {
    const user = await sequelize.transaction(async (t) => {
      const existingUser = await User.findOne({
        where: { email },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (existingUser) {
        throw new Error(`Пользователь с Email ${email} уже существует`);
      }

      async function fetchWithTimeout(url, timeoutMs) {
        return Promise.race([
          fetch(url),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Время ожидания истекло')), timeoutMs)),
        ]);
      }

      let isVip = false;
      try {
        const vipResponse = await fetchWithTimeout(`https://api.example.com/api/vip-status/${email}`, 2000);
        if (!vipResponse.ok) throw new Error(`Ошибка сервера: ${vipResponse.statusText}`);

        const vipData = await vipResponse.json();
        isVip = vipData.isVip;
      } catch (error) {
        console.error('Ошибка при запросе VIP статуса:', error.message);
      }

      return User.create({ email, firstName, lastName, isVip }, { transaction: t });
    });

    return res.status(201).json(user);

  } catch (err) {
    if (err.message.includes('Пользователь с Email')) {
      return res.status(409).json({ message: err.message });
    }
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}

export async function registerUserVip(req, res, next) {
  const { email, isVip } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Необходимо указать email' });
  }
  if (typeof isVip !== 'boolean') {
    return res.status(400).json({ error: 'Поле isVip должно быть true или false' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Некорректный формат email' });
  }

  try {
    const result = await sequelize.transaction(async (t) => {
      const user = await User.findOne({
        where: { email },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (!user) throw new Error('Пользователь не найден');

      user.isVip = isVip;
      await user.save({ transaction: t });

      return { email, isVip };
    });

    return res.json(result);

  } catch (err) {
    if (err.message === 'Пользователь не найден') {
      return sendUserNotFound(res);
    }
    next(err);
  }
}

export async function getUserById(req, res, next) {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) throw new Error('Пользователь не найден');

    return res.json(user);
  } catch (err) {
    if (err.message === 'Пользователь не найден') {
      return sendUserNotFound(res);
    }
    next(err);
  }
}
