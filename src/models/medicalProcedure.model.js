const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const medicalProcedureSchema = mongoose.Schema(
  {
    recordID: {
      type: String,
      required: true,
      trim: true,
    },
    name:{
      type: String,
      required: true,
      trim: true,
    },
    description:{
      type: String,
      required: true,
      trim: true,
    },
    medicalCodes:{
      type: [String],
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
medicalProcedureSchema.plugin(toJSON);
medicalProcedureSchema.plugin(paginate);

/**
 * @typedef MedicalProcedure
 */
const MedicalProcedure = mongoose.model('MedicalProcedure', medicalProcedureSchema);

module.exports = MedicalProcedure;
