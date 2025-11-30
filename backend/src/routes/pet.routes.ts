import { Router } from 'express';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validation';
import { authenticate } from '../middleware/auth';
import * as petController from '../controllers/pet.controller';

const router = Router();

// All pet routes require authentication
router.use(authenticate);

router.get('/', petController.getUserPets);

router.post(
  '/',
  validate([
    body('name').notEmpty().withMessage('Pet name is required'),
    body('type').isIn(['DOG', 'CAT', 'BIRD', 'RABBIT', 'REPTILE', 'OTHER']).withMessage('Invalid pet type'),
    body('gender').isIn(['MALE', 'FEMALE', 'UNKNOWN']).withMessage('Invalid gender'),
  ]),
  petController.createPet
);

router.get('/:petId', validate([param('petId').isUUID()]), petController.getPetById);

router.put(
  '/:petId',
  validate([param('petId').isUUID()]),
  petController.updatePet
);

router.delete('/:petId', validate([param('petId').isUUID()]), petController.deletePet);

// Caregiver management
router.get('/:petId/caregivers', validate([param('petId').isUUID()]), petController.getPetCaregivers);

router.post(
  '/:petId/caregivers',
  validate([
    param('petId').isUUID(),
    body('email').isEmail().withMessage('Valid email is required'),
    body('role').isIn(['ADMIN', 'EDITOR', 'VIEWER']).withMessage('Invalid role'),
  ]),
  petController.addCaregiver
);

router.put(
  '/:petId/caregivers/:caregiverId',
  validate([
    param('petId').isUUID(),
    param('caregiverId').isUUID(),
    body('role').isIn(['ADMIN', 'EDITOR', 'VIEWER']).withMessage('Invalid role'),
  ]),
  petController.updateCaregiverRole
);

router.delete(
  '/:petId/caregivers/:caregiverId',
  validate([param('petId').isUUID(), param('caregiverId').isUUID()]),
  petController.removeCaregiver
);

export default router;
