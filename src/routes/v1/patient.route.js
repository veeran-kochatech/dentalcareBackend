const express = require('express');

const patientController = require('../../controllers/patient.controller');

const router = express.Router();

router
  .route('/')
  .get(patientController.getPatients)
  .post(patientController.addPatient);

router
  .route('/employee')
  .get(patientController.getEmployeesAndInsurance);

router
  .route('/:patientId')
  .get(patientController.getPatientDetails)
  .post(patientController.getProcedureDetails);

module.exports = router;
