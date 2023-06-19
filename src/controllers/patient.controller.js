const Patient = require('../models/patient.model');
const Employee = require('../models/employee.model');
const Insurance = require('../models/insurance.model');
const MedicalCode = require('../models/medicalCode.model');
const MedicalProcedure = require('../models/medicalProcedure.model');
const MedicalCodeDiscount = require('../models/medicalCodeDiscount.model');

const getPatients = async (req, res) => {
    try {
        console.log("getPatients",);
        const patients = await Patient.find();
        console.log("patients ",patients);
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getPatientDetails = async (req, res) => {
    try {
        console.log("getPatientDetails ",req.params);
        const patient = await Patient.findById(req.params.patientId);
        const employee = await Employee.findById(patient.employerID);
        const insurance = await Insurance.findById(patient.insurerID);
        const procedures = await MedicalProcedure.find();
        console.log("patient ",patient);
        res.status(200).json({
            patient: patient,
            employee: employee,
            insurance: insurance,
            procedures: procedures
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getMedicalProcedures = async (req, res) => {
    try {
        console.log("getMedicalProcedures ",req.params);
        const procedures = await MedicalProcedure.find();
        res.status(200).json(procedures);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProcedureDetails = async (req, res) => {
    try {
        console.log("getProcedureDetails ",req.params);
        console.log("procedureId ",req.body.procedureId);
        const patient = await Patient.findById(req.params.patientId);
        const procedure = await MedicalProcedure.findById(req.body.procedureId);
        console.log("procedure ",procedure)
        const medicalCodeList = procedure.medicalCodes;
        let totalPrice = 0;
        let totalDiscount = 0;
        let total = 0;

        let procedureDetails = await Promise.all(medicalCodeList.map(async (code) => {
            console.log("code ", code);
            const medicalCodes = await MedicalCode.findById(code);
            const medicalCodeDiscounts = await MedicalCodeDiscount.findOne({
                insurerID: patient.insurerID,
                employerID: patient.employerID,
                codeID: code
            });
            const disc = medicalCodeDiscounts ? medicalCodeDiscounts.discount : 0;
            console.log("medicalCodeDiscounts ", medicalCodes);
            const data = {
                medicalCode: medicalCodes.code.toString(),
                description: medicalCodes.description,
                price: medicalCodes.listPrice,
                discountPrice: medicalCodes.listPrice - disc,
            };
            totalPrice += medicalCodes.listPrice;
            totalDiscount += disc;
            total += medicalCodes.listPrice - disc;
            return data;
        }));

        console.log("procedureDetails ",procedureDetails);

        res.status(200).json({
            procedureDetails: procedureDetails,
            totalPrice: totalPrice,
            totalDiscount: totalDiscount,
            total: total,
        });
    } catch (error) {
        console.log("error ",error);
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getPatients,
    getPatientDetails,
    getProcedureDetails,
}