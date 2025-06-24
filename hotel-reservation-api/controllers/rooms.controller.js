import Room from '../models/room.js';
import Booking from '../models/booking.js';
import { Op } from 'sequelize';


export const getAllRooms = [
  async (req, res) => {
    try {
      const rooms = await Room.findAll();
      res.json(rooms);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];


export async function getAvailableRooms(req, res) {
  const { startDate, endDate } = req.body;
  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'Необходимо указать startDate и endDate в формате YYYY-MM-DD' });
  }

  try {

    const occupiedCondition = {
      [Op.and]: [
        {
          startDate: { [Op.lte]: endDate }
        },
        {
          endDate: { [Op.gte]: startDate }
        }
      ]
    };


    const bookedRooms = await Booking.findAll({
      attributes: ['roomNumber'],
      where: occupiedCondition
    });


    const bookedRoomNumbers = bookedRooms.map(room => room.roomNumber);
    console.log(bookedRoomNumbers)

    const allRooms = await Room.findAll();


    let availableRooms = allRooms.filter(room =>
      !bookedRoomNumbers.includes(room.roomNumber)
    );
    console.log(allRooms)

    availableRooms.sort((a, b) => a.number - b.number);


    res.status(200).json(availableRooms);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}