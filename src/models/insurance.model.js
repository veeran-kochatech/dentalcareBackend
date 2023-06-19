const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const insuranceSchema = mongoose.Schema(
  {
    recordID: {
      type: String,
      required: true,
      trim: true,
    },
    insurerName:{
      type: String,
      required: true,
      trim: true,
    },
    insurerContactNo:{
      type: String,
      required: true,
      trim: true,
    },
    insurerAddress:{
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
insuranceSchema.plugin(toJSON);
insuranceSchema.plugin(paginate);

/**
 * @typedef Insurance
 */

const Insurance = mongoose.model('Insurance', insuranceSchema);

module.exports = Insurance;