const express = require('express');

const patientController = require('../../controllers/patient.controller');

const router = express.Router();

router
  .route('/')
  .get(patientController.getPatients);

router
  .route('/:patientId')
  .get(patientController.getPatientDetails)
  .post(patientController.getProcedureDetails);

module.exports = router;
