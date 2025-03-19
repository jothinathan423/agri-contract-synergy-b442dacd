
const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Please add payment amount'],
    min: [1, 'Amount must be at least 1']
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['bank_transfer', 'digital_wallet', 'cash', 'check', 'other'],
    required: [true, 'Please specify payment method']
  },
  paymentDetails: {
    type: Object,
    default: {}
  },
  notes: String,
  contract: {
    type: mongoose.Schema.ObjectId,
    ref: 'Contract',
    required: [true, 'Payment must be associated with a contract']
  },
  transactionId: String,
  paymentDate: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);
