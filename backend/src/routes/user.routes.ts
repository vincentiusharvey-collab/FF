import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validation';
import { authenticate } from '../middleware/auth';
import * as userController from '../controllers/user.controller';

const router = Router();

router.use(authenticate);

router.get('/profile', userController.getProfile);

router.put(
  '/profile',
  validate([
    body('firstName').optional().notEmpty(),
    body('lastName').optional().notEmpty(),
    body('phone').optional().isMobilePhone('any'),
  ]),
  userController.updateProfile
);

router.put('/password', validate([body('currentPassword').notEmpty(), body('newPassword').isLength({ min: 8 })]), userController.changePassword);

router.delete('/account', userController.deleteAccount);

export default router;
