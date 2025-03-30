const Employee = require('../models/employee');
const Cafe = require('../models/cafe');
const EmployeeCafe = require('../models/employeeCafe');
const { sequelize } = require('../config/database');
const { Op, literal, fn, col } = require('sequelize');

class EmployeeRepository {
  async findAll(cafeId = null) {
    const includeOptions = [
      {
        model: Cafe,
        through: {
          attributes: ['start_date']
        }
      }
    ];

    let whereCondition = {};
    if (cafeId) {
      includeOptions[0].where = { id: cafeId };
    }

    const employees = await Employee.findAll({
      attributes: [
        'id',
        'name',
        'email_address',
        'phone_number',
        'gender'
      ],
      include: includeOptions
    });

    // Transform the data to match the required response format
    const transformedEmployees = employees.map(employee => {
      // If the employee is assigned to a cafe
      if (employee.Cafes && employee.Cafes.length > 0) {
        const cafe = employee.Cafes[0];
        const startDate = new Date(cafe.EmployeeCafe.start_date);
        const currentDate = new Date();

        // Calculate days worked (days between start date and current date)
        const daysWorked = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));

        return {
          id: employee.id,
          name: employee.name,
          email_address: employee.email_address,
          phone_number: employee.phone_number,
          gender: employee.gender,
          days_worked: daysWorked,
          cafe: cafe.name
        };
      } else {
        // If the employee is not assigned to any cafe
        return {
          id: employee.id,
          name: employee.name,
          email_address: employee.email_address,
          phone_number: employee.phone_number,
          gender: employee.gender,
          days_worked: 0,
          cafe: ''
        };
      }
    });

    // Sort by days worked (descending)
    return transformedEmployees.sort((a, b) => b.days_worked - a.days_worked);
  }

  async findById(id) {
    return await Employee.findByPk(id, {
      include: [
        {
          model: Cafe,
          through: { attributes: ['start_date'] }
        }
      ]
    });
  }

  async create(employeeData, cafeId = null) {
    const transaction = await sequelize.transaction();

    try {
      // Create the employee
      const employee = await Employee.create(employeeData, { transaction });

      // If cafeId is provided, create the employee-cafe association
      if (cafeId) {
        await EmployeeCafe.create({
          employee_id: employee.id,
          cafe_id: cafeId,
          start_date: new Date()
        }, { transaction });
      }

      await transaction.commit();
      return employee;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async update(id, employeeData, cafeId = null) {
    const transaction = await sequelize.transaction();

    try {
      const employee = await Employee.findByPk(id);
      if (!employee) {
        await transaction.rollback();
        return null;
      }

      // Update employee data
      await employee.update(employeeData, { transaction });

      // If cafeId is provided, update the employee-cafe association
      if (cafeId) {
        // Check if employee is already assigned to a cafe
        const existingAssignment = await EmployeeCafe.findOne({
          where: { employee_id: id }
        });

        if (existingAssignment) {
          // If the cafe is different, update the assignment
          if (existingAssignment.cafe_id !== cafeId) {
            await existingAssignment.update({
              cafe_id: cafeId,
              start_date: new Date()
            }, { transaction });
          }
        } else {
          // Create a new assignment
          await EmployeeCafe.create({
            employee_id: id,
            cafe_id: cafeId,
            start_date: new Date()
          }, { transaction });
        }
      }

      await transaction.commit();
      return employee;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async delete(id) {
    const employee = await Employee.findByPk(id);
    if (!employee) return false;

    const transaction = await sequelize.transaction();

    try {
      // Delete employee-cafe associations
      await EmployeeCafe.destroy({
        where: { employee_id: id },
        transaction
      });

      // Delete the employee
      await employee.destroy({ transaction });

      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = new EmployeeRepository();