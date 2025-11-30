import { Router } from 'express';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validation';
import { authenticate } from '../middleware/auth';
import * as travelController from '../controllers/travel.controller';

const router = Router();

router.use(authenticate);

// Travel Plans
router.get('/plans', travelController.getTravelPlans);

router.post(
  '/plans',
  validate([
    body('petId').isUUID(),
    body('destination').notEmpty(),
    body('departureDate').isISO8601(),
    body('travelMode').notEmpty(),
  ]),
  travelController.createTravelPlan
);

router.get('/plans/:planId', validate([param('planId').isUUID()]), travelController.getTravelPlanById);

router.put('/plans/:planId', validate([param('planId').isUUID()]), travelController.updateTravelPlan);

router.delete('/plans/:planId', validate([param('planId').isUUID()]), travelController.deleteTravelPlan);

// Travel Documents
router.get('/pets/:petId/documents', validate([param('petId').isUUID()]), travelController.getTravelDocuments);

router.post(
  '/pets/:petId/documents',
  validate([
    param('petId').isUUID(),
    body('documentType').notEmpty(),
    body('documentName').notEmpty(),
    body('issueDate').isISO8601(),
  ]),
  travelController.createTravelDocument
);

router.put('/documents/:documentId', validate([param('documentId').isUUID()]), travelController.updateTravelDocument);

router.delete('/documents/:documentId', validate([param('documentId').isUUID()]), travelController.deleteTravelDocument);

// Compliance Checklist
router.get('/plans/:planId/checklist', validate([param('planId').isUUID()]), travelController.getComplianceChecklist);

router.put('/plans/:planId/checklist', validate([param('planId').isUUID()]), travelController.updateComplianceChecklist);

// Pet ID Cards
router.get('/pets/:petId/id-card', validate([param('petId').isUUID()]), travelController.getPetIdCard);

router.post('/pets/:petId/id-card', validate([param('petId').isUUID()]), travelController.generatePetIdCard);

export default router;
