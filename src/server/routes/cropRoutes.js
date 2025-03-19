
const express = require('express');
const { 
  getAllCrops,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop
} = require('../controllers/cropController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getAllCrops);
router.get('/:id', getCropById);

// Admin only routes
router.post('/', protect, authorize('admin'), createCrop);
router.put('/:id', protect, authorize('admin'), updateCrop);
router.delete('/:id', protect, authorize('admin'), deleteCrop);

module.exports = router;
