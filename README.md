# Fetch Files - Pet Health Management Platform

A comprehensive mobile-first pet health management application that serves as a centralized digital platform for pet owners to access, manage, and share their pets' complete medical records.

## Project Overview

Fetch Files bridges the gap between pet owners and veterinary care providers, offering:
- Complete medical records management
- Multi-user pet management with role-based permissions
- Dual appointment system (in-person + virtual consultations)
- Secure communication and care management tools

## Tech Stack

### Mobile Application
- **Framework**: React Native 0.72+
- **Language**: TypeScript
- **State Management**: Redux Toolkit + RTK Query
- **Navigation**: React Navigation 6
- **UI Components**: React Native Paper + Custom Components
- **Real-time**: Socket.io Client
- **Video Calls**: WebRTC

### Backend API
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT + Bcrypt
- **Real-time**: Socket.io
- **File Storage**: AWS S3 / Azure Blob Storage
- **Video**: Twilio Video API

### Security & Compliance
- End-to-end encryption for medical records
- HIPAA-equivalent security standards
- Role-based access control (RBAC)
- Secure file storage and sharing

## Project Structure

```
fetch-files/
├── mobile/                 # React Native mobile application
│   ├── src/
│   │   ├── screens/       # Screen components
│   │   ├── components/    # Reusable components
│   │   ├── navigation/    # Navigation configuration
│   │   ├── services/      # API services
│   │   ├── store/         # Redux store
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript types
│   └── package.json
├── backend/               # Node.js backend API
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── services/      # Business logic
│   │   └── utils/         # Utility functions
│   └── package.json
├── shared/                # Shared types and utilities
└── docs/                  # Documentation
```

## Key Features

### Milestone 1: Medical Records Management
- ✅ Real-time medical record access
- ✅ Encrypted cloud storage
- ✅ Document upload capability
- ✅ Advanced sharing with flexible permissions
- ✅ Audit logging

### Milestone 2: Multi-User Pet Management
- ✅ Multiple caregivers per pet
- ✅ Role-based permissions (Admin, Editor, Viewer)
- ✅ Family account management
- ✅ Individual notification preferences

### Milestone 3: Dual Appointment System
- ✅ In-person appointments with primary vet
- ✅ Virtual appointments with network vets
- ✅ Real-time availability and booking
- ✅ Pre-appointment digital check-in
- ✅ Video consultation capabilities

### Milestone 4: Communication & Care Management
- ✅ Two-way secure messaging
- ✅ Medication tracking and reminders
- ✅ Refill requests
- ✅ Vaccination and wellness reminders

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL 14+
- React Native development environment (iOS/Android)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd FF
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install mobile dependencies:
```bash
cd mobile
npm install
```

4. Set up environment variables:
```bash
cp backend/.env.example backend/.env
cp mobile/.env.example mobile/.env
```

5. Run database migrations:
```bash
cd backend
npm run migrate
```

6. Start the development servers:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Mobile
cd mobile
npm start
```

## Development

### Running the Mobile App

#### iOS
```bash
cd mobile
npm run ios
```

#### Android
```bash
cd mobile
npm run android
```

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Mobile tests
cd mobile
npm test
```

## API Documentation

API documentation is available at `/api/docs` when running the backend server.

## Security

- All medical records are encrypted at rest and in transit
- JWT-based authentication with refresh tokens
- Role-based access control (RBAC)
- Audit logging for all record access
- Secure file upload with virus scanning
- Rate limiting on all endpoints

## License

Proprietary - All rights reserved

## Support

For support, please contact support@fetchfiles.com
