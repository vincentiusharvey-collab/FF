import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import petRoutes from './pet.routes';
import medicalRoutes from './medical.routes';
import appointmentRoutes from './appointment.routes';
import careRoutes from './care.routes';
import communicationRoutes from './communication.routes';
import travelRoutes from './travel.routes';
import clinicRoutes from './clinic.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/pets', petRoutes);
router.use('/medical', medicalRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/care', careRoutes);
router.use('/communications', communicationRoutes);
router.use('/travel', travelRoutes);
router.use('/clinics', clinicRoutes);

export default router;
