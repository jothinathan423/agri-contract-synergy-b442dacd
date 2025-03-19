
const mongoose = require('mongoose');

const contractSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a contract title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    crop: {
      type: String,
      required: [true, 'Please specify the crop type'],
    },
    quantity: {
      value: {
        type: Number,
        required: [true, 'Please specify the quantity'],
      },
      unit: {
        type: String,
        required: [true, 'Please specify the unit'],
        enum: ['kg', 'ton', 'lb', 'bushel'],
      },
    },
    price: {
      value: {
        type: Number,
        required: [true, 'Please specify the price'],
      },
      unit: {
        type: String,
        required: [true, 'Please specify the price unit'],
        enum: ['per kg', 'per ton', 'per lb', 'per bushel', 'total'],
      },
    },
    totalValue: {
      type: Number,
      required: true,
    },
    paymentTerms: {
      type: String,
      required: [true, 'Please specify payment terms'],
    },
    advancePayment: {
      percentage: {
        type: Number,
        default: 0,
      },
      amount: {
        type: Number,
        default: 0,
      },
      paid: {
        type: Boolean,
        default: false,
      },
      paidAt: Date,
    },
    finalPayment: {
      amount: {
        type: Number,
        default: 0,
      },
      paid: {
        type: Boolean,
        default: false,
      },
      paidAt: Date,
    },
    qualityStandards: {
      type: String,
      required: [true, 'Please specify quality standards'],
    },
    deliveryDetails: {
      location: {
        type: String,
        required: [true, 'Please specify delivery location'],
      },
      date: {
        type: Date,
        required: [true, 'Please specify delivery date'],
      },
      instructions: String,
    },
    additionalTerms: String,
    status: {
      type: String,
      required: true,
      enum: ['draft', 'pending', 'active', 'completed', 'cancelled', 'dispute'],
      default: 'draft',
    },
    timeline: [
      {
        event: String,
        date: Date,
        description: String,
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    documents: [
      {
        name: String,
        type: String,
        url: String,
        uploadedAt: Date,
        uploadedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    signedByFarmer: {
      type: Boolean,
      default: false,
    },
    signedByBuyer: {
      type: Boolean,
      default: false,
    },
    finalReport: {
      actualQuantity: Number,
      qualityAssessment: String,
      issues: String,
      completionDate: Date,
    },
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        content: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
        readBy: [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
            },
            readAt: Date,
          },
        ],
      },
    ],
    disputeDetails: {
      raisedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      reason: String,
      description: String,
      raisedAt: Date,
      status: {
        type: String,
        enum: ['pending', 'under-review', 'resolved', 'escalated'],
      },
      resolution: String,
      resolvedAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Contract', contractSchema);
