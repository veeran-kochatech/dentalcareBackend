const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const patientSchema = mongoose.Schema(
  {
    recordID: {
      type: String,
      required: true,
      trim: true,
    },
    patientName:{
      type: String,
      required: true,
      trim: true,
    },
    patientContactNo:{
      type: String,
      required: true,
      trim: true,
    },
    patientAddress:{
      type: String,
      required: true,
      trim: true,
    },
    employerID:{
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      trim: true,
    },
    insurerID:{
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
patientSchema.plugin(toJSON);
patientSchema.plugin(paginate);

/**
 * @typedef Patient
 */
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
