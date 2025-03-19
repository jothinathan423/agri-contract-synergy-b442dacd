
const express = require('express');
const { 
  getAllPayments,
  getPaymentById,
  createPayment,
  getPaymentsByContract
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes
router.get('/', protect, getAllPayments);
router.get('/:id', protect, getPaymentById);
router.post('/', protect, createPayment);
router.get('/contract/:contractId', protect, getPaymentsByContract);

module.exports = router;
