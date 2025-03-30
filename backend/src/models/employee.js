const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const crypto = require('crypto');

const generateEmployeeId = () => {
  // Generate random alphanumeric string of length 7
  const randomAlphaNumeric = crypto.randomBytes(4)
    .toString('hex')
    .substring(0, 7)
    .toUpperCase();
  
  return `UI${randomAlphaNumeric}`;
};

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.STRING(9),
    primaryKey: true,
    defaultValue: generateEmployeeId,
    allowNull: false,
    validate: {
      is: {
        args: /^UI[A-Z0-9]{7}$/,
        msg: 'Employee ID must be in format UIXXXXXXX where X is alphanumeric'
      }
    }
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Employee name is required'
      },
      len: {
        args: [6, 10],
        msg: 'Employee name must be between 6 and 10 characters'
      }
    }
  },
  email_address: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Invalid email format'
      }
    }
  },
  phone_number: {
    type: DataTypes.STRING(8),
    allowNull: false,
    validate: {
      is: {
        args: /^[89]\d{7}$/,
        msg: 'Phone number must start with 8 or 9 and have 8 digits'
      }
    }
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female'),
    allowNull: false,
    validate: {
      isIn: {
        args: [['Male', 'Female']],
        msg: 'Gender must be either Male or Female'
      }
    }
  }
}, {
  tableName: 'employees',
  timestamps: true,
  underscored: true
});

module.exports = Employee;