import { Router } from 'express';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validation';
import { authenticate } from '../middleware/auth';
import * as communicationController from '../controllers/communication.controller';

const router = Router();

router.use(authenticate);

// Conversations
router.get('/conversations', communicationController.getConversations);

router.post(
  '/conversations',
  validate([body('participants').isArray()]),
  communicationController.createConversation
);

router.get('/conversations/:conversationId', validate([param('conversationId').isUUID()]), communicationController.getConversation);

// Messages
router.get(
  '/conversations/:conversationId/messages',
  validate([param('conversationId').isUUID()]),
  communicationController.getMessages
);

router.post(
  '/conversations/:conversationId/messages',
  validate([
    param('conversationId').isUUID(),
    body('content').notEmpty(),
  ]),
  communicationController.sendMessage
);

router.put('/messages/:messageId/read', validate([param('messageId').isUUID()]), communicationController.markAsRead);

// Notifications
router.get('/notifications', communicationController.getNotifications);

router.put('/notifications/:notificationId/read', validate([param('notificationId').isUUID()]), communicationController.markNotificationAsRead);

router.post('/notifications/read-all', communicationController.markAllNotificationsAsRead);

// Notification Preferences
router.get('/preferences', communicationController.getNotificationPreferences);

router.put('/preferences', communicationController.updateNotificationPreferences);

export default router;
