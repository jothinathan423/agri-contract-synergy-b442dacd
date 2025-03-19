
const express = require('express');
const { 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser,
  getAllFarmers,
  getAllBuyers
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin only routes
router.get('/', protect, authorize('admin'), getAllUsers);
router.put('/:id', protect, authorize('admin'), updateUser);
router.delete('/:id', protect, authorize('admin'), deleteUser);

// Public routes
router.get('/farmers', getAllFarmers);
router.get('/buyers', getAllBuyers);

// Protected routes
router.get('/:id', protect, getUserById);

module.exports = router;
