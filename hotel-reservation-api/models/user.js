import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,            
    },
    field: "firstname"
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,            
    },
    field: "lastname"
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,             
      notEmpty: true,
    },
  },
  isVip: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: "isvip"
  },
}, {
  schema: 'hotel'
});

export default User;
