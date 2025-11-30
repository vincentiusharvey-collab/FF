import { Server, Socket } from 'socket.io';
import { verifyAccessToken } from '../utils/jwt';
import { logger } from '../utils/logger';

interface AuthSocket extends Socket {
  userId?: string;
}

export function initializeSocket(io: Server) {
  // Authentication middleware for socket connections
  io.use((socket: AuthSocket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error('Authentication required'));
      }

      const payload = verifyAccessToken(token);
      socket.userId = payload.userId;
      next();
    } catch (error) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket: AuthSocket) => {
    logger.info(`Socket connected: ${socket.id}, User: ${socket.userId}`);

    // Join user's personal room
    if (socket.userId) {
      socket.join(`user:${socket.userId}`);
    }

    // Handle chat messages
    socket.on('chat:send', async (data) => {
      try {
        const { conversationId, message } = data;
        // TODO: Save message to database and broadcast to conversation participants
        io.to(`conversation:${conversationId}`).emit('chat:message', {
          conversationId,
          message,
          senderId: socket.userId,
          timestamp: new Date(),
        });
      } catch (error) {
        logger.error('Error sending chat message:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Handle joining conversation rooms
    socket.on('conversation:join', (conversationId: string) => {
      socket.join(`conversation:${conversationId}`);
      logger.info(`User ${socket.userId} joined conversation ${conversationId}`);
    });

    // Handle leaving conversation rooms
    socket.on('conversation:leave', (conversationId: string) => {
      socket.leave(`conversation:${conversationId}`);
      logger.info(`User ${socket.userId} left conversation ${conversationId}`);
    });

    // Handle typing indicators
    socket.on('typing:start', (conversationId: string) => {
      socket.to(`conversation:${conversationId}`).emit('typing', {
        userId: socket.userId,
        conversationId,
        isTyping: true,
      });
    });

    socket.on('typing:stop', (conversationId: string) => {
      socket.to(`conversation:${conversationId}`).emit('typing', {
        userId: socket.userId,
        conversationId,
        isTyping: false,
      });
    });

    // Handle video call signaling
    socket.on('call:offer', (data) => {
      const { targetUserId, offer } = data;
      io.to(`user:${targetUserId}`).emit('call:offer', {
        offer,
        callerId: socket.userId,
      });
    });

    socket.on('call:answer', (data) => {
      const { targetUserId, answer } = data;
      io.to(`user:${targetUserId}`).emit('call:answer', {
        answer,
        answererId: socket.userId,
      });
    });

    socket.on('call:ice-candidate', (data) => {
      const { targetUserId, candidate } = data;
      io.to(`user:${targetUserId}`).emit('call:ice-candidate', {
        candidate,
        senderId: socket.userId,
      });
    });

    socket.on('call:end', (data) => {
      const { targetUserId } = data;
      io.to(`user:${targetUserId}`).emit('call:ended', {
        userId: socket.userId,
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      logger.info(`Socket disconnected: ${socket.id}, User: ${socket.userId}`);
    });
  });

  return io;
}

export function emitToUser(io: Server, userId: string, event: string, data: any) {
  io.to(`user:${userId}`).emit(event, data);
}

export function emitToConversation(io: Server, conversationId: string, event: string, data: any) {
  io.to(`conversation:${conversationId}`).emit(event, data);
}
