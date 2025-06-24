import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  roomNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'roomnumber',
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'startdate',
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'enddate',
  },
  guestName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "guestname"
  },
  isVip: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'isvip',
  },
    clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'clientid',
  }
}, {
  schema: 'hotel',
});

export default Booking;
