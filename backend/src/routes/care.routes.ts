import { Router } from 'express';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validation';
import { authenticate } from '../middleware/auth';
import * as careController from '../controllers/care.controller';

const router = Router();

router.use(authenticate);

// Care Tasks
router.get('/tasks', careController.getCareTasks);

router.post(
  '/tasks',
  validate([
    body('petId').isUUID(),
    body('type').notEmpty(),
    body('title').notEmpty(),
    body('assignedTo').isUUID(),
  ]),
  careController.createCareTask
);

router.put('/tasks/:taskId', validate([param('taskId').isUUID()]), careController.updateCareTask);

router.post(
  '/tasks/:taskId/complete',
  validate([param('taskId').isUUID()]),
  careController.completeCareTask
);

router.delete('/tasks/:taskId', validate([param('taskId').isUUID()]), careController.deleteCareTask);

// Medication Reminders
router.get('/pets/:petId/medication-reminders', validate([param('petId').isUUID()]), careController.getMedicationReminders);

router.post(
  '/pets/:petId/medication-reminders',
  validate([
    param('petId').isUUID(),
    body('medicationName').notEmpty(),
    body('dosage').notEmpty(),
    body('frequency').notEmpty(),
  ]),
  careController.createMedicationReminder
);

router.put(
  '/medication-reminders/:reminderId',
  validate([param('reminderId').isUUID()]),
  careController.updateMedicationReminder
);

router.delete(
  '/medication-reminders/:reminderId',
  validate([param('reminderId').isUUID()]),
  careController.deleteMedicationReminder
);

// Medication Logs
router.post(
  '/medication-reminders/:reminderId/log',
  validate([
    param('reminderId').isUUID(),
    body('dosageGiven').notEmpty(),
  ]),
  careController.logMedication
);

// Wellness Reminders
router.get('/pets/:petId/wellness-reminders', validate([param('petId').isUUID()]), careController.getWellnessReminders);

router.post(
  '/pets/:petId/wellness-reminders',
  validate([
    param('petId').isUUID(),
    body('type').notEmpty(),
    body('title').notEmpty(),
    body('dueDate').isISO8601(),
  ]),
  careController.createWellnessReminder
);

// Refill Requests
router.get('/refill-requests', careController.getRefillRequests);

router.post(
  '/refill-requests',
  validate([
    body('petId').isUUID(),
    body('prescriptionId').isUUID(),
  ]),
  careController.createRefillRequest
);

router.put(
  '/refill-requests/:requestId',
  validate([param('requestId').isUUID()]),
  careController.updateRefillRequest
);

export default router;
