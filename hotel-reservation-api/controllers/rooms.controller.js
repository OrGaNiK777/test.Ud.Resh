import Room from '../models/room.js';
import Booking from '../models/booking.js';
import { Op } from 'sequelize';
import sequelize from '../db.js';

export async function getAllRooms(req, res) {
  try {
    // Получаем все комнаты из базы данных
    const rooms = await Room.findAll();
    return res.json(rooms);
  } catch (err) {
    // Ошибка сервера
    return res.status(500).json({ error: err.message });
  }
}

export async function getAvailableRooms(req, res) {
  const { startDate, endDate } = req.query;

  // Проверка наличия обеих дат
  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'Нужно указать startDate и endDate (YYYY-MM-DD)' });
  }

  // Проверка формата дат
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
    return res.status(400).json({ error: 'Даты должны быть в формате YYYY-MM-DD' });
  }

  // Проверка валидности диапазона дат (конец не раньше начала)
  if (new Date(startDate) >= new Date(endDate)) {
    return res.status(400).json({ error: 'Дата выезда должна быть позже даты заезда' });
  }

  try {
    const availableRooms = await sequelize.transaction(async (t) => {
      const bookedRooms = await Booking.findAll({
        where: {
          startDate: { [Op.lte]: endDate },
          endDate: { [Op.gte]: startDate }
        },
        attributes: ['roomNumber']
      });

      if (bookedRooms.length === 0) {
        return null;
      }

      const bookedRoomNumbers = bookedRooms.map(b => b.roomNumber);
      const freeRooms = await Room.findAll({
        where: {
          roomNumber: { [Op.notIn]: bookedRoomNumbers }
        },
        transaction: t
      });

      return freeRooms;
    });

    if (availableRooms === null) {
      return res.json({ message: 'Все комнаты за указанный период свободны' });
    }

    return res.json(availableRooms);

  } catch (error) {
    console.error('Ошибка при поиске свободных комнат:', error.message);
    return res.status(500).json({ error: 'Ошибка сервера' });
  }

}
