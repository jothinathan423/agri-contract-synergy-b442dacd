
const express = require('express');
const { 
  register, 
  login, 
  logout, 
  getProfile,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateProfile 
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.get('/profile', protect, getProfile);
router.put('/updatepassword', protect, updatePassword);
router.put('/updateprofile', protect, updateProfile);

module.exports = router;
