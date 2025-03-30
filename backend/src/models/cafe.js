const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const Cafe = sequelize.define('Cafe', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Cafe name is required'
      },
      len: {
        args: [6, 10],
        msg: 'Cafe name must be between 6 and 10 characters'
      }
    }
  },
  description: {
    type: DataTypes.STRING(256),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Description is required'
      },
      len: {
        args: [0, 256],
        msg: 'Description cannot exceed 256 characters'
      }
    }
  },
  logo: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Location is required'
      }
    }
  }
}, {
  tableName: 'cafes',
  timestamps: true,
  underscored: true
});

module.exports = Cafe;