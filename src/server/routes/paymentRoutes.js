
const express = require('express');
const { 
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
  getPaymentsByContract
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes
router.get('/', protect, getAllPayments);
router.get('/:id', protect, getPaymentById);
router.post('/', protect, createPayment);
router.put('/:id', protect, updatePayment);
router.delete('/:id', protect, deletePayment);
router.get('/contract/:contractId', protect, getPaymentsByContract);

module.exports = router;
