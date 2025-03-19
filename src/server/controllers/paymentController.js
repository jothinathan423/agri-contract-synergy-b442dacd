
const Payment = require('../models/paymentModel');
const Contract = require('../models/contractModel');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all payments for logged in user
// @route   GET /api/payments
// @access  Private
exports.getAllPayments = asyncHandler(async (req, res) => {
  let query;
  
  if (req.user.role === 'admin') {
    // Admin can see all payments
    query = Payment.find().populate({
      path: 'contract',
      select: 'title farmer buyer'
    });
  } else {
    // Users can only see their own payments (as farmer or buyer)
    const contracts = await Contract.find({
      $or: [{ farmer: req.user.id }, { buyer: req.user.id }]
    }).select('_id');
    
    const contractIds = contracts.map(contract => contract._id);
    
    query = Payment.find({
      contract: { $in: contractIds }
    }).populate({
      path: 'contract',
      select: 'title farmer buyer'
    });
  }
  
  const payments = await query;
  
  res.status(200).json({
    success: true,
    count: payments.length,
    data: payments
  });
});

// @desc    Get payment by ID
// @route   GET /api/payments/:id
// @access  Private
exports.getPaymentById = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id).populate({
    path: 'contract',
    select: 'title farmer buyer'
  });
  
  if (!payment) {
    throw new ErrorResponse(`Payment not found with id ${req.params.id}`, 404);
  }
  
  // Check ownership
  const contract = await Contract.findById(payment.contract);
  
  if (
    req.user.role !== 'admin' &&
    contract.farmer.toString() !== req.user.id &&
    contract.buyer.toString() !== req.user.id
  ) {
    throw new ErrorResponse(`Not authorized to access this payment`, 403);
  }
  
  res.status(200).json({ success: true, data: payment });
});

// @desc    Create new payment
// @route   POST /api/payments
// @access  Private
exports.createPayment = asyncHandler(async (req, res) => {
  // Add user to req.body
  req.body.createdBy = req.user.id;
  
  // Check if contract exists
  const contract = await Contract.findById(req.body.contract);
  
  if (!contract) {
    throw new ErrorResponse(`Contract not found with id ${req.body.contract}`, 404);
  }
  
  // Check ownership - only buyer can make payments
  if (contract.buyer.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new ErrorResponse(`Only the buyer can make payments for this contract`, 403);
  }
  
  const payment = await Payment.create(req.body);
  
  res.status(201).json({ success: true, data: payment });
});

// @desc    Get payments for a contract
// @route   GET /api/payments/contract/:contractId
// @access  Private
exports.getPaymentsByContract = asyncHandler(async (req, res) => {
  const contract = await Contract.findById(req.params.contractId);
  
  if (!contract) {
    throw new ErrorResponse(`Contract not found with id ${req.params.contractId}`, 404);
  }
  
  // Check ownership
  if (
    req.user.role !== 'admin' &&
    contract.farmer.toString() !== req.user.id &&
    contract.buyer.toString() !== req.user.id
  ) {
    throw new ErrorResponse(`Not authorized to access payments for this contract`, 403);
  }
  
  const payments = await Payment.find({ contract: req.params.contractId });
  
  res.status(200).json({
    success: true,
    count: payments.length,
    data: payments
  });
});
