import Booking from '../models/booking.js';
import { Op } from 'sequelize';
import User from '../models/User.js';
import sequelize from '../db.js';

export async function bookRoom(req, res) {
  const { roomNumber, startDate, endDate, clientId } = req.body;

  // Проверяем обязательные поля
  if (!roomNumber || !startDate || !endDate || !clientId) {
    return res.status(400).json({ error: 'Необходимо указать roomNumber, startDate, endDate и clientId' });
  }

  // Проверяем корректность даты
  if (new Date(startDate) >= new Date(endDate)) {
    return res.status(400).json({ error: 'Дата выезда должна быть позже даты заезда' });
  }

  try {
    const booking = await sequelize.transaction(async (t) => {
      // Проверяем, что пользователь существует
      const user = await User.findByPk(clientId, { transaction: t });
      if (!user) throw new Error('Пользователь не найден');

      // Созаём строку имени гостя
      const guestName = `${user.firstName} ${user.lastName}`;
      const isVip = user.isVip;

      // Проверяем, что комната свободна в запрошенный период
      const overlappingBooking = await Booking.findOne({
        where: {
          roomNumber,
          startDate: { [Op.lt]: endDate },
          endDate: { [Op.gt]: startDate }
        },
        transaction: t
      });

      if (overlappingBooking) throw new Error('Номер уже забронирован на указанный период');

      // Создаём бронирование
      return Booking.create({
        roomNumber,
        startDate,
        endDate,
        guestName,
        isVip,
        clientId,
      }, { transaction: t });
    });

    return res.status(201).json(booking);

  } catch (err) {
    if (err.message === 'Пользователь не найден') {
      return res.status(404).json({ error: err.message });
    }
    if (err.message === 'Номер уже забронирован на указанный период') {
      return res.status(409).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}

export async function cancelBooking(req, res) {
  const { bookingId } = req.params;

  try {
    const deleted = await Booking.destroy({ where: { id: bookingId } });

    if (deleted) {
      return res.json({ message: 'Бронирование отменено' });
    } else {
      return res.status(404).json({ message: 'Бронирование не найдено' });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function getAllBookings(req, res) {
  try {
    const bookings = await Booking.findAll();
    return res.json(bookings);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
