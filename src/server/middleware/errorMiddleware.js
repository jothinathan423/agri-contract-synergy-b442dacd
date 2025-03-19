
const logger = require('../utils/logger');

// Custom error handler
const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error(`Error: ${err.message}`);
  
  // Mongoose bad ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(404).json({
      success: false,
      message: 'Resource not found',
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      success: false,
      message,
    });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Duplicate field value entered',
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired',
    });
  }

  // Default to 500 server error
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
};

module.exports = { errorHandler };
