const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const employeeSchema = mongoose.Schema(
  {
    recordID: {
      type: String,
      required: true,
      trim: true,
    },
    employerName:{
      type: String,
      required: true,
      trim: true,
    },
    employerContactNo:{
      type: String,
      required: true,
      trim: true,
    },
    employerAddress:{
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
employeeSchema.plugin(toJSON);
employeeSchema.plugin(paginate);

/**
 * @typedef Employee
 */
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
