const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { errorHandler, notFoundHandler } = require('../utils/errorHandler');
const logger = require('../utils/logger');
const { setupSwagger } = require('./swagger');

/**
 * Configure Express application
 */
const configureServer = (app) => {
  // Security middleware
  app.use(helmet());

  // CORS configuration
  const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204
  };
  app.use(cors(corsOptions));

  // Request body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Static file serving with CORS headers
  app.use('/uploads', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS || 'http://localhost:5000');
    res.setHeader('Access-Control-Allow-Methods', 'GET','POST','PUT','DELETE');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
  }, express.static(path.join(__dirname, '../../uploads')));

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
  // Setup Swagger documentation
  setupSwagger(app);

  // Root route redirects to Swagger docs
  app.get('/', (req, res) => {
    res.redirect('/api-docs');
  });

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