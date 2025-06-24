import Booking from '../models/booking.js';
import { Op } from 'sequelize';
import User from '../models/User.js'; 



export async function bookRoom(req, res) {
  const { roomNumber, startDate, endDate, clientId } = req.body;

  if (!roomNumber || !startDate || !endDate || !clientId) {
    return res.status(400).json({ error: 'Необходимо указать roomNumber, startDate(YYYY-MM-DD), endDate(YYYY-MM-DD) и clientId' });
  }

  
  if (new Date(startDate) >= new Date(endDate)) {
    return res.status(400).json({ error: 'Дата выезда должна быть позже даты заезда' });
  }

  try {
    
    const user = await User.findByPk(clientId);
    console.log(clientId)
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    const guestName = `${user.firstName} ${user.lastName}`;
    const isVip = user.isVip;

    
    const overlappingBooking = await Booking.findOne({
      where: {
        roomNumber,
        startDate: { [Op.lt]: endDate },
        endDate: { [Op.gt]: startDate }
      }
    });

    if (overlappingBooking) {
      return res.status(409).json({ error: 'Номер уже забронирован на указанный период' });
    }

    
    const booking = await Booking.create({
      roomNumber,
      startDate: startDate,
      endDate: endDate,
      guestName: guestName,
      isVip,
      clientId: clientId,
    });

    res.status(201).json(booking);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function cancelBooking(req, res) {
  const { bookingId } = req.params;

  try {
    const destroyedRows = await Booking.destroy({ where: { id: bookingId } });

    if (destroyedRows) {
      res.json({ message: 'Бронирование отменено' });
    } else {
      res.status(404).json({ message: 'Бронирование не найдено' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getAllBookings(req, res) {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



