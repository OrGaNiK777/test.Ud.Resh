import Room from '../models/room.js';
import Booking from '../models/booking.js';
import { Op } from 'sequelize';
import sequelize from '../db.js';

export async function getAllRooms(req, res) {
  try {
    // Берём все комнаты из базы
    const rooms = await Room.findAll();
    return res.json(rooms);
  } catch (err) {
    // Если ошибка — отвечаем с ошибкой сервера
    return res.status(500).json({ error: err.message });
  }
}

export async function getAvailableRooms(req, res) {
  const { startDate, endDate } = req.body;

  // Проверяем, что даты есть
  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'Нужно указать startDate и endDate (YYYY-MM-DD)' });
  }

  // Проверяем формат дат
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
    return res.status(400).json({ error: 'Даты должны быть в формате YYYY-MM-DD' });
  }

  // Проверяем, что выезд позже заезда
  if (new Date(startDate) >= new Date(endDate)) {
    return res.status(400).json({ error: 'Дата выезда должна быть позже даты заезда' });
  }

  try {
    // Ищем свободные комнаты в транзакции
    const availableRooms = await sequelize.transaction(async (t) => {
      // Находим комнаты, которые заняты в этот период
      const bookedRooms = await Booking.findAll({
        where: {
          startDate: { [Op.lte]: endDate },
          endDate: { [Op.gte]: startDate }
        },
        attributes: ['roomNumber'],
        lock: t.LOCK.UPDATE,
        transaction: t
      });

      // Составляем список занятых комнат
      const bookedRoomNumbers = bookedRooms.map(b => b.roomNumber);

      // Получаем все комнаты, которых нет в списке занятых
      const rooms = await Room.findAll({
        where: {
          roomNumber: bookedRoomNumbers.length ? { [Op.notIn]: bookedRoomNumbers } : undefined
        },
        transaction: t
      });

      // Возвращаем свободные комнаты
      return rooms;
    });

    // Отдаём результат клиенту
    return res.json(availableRooms);

  } catch (error) {
    // Если ошибка — пишем в консоль и отвечаем ошибкой сервера
    console.error('Ошибка при поиске свободных комнат:', error);
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
}
