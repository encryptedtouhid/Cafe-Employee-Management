const express = require('express');
const { configureServer, setupRoutes } = require('./config/server');
const { sequelize, testConnection } = require('./config/database');
const logger = require('./utils/logger');
const fs = require('fs');
const path = require('path');

// Create uploads directories if they don't exist
const createUploadDirs = () => {
    const dirs = [
        path.join(__dirname, '../uploads'),
        path.join(__dirname, '../uploads/logos')
    ];

    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            logger.info(`Created directory: ${dir}`);
        }
    });
};

// Initialize the database
const initializeDatabase = async () => {
    try {
        // Test database connection
        await testConnection();

        // Sync models with database
        await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
        logger.info('Database synchronized successfully');

        return true;
    } catch (error) {
        logger.error('Failed to initialize database:', error);
        return false;
    }
};

// Create and configure Express application
const app = express();
configureServer(app);
setupRoutes(app);

// Start the server
const startServer = async () => {
    // Create upload directories
    createUploadDirs();

    // Initialize database
    const dbInitialized = await initializeDatabase();
    if (!dbInitialized) {
        logger.error('Server startup aborted due to database initialization failure');
        process.exit(1);
    }

    // Start listening for requests
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    });
};

// Don't start the server if this file is required elsewhere (e.g., in tests)
if (require.main === module) {
    startServer();
}

module.exports = { app, startServer };