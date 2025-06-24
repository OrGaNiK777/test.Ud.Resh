import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Room = sequelize.define('Room', {
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
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,              
    field: 'name',
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,                  
    },
    field: 'capacity',
  },
  description: {
    type: DataTypes.TEXT,      
    allowNull: true,
    field: 'description',
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,                  
    },
    field: 'price',
  },
}, {
  schema: 'hotel',
  timestamps: false,           
});

export default Room;
