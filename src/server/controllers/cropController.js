
const Crop = require('../models/cropModel');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all crops
// @route   GET /api/crops
// @access  Public
exports.getAllCrops = asyncHandler(async (req, res) => {
  const crops = await Crop.find();
  res.status(200).json({ success: true, count: crops.length, data: crops });
});

// @desc    Get crop by ID
// @route   GET /api/crops/:id
// @access  Public
exports.getCropById = asyncHandler(async (req, res) => {
  const crop = await Crop.findById(req.params.id);
  
  if (!crop) {
    throw new ErrorResponse(`Crop not found with id ${req.params.id}`, 404);
  }
  
  res.status(200).json({ success: true, data: crop });
});

// @desc    Create new crop
// @route   POST /api/crops
// @access  Private/Admin
exports.createCrop = asyncHandler(async (req, res) => {
  const crop = await Crop.create(req.body);
  res.status(201).json({ success: true, data: crop });
});

// @desc    Update crop
// @route   PUT /api/crops/:id
// @access  Private/Admin
exports.updateCrop = asyncHandler(async (req, res) => {
  let crop = await Crop.findById(req.params.id);
  
  if (!crop) {
    throw new ErrorResponse(`Crop not found with id ${req.params.id}`, 404);
  }
  
  crop = await Crop.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({ success: true, data: crop });
});

// @desc    Delete crop
// @route   DELETE /api/crops/:id
// @access  Private/Admin
exports.deleteCrop = asyncHandler(async (req, res) => {
  const crop = await Crop.findById(req.params.id);
  
  if (!crop) {
    throw new ErrorResponse(`Crop not found with id ${req.params.id}`, 404);
  }
  
  await crop.deleteOne();
  
  res.status(200).json({ success: true, data: {} });
});
