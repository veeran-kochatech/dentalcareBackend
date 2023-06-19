const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const medicalCodeDiscountSchema = mongoose.Schema(
  {
    recordID: {
      type: String,
      required: true,
      trim: true,
    },
    insurerID:{
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      trim: true,
    },
    employerID:{
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      trim: true,
    },
    codeID:{ //mc code
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      trim: true,
    },
    discount:{
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
medicalCodeDiscountSchema.plugin(toJSON);
medicalCodeDiscountSchema.plugin(paginate);

/**
 * @typedef MedicalCodeDiscount
 */
const MedicalCodeDiscount = mongoose.model('MedicalCodeDiscount', medicalCodeDiscountSchema);

module.exports = MedicalCodeDiscount;
