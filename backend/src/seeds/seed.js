require('dotenv').config();
const { sequelize } = require('../config/database');
const Cafe = require('../models/cafe');
const Employee = require('../models/employee');
const EmployeeCafe = require('../models/employeeCafe');
const logger = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');

// Seed data
const cafes = [
    {
        id: uuidv4(),
        name: 'JavaBeans',
        description: 'A cozy cafe specializing in premium coffee and pastries.',
        logo: 'uploads/logos/javabeans.jpg',
        location: 'Central'
    },
    {
        id: uuidv4(),
        name: 'CuppaJoy',
        description: 'Modern cafe with artisanal teas and organic snacks.',
        logo: 'uploads/logos/cuppajoy.jpg',
        location: 'East'
    },
    {
        id: uuidv4(),
        name: 'BeanHere',
        description: 'Hip cafe with specialty coffee and all-day breakfast.',
        logo: 'uploads/logos/beanhere.jpg',
        location: 'West'
    },
    {
        id: uuidv4(),
        name: 'TeaTime',
        description: 'Elegant tea house with a wide selection of teas.',
        logo: 'uploads/logos/teatime.jpg',
        location: 'North'
    },
    {
        id: uuidv4(),
        name: 'BrewHub',
        description: 'Coffee shop with workspace and fast WiFi.',
        logo: 'uploads/logos/brewhub.jpg',
        location: 'Central'
    }
];

const employees = [
    {
        id: 'UI1234ABC',
        name: 'John Doe',
        email_address: 'john.doe@example.com',
        phone_number: '98765432',
        gender: 'Male'
    },
    {
        id: 'UI2345BCD',
        name: 'Jane Smith',
        email_address: 'jane.smith@example.com',
        phone_number: '87654321',
        gender: 'Female'
    },
    {
        id: 'UI3456CDE',
        name: 'Alex Wong',
        email_address: 'alex.wong@example.com',
        phone_number: '91234567',
        gender: 'Male'
    },
    {
        id: 'UI4567DEF',
        name: 'Maria Lee',
        email_address: 'maria.lee@example.com',
        phone_number: '82345678',
        gender: 'Female'
    },
    {
        id: 'UI5678EFG',
        name: 'Sam Tan',
        email_address: 'sam.tan@example.com',
        phone_number: '93456789',
        gender: 'Male'
    },
    {
        id: 'UI6789FGH',
        name: 'Jenny Lim',
        email_address: 'jenny.lim@example.com',
        phone_number: '84567890',
        gender: 'Female'
    },
    {
        id: 'UI7890GHI',
        name: 'Mike Chen',
        email_address: 'mike.chen@example.com',
        phone_number: '95678901',
        gender: 'Male'
    },
    {
        id: 'UI8901HIJ',
        name: 'Lisa Park',
        email_address: 'lisa.park@example.com',
        phone_number: '86789012',
        gender: 'Female'
    }
];

// Employee-Cafe assignments with different start dates
const employeeCafes = [
    {
        employee_id: 'UI1234ABC',
        cafe_id: cafes[0].id,
        start_date: new Date('2023-01-15')
    },
    {
        employee_id: 'UI2345BCD',
        cafe_id: cafes[0].id,
        start_date: new Date('2023-03-10')
    },
    {
        employee_id: 'UI3456CDE',
        cafe_id: cafes[1].id,
        start_date: new Date('2023-05-20')
    },
    {
        employee_id: 'UI4567DEF',
        cafe_id: cafes[1].id,
        start_date: new Date('2023-07-05')
    },
    {
        employee_id: 'UI5678EFG',
        cafe_id: cafes[2].id,
        start_date: new Date('2023-02-28')
    },
    {
        employee_id: 'UI6789FGH',
        cafe_id: cafes[3].id,
        start_date: new Date('2023-04-17')
    },
    {
        employee_id: 'UI7890GHI',
        cafe_id: cafes[4].id,
        start_date: new Date('2023-06-22')
    },
    {
        employee_id: 'UI8901HIJ',
        cafe_id: cafes[2].id,
        start_date: new Date('2023-08-11')
    }
];

// Seed the database
const seedDatabase = async () => {
    try {
        // Sync models with the database
        await sequelize.sync({ force: true });
        logger.info('Database synchronized');

        // Insert cafes
        await Cafe.bulkCreate(cafes);
        logger.info('Cafes seeded successfully');

        // Insert employees
        await Employee.bulkCreate(employees);
        logger.info('Employees seeded successfully');

        // Insert employee-cafe relationships
        await EmployeeCafe.bulkCreate(employeeCafes);
        logger.info('Employee-Cafe relationships seeded successfully');

        logger.info('Database seeding completed successfully');
        process.exit(0);
    } catch (error) {
        logger.error('Error seeding database:', error);
        process.exit(1);
    }
};

// Run the seed function
seedDatabase();