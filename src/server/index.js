
// Main entry point for the backend API
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const contractRoutes = require('./routes/contractRoutes');
const userRoutes = require('./routes/userRoutes');
const cropRoutes = require('./routes/cropRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const logger = require('./utils/logger');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/users', userRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/payments', paymentRoutes);

// Base route for API check
app.get('/', (req, res) => {
  res.json({ message: 'Contract Farming API is running' });
});

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/contract-farming', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
});

module.exports = app;
