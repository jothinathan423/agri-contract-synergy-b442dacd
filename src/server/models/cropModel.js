
const mongoose = require('mongoose');

const cropSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a crop name'],
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['cereals', 'pulses', 'vegetables', 'fruits', 'oilseeds', 'plantation', 'spices', 'other'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    growingSeason: {
      start: {
        month: Number,
        season: String,
      },
      end: {
        month: Number,
        season: String,
      },
      duration: {
        type: Number, // in days
        required: true,
      },
    },
    growingConditions: {
      soil: [String],
      climate: [String],
      temperature: {
        min: Number, // in celsius
        max: Number,
        optimal: Number,
      },
      rainfall: {
        min: Number, // in mm
        max: Number,
        optimal: Number,
      },
    },
    qualityParameters: [
      {
        name: String,
        description: String,
        unit: String,
        minValue: Number,
        maxValue: Number,
        optimalValue: Number,
      },
    ],
    averageYield: {
      value: Number,
      unit: String,
    },
    commonIssues: [
      {
        name: String,
        type: {
          type: String,
          enum: ['pest', 'disease', 'deficiency', 'other'],
        },
        symptoms: String,
        solutions: [String],
      },
    ],
    marketInformation: {
      averagePrice: Number,
      priceUnit: String,
      majorMarkets: [String],
      demandTrend: {
        type: String,
        enum: ['increasing', 'stable', 'decreasing', 'volatile'],
      },
      seasonalPriceVariation: [
        {
          month: Number,
          priceIndicator: {
            type: String,
            enum: ['very-low', 'low', 'medium', 'high', 'very-high'],
          },
        },
      ],
    },
    image: {
      type: String,
      default: 'default-crop.jpg',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Crop', cropSchema);
