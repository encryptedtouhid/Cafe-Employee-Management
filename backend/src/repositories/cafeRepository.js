const Cafe = require('../models/cafe');
const Employee = require('../models/employee');
const EmployeeCafe = require('../models/employeeCafe');
const { sequelize } = require('../config/database');
const { Op } = require('sequelize');

class CafeRepository {
  async findAll(location = null) {
    const whereClause = location ? { location } : {};
    
    const cafes = await Cafe.findAll({
      where: whereClause,
      attributes: ['id', 'name', 'description', 'logo', 'location'],
      include: [
        {
          model: Employee,
          attributes: [],
          through: { attributes: [] }
        }
      ],
      group: ['Cafe.id'],
      order: [
        [sequelize.literal('COUNT(DISTINCT "Employees"."id")'), 'DESC']
      ]
    });

    // Get employee count for each cafe
    const cafesWithEmployeeCount = await Promise.all(
      cafes.map(async (cafe) => {
        const employeeCount = await EmployeeCafe.count({
          where: { cafe_id: cafe.id }
        });

        return {
          id: cafe.id,
          name: cafe.name,
          description: cafe.description,
          logo: cafe.logo,
          location: cafe.location,
          employees: employeeCount
        };
      })
    );

    return cafesWithEmployeeCount;
  }

  async findById(id) {
    return await Cafe.findByPk(id);
  }

  async create(cafeData) {
    return await Cafe.create(cafeData);
  }

  async update(id, cafeData) {
    const cafe = await Cafe.findByPk(id);
    if (!cafe) return null;
    
    return await cafe.update(cafeData);
  }

  async delete(id) {
    const cafe = await Cafe.findByPk(id);
    if (!cafe) return false;
    
    const transaction = await sequelize.transaction();
    
    try {
      // Delete all employee-cafe associations for this cafe
      await EmployeeCafe.destroy({
        where: { cafe_id: id },
        transaction
      });
      
      // Delete the cafe itself
      await cafe.destroy({ transaction });
      
      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = new CafeRepository();