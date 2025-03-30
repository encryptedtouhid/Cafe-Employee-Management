const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { errorHandler, notFoundHandler } = require('../utils/errorHandler');
const logger = require('../utils/logger');

/**
 * Configure Express application
 */
const configureServer = (app) => {
  // Security middleware
  app.use(helmet());

  // CORS configuration
  app.use(cors());

  // Request body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Static file serving
  app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

  // HTTP request logging
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined', {
      stream: { write: message => logger.info(message.trim()) }
    }));
  }

  return app;
};

/**
 * Setup API routes
 */
const setupRoutes = (app) => {
  // Import route files
  const cafeRoutes = require('../routes/cafeRoutes');
  const employeeRoutes = require('../routes/employeeRoutes');

  // API routes
  app.use('/cafes', cafeRoutes);
  app.use('/employees', employeeRoutes);

  // Alias for /cafe to match the API spec
  app.use('/cafe', cafeRoutes);
  app.use('/employee', employeeRoutes);

  // Basic health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Handle 404 routes
  app.use(notFoundHandler);

  // Global error handler
  app.use(errorHandler);

  return app;
};

module.exports = {
  configureServer,
  setupRoutes
};