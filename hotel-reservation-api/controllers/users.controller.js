import User from '../models/User.js';
const sendUserNotFound = (res) => res.status(404).json({ message: 'Пользователь не найден' });

export async function registerUser(req, res, next) {
  const { email, firstName, lastName } = req.body;

  if (!email || !firstName || !lastName) {
    return res.status(400).json({ error: 'Необходимо указать email, firstName, lastName' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: `Пользователь с Email ${email} уже существует` });
    }



    async function fetchWithTimeout(url, timeoutMs) {
      return Promise.race([
        fetch(url),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Время ожидания истекло')), timeoutMs))
      ]);
    }
    let isVip = false
    try {
      const vipResponse = await fetchWithTimeout(`https://api.example.com/api/vip-status/${email}`, 2000);
      if (!vipResponse.ok) throw new Error(`Ошибка сервера: ${vipResponse.statusText}`);

      const vipData = await vipResponse.json();

      isVip = vipData.isvip;
    } catch (error) {
      console.error("Ошибка:", error.message);
    }

    const user = await User.create({ email, firstName, lastName, isVip });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function registerUserVip(req, res, next) {
  const { email, isVip } = req.body;

  if (typeof isVip !== 'boolean') {
    return res.status(400).json({ error: 'Поле isvip должно быть true или false' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return sendUserNotFound(res);

    user.isVip = isVip;
    await user.save();

    res.json({ email, isVip });
  } catch (err) {
    next(err);
  }
}

export async function getUserById(req, res, next) {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) return sendUserNotFound(res);

    res.json(user);
  } catch (err) {
    next(err);
  }
}


