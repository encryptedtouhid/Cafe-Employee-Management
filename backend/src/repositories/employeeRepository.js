const Employee = require('../models/employee');
const Cafe = require('../models/cafe');
const EmployeeCafe = require('../models/employeeCafe');
const { sequelize } = require('../config/database');
const { Op, literal, fn, col } = require('sequelize');

class EmployeeRepository {
  async findAll(cafeId = null) {
    try {
      // Get all employees first
      const query = {
        attributes: [
          'id',
          'name',
          'email_address',
          'phone_number',
          'gender'
        ],
        include: []
      };

      // Apply cafe filter if provided
      if (cafeId) {
        query.include.push({
          model: Cafe,
          through: EmployeeCafe,
          where: { id: cafeId }
        });
      }

      const employees = await Employee.findAll(query);

      // For each employee, get cafe information using a separate query
      const transformedEmployees = [];

      for (const employee of employees) {
        // Using raw query to get cafe info due to potential issues with associations
        const [cafes] = await sequelize.query(`
          SELECT c.id, c.name, ec.start_date 
          FROM cafes c
          JOIN employee_cafe ec ON c.id = ec.cafe_id
          WHERE ec.employee_id = :employeeId
        `, {
          replacements: { employeeId: employee.id },
          type: sequelize.QueryTypes.SELECT
        });

        let employeeData = {
          id: employee.id,
          name: employee.name,
          email_address: employee.email_address,
          phone_number: employee.phone_number,
          gender: employee.gender,
          days_worked: 0,
          cafe: ''
        };

        // If cafe info found, add it to employee data
        if (cafes) {
          const startDate = new Date(cafes.start_date);
          const currentDate = new Date();
          const daysWorked = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));

          employeeData.days_worked = daysWorked + 1;
          employeeData.cafe = cafes.name;
        }

        transformedEmployees.push(employeeData);
      }

      // Sort by days worked (descending)
      return transformedEmployees.sort((a, b) => b.days_worked - a.days_worked);
    } catch (error) {
      console.error("Error in findAll:", error);
      throw error;
    }
  }

  async findById(id) {
    try {
      const employee = await Employee.findByPk(id);

      if (!employee) return null;

      // Get cafe info using direct SQL query
      const [cafe] = await sequelize.query(`
        SELECT c.id, c.name, ec.start_date 
        FROM cafes c
        JOIN employee_cafe ec ON c.id = ec.cafe_id
        WHERE ec.employee_id = :employeeId
      `, {
        replacements: { employeeId: id },
        type: sequelize.QueryTypes.SELECT
      });

      // Format the response
      let response = {
        id: employee.id,
        name: employee.name,
        email_address: employee.email_address,
        phone_number: employee.phone_number,
        gender: employee.gender,
        days_worked: 0,
        cafe: ''
      };

      // Add cafe information if found
      if (cafe) {
        const startDate = new Date(cafe.start_date);
        const currentDate = new Date();

        // Calculate days worked
        const daysWorked = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));

        response.days_worked = daysWorked;
        response.cafe = cafe.name;
      }

      return response;
    } catch (error) {
      console.error("Error in findById:", error);
      throw error;
    }
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

      // Get the complete employee data with cafe
      return await this.findById(employee.id);
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

      // Get the complete employee data with cafe
      return await this.findById(id);
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