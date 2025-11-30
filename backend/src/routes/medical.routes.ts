import { Router } from 'express';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validation';
import { authenticate } from '../middleware/auth';
import * as medicalController from '../controllers/medical.controller';

const router = Router();

router.use(authenticate);

// Medical Records
router.get('/pets/:petId/records', validate([param('petId').isUUID()]), medicalController.getMedicalRecords);

router.post(
  '/pets/:petId/records',
  validate([
    param('petId').isUUID(),
    body('type').isIn(['VACCINATION', 'LAB_RESULT', 'VISIT_SUMMARY', 'PRESCRIPTION', 'PROCEDURE', 'DIAGNOSIS', 'ALLERGY', 'VITAL_SIGNS', 'IMAGE', 'DOCUMENT']),
    body('title').notEmpty(),
    body('date').isISO8601(),
  ]),
  medicalController.createMedicalRecord
);

router.get('/records/:recordId', validate([param('recordId').isUUID()]), medicalController.getMedicalRecordById);

router.put('/records/:recordId', validate([param('recordId').isUUID()]), medicalController.updateMedicalRecord);

router.delete('/records/:recordId', validate([param('recordId').isUUID()]), medicalController.deleteMedicalRecord);

// Record Sharing
router.post(
  '/records/:recordId/share',
  validate([
    param('recordId').isUUID(),
    body('recipient').notEmpty(),
    body('shareMethod').isIn(['EMAIL', 'SMS', 'LINK', 'APP_INVITATION']),
  ]),
  medicalController.shareRecord
);

router.get('/records/:recordId/shares', validate([param('recordId').isUUID()]), medicalController.getRecordShares);

router.delete('/shares/:shareId', validate([param('shareId').isUUID()]), medicalController.revokeShare);

// Vaccinations
router.get('/pets/:petId/vaccinations', validate([param('petId').isUUID()]), medicalController.getVaccinations);

router.post(
  '/pets/:petId/vaccinations',
  validate([
    param('petId').isUUID(),
    body('name').notEmpty(),
    body('administeredDate').isISO8601(),
  ]),
  medicalController.createVaccination
);

// Prescriptions
router.get('/pets/:petId/prescriptions', validate([param('petId').isUUID()]), medicalController.getPrescriptions);

router.post(
  '/pets/:petId/prescriptions',
  validate([
    param('petId').isUUID(),
    body('medicationName').notEmpty(),
    body('dosage').notEmpty(),
    body('frequency').notEmpty(),
  ]),
  medicalController.createPrescription
);

// Allergies
router.get('/pets/:petId/allergies', validate([param('petId').isUUID()]), medicalController.getAllergies);

router.post(
  '/pets/:petId/allergies',
  validate([
    param('petId').isUUID(),
    body('allergen').notEmpty(),
    body('severity').isIn(['MILD', 'MODERATE', 'SEVERE']),
  ]),
  medicalController.createAllergy
);

// Vital Signs
router.get('/pets/:petId/vitals', validate([param('petId').isUUID()]), medicalController.getVitalSigns);

router.post(
  '/pets/:petId/vitals',
  validate([param('petId').isUUID(), body('recordDate').isISO8601()]),
  medicalController.createVitalSign
);

export default router;
