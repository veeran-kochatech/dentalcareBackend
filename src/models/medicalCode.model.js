const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const medicalCodeSchema = mongoose.Schema(
  {
    recordID: {
      type: String,
      required: true,
      trim: true,
    },
    code:{
      type: String,
      required: true,
      trim: true,
    },
    description:{
      type: String,
      required: true,
      trim: true,
    },
    listPrice:{
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
medicalCodeSchema.plugin(toJSON);
medicalCodeSchema.plugin(paginate);

/**
 * @typedef MedicalCode
 */
const MedicalCode = mongoose.model('MedicalCode', medicalCodeSchema);

module.exports = MedicalCode;
