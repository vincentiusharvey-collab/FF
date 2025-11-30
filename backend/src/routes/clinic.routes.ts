import { Router } from 'express';
import { param, query } from 'express-validator';
import { validate } from '../middleware/validation';
import { optionalAuth } from '../middleware/auth';
import * as clinicController from '../controllers/clinic.controller';

const router = Router();

// Public routes
router.get('/', optionalAuth, clinicController.getClinics);

router.get(
  '/:clinicId',
  validate([param('clinicId').isUUID()]),
  optionalAuth,
  clinicController.getClinicById
);

router.get(
  '/:clinicId/veterinarians',
  validate([param('clinicId').isUUID()]),
  optionalAuth,
  clinicController.getClinicVeterinarians
);

router.get(
  '/veterinarians/:vetId',
  validate([param('vetId').isUUID()]),
  optionalAuth,
  clinicController.getVeterinarianById
);

router.get(
  '/search',
  validate([
    query('query').optional().isString(),
    query('latitude').optional().isFloat(),
    query('longitude').optional().isFloat(),
  ]),
  optionalAuth,
  clinicController.searchClinics
);

export default router;
