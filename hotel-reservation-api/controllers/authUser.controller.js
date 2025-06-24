import bcrypt from 'bcrypt';
import { generateToken } from '../middlewares/auth.middleware.js';
import User from '../models/User.js';
import httpConstants from 'http2';

export async function loginUser(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(httpConstants.HTTP_STATUS_UNAUTHORIZED).json({
        message: 'Пользователь не найден или неверный email/пароль'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(httpConstants.HTTP_STATUS_UNAUTHORIZED).json({
        message: 'Пользователь не найден или неверный email/пароль'
      });
    }

    const token = generateToken(user.id);

    res.cookie('jwt', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: true
    });

    const { password: _, ...userData } = user.toObject();

    res.status(httpConstants.HTTP_STATUS_OK).json(userData);
  } catch (err) {
    next(err);
  }
}

const SALT_ROUNDS = 10;

export async function registerUser(req, res, next) {
  const { email, password, firstname, lastname } = req.body;

  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({ firstname, lastname, email, password: hash });

    res.status(httpConstants.HTTP_STATUS_CREATED).json({
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname
    });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ message: `Пользователь с Email ${email} уже существует` });
    }
    next(err);
  }
}