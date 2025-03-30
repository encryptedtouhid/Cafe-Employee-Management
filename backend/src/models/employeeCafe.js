const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Employee = require('./employee');
const Cafe = require('./cafe');

const EmployeeCafe = sequelize.define('EmployeeCafe', {
  employee_id: {
    type: DataTypes.STRING(9),
    allowNull: false,
    references: {
      model: Employee,
      key: 'id'
    }
  },
  cafe_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Cafe,
      key: 'id'
    }
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'employee_cafe',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['employee_id']
    }
  ]
});

// Set up associations
Cafe.belongsToMany(Employee, {
  through: EmployeeCafe,
  foreignKey: 'cafe_id',
  otherKey: 'employee_id'
});

Employee.belongsToMany(Cafe, {
  through: EmployeeCafe,
  foreignKey: 'employee_id',
  otherKey: 'cafe_id'
});

// The unique index on employee_id ensures one employee can work in only one cafe at a time

module.exports = EmployeeCafe;