import { Router } from 'express';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validation';
import { authenticate } from '../middleware/auth';
import * as appointmentController from '../controllers/appointment.controller';

const router = Router();

router.use(authenticate);

// Appointments
router.get('/', appointmentController.getUserAppointments);

router.post(
  '/',
  validate([
    body('petId').isUUID(),
    body('type').notEmpty(),
    body('scheduledDate').isISO8601(),
  ]),
  appointmentController.createAppointment
);

router.get('/:appointmentId', validate([param('appointmentId').isUUID()]), appointmentController.getAppointmentById);

router.put('/:appointmentId', validate([param('appointmentId').isUUID()]), appointmentController.updateAppointment);

router.delete('/:appointmentId', validate([param('appointmentId').isUUID()]), appointmentController.cancelAppointment);

// Appointment Slots
router.get('/slots/available', appointmentController.getAvailableSlots);

// Pre-Appointment Form
router.post(
  '/:appointmentId/pre-form',
  validate([param('appointmentId').isUUID()]),
  appointmentController.submitPreAppointmentForm
);

router.get('/:appointmentId/pre-form', validate([param('appointmentId').isUUID()]), appointmentController.getPreAppointmentForm);

// Virtual Consultations
router.get('/virtual/:consultationId', validate([param('consultationId').isUUID()]), appointmentController.getVirtualConsultation);

router.post(
  '/virtual/:consultationId/start',
  validate([param('consultationId').isUUID()]),
  appointmentController.startVirtualConsultation
);

router.post(
  '/virtual/:consultationId/end',
  validate([param('consultationId').isUUID()]),
  appointmentController.endVirtualConsultation
);

export default router;
