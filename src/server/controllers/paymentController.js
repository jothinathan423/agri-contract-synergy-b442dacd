
const Payment = require('../models/paymentModel');
const Contract = require('../models/contractModel');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all payments
// @route   GET /api/payments
// @access  Private
exports.getAllPayments = asyncHandler(async (req, res) => {
  let query;
  
  // If user is not admin, only show their own payments
  if (req.user.role !== 'admin') {
    query = Payment.find({ user: req.user.id });
  } else {
    query = Payment.find();
  }
  
  const payments = await query;
  
  res.status(200).json({
    success: true,
    count: payments.length,
    data: payments
  });
});

// @desc    Get single payment
// @route   GET /api/payments/:id
// @access  Private
exports.getPaymentById = asyncHandler(async (req, res, next) => {
  const payment = await Payment.findById(req.params.id);
  
  if (!payment) {
    return next(new ErrorResponse(`Payment not found with id of ${req.params.id}`, 404));
  }
  
  // Make sure user is payment owner or admin
  if (payment.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to view this payment`, 401));
  }
  
  res.status(200).json({
    success: true,
    data: payment
  });
});

// @desc    Create new payment
// @route   POST /api/payments
// @access  Private
exports.createPayment = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;
  
  // Check if contract exists
  const contract = await Contract.findById(req.body.contract);
  
  if (!contract) {
    return next(new ErrorResponse(`Contract not found with id of ${req.body.contract}`, 404));
  }
  
  // Make sure user is contract owner or counterparty
  if (contract.user.toString() !== req.user.id && contract.counterpartyId.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to create a payment for this contract`, 401));
  }
  
  const payment = await Payment.create(req.body);
  
  res.status(201).json({
    success: true,
    data: payment
  });
});

// @desc    Update payment
// @route   PUT /api/payments/:id
// @access  Private
exports.updatePayment = asyncHandler(async (req, res, next) => {
  let payment = await Payment.findById(req.params.id);
  
  if (!payment) {
    return next(new ErrorResponse(`Payment not found with id of ${req.params.id}`, 404));
  }
  
  // Make sure user is payment owner or admin
  if (payment.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this payment`, 401));
  }
  
  payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: payment
  });
});

// @desc    Delete payment
// @route   DELETE /api/payments/:id
// @access  Private
exports.deletePayment = asyncHandler(async (req, res, next) => {
  const payment = await Payment.findById(req.params.id);
  
  if (!payment) {
    return next(new ErrorResponse(`Payment not found with id of ${req.params.id}`, 404));
  }
  
  // Make sure user is payment owner or admin
  if (payment.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this payment`, 401));
  }
  
  await payment.remove();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get payments for a contract
// @route   GET /api/payments/contract/:contractId
// @access  Private
exports.getPaymentsByContract = asyncHandler(async (req, res, next) => {
  const contractId = req.params.contractId;
  
  // Check if contract exists
  const contract = await Contract.findById(contractId);
  
  if (!contract) {
    return next(new ErrorResponse(`Contract not found with id of ${contractId}`, 404));
  }
  
  // Make sure user is contract owner or counterparty
  if (contract.user.toString() !== req.user.id && contract.counterpartyId.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to view payments for this contract`, 401));
  }
  
  const payments = await Payment.find({ contract: contractId });
  
  res.status(200).json({
    success: true,
    count: payments.length,
    data: payments
  });
});
