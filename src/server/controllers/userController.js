
const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ success: true, count: users.length, data: users });
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    throw new ErrorResponse(`User not found with id ${req.params.id}`, 404);
  }
  
  res.status(200).json({ success: true, data: user });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res) => {
  let user = await User.findById(req.params.id);
  
  if (!user) {
    throw new ErrorResponse(`User not found with id ${req.params.id}`, 404);
  }
  
  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({ success: true, data: user });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    throw new ErrorResponse(`User not found with id ${req.params.id}`, 404);
  }
  
  await user.deleteOne();
  
  res.status(200).json({ success: true, data: {} });
});

// @desc    Get all farmers
// @route   GET /api/users/farmers
// @access  Public
exports.getAllFarmers = asyncHandler(async (req, res) => {
  const farmers = await User.find({ role: 'farmer' }).select('-password');
  res.status(200).json({ success: true, count: farmers.length, data: farmers });
});

// @desc    Get all buyers
// @route   GET /api/users/buyers
// @access  Public
exports.getAllBuyers = asyncHandler(async (req, res) => {
  const buyers = await User.find({ role: 'buyer' }).select('-password');
  res.status(200).json({ success: true, count: buyers.length, data: buyers });
});
