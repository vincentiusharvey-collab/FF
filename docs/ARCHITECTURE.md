# Fetch Files - System Architecture

## Overview

Fetch Files is a comprehensive pet health management platform built with a modern, scalable architecture. The system consists of three main components:

1. **Mobile Application** - React Native (Expo) cross-platform app
2. **Backend API** - Node.js/Express REST API with WebSocket support
3. **Database** - PostgreSQL with Prisma ORM

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Mobile Application                       │
│                   (React Native/Expo)                        │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Screens    │  │   Redux      │  │   Services   │     │
│  │              │  │   Store      │  │   (API)      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         │ HTTPS / WebSocket
                         │
┌────────────────────────▼─────────────────────────────────────┐
│                     Backend API Server                        │
│                  (Node.js / Express)                          │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Routes    │  │ Controllers │  │  Services   │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                │                │                 │
│  ┌──────▼──────────────────▼────────────────▼──────┐        │
│  │           Middleware Layer                      │        │
│  │  Auth | Validation | Error Handling            │        │
│  └──────────────────────┬──────────────────────────┘        │
└─────────────────────────┼─────────────────────────────────────┘
                          │
           ┌──────────────┼──────────────┐
           │              │              │
┌──────────▼─────┐ ┌─────▼──────┐ ┌────▼──────┐
│   PostgreSQL   │ │   AWS S3   │ │  Twilio   │
│   Database     │ │   Storage  │ │   Video   │
└────────────────┘ └────────────┘ └───────────┘
```

## Technology Stack

### Mobile Application

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: Redux Toolkit with RTK Query
- **Navigation**: React Navigation 6
- **UI Library**: React Native Paper (Material Design 3)
- **Forms**: React Hook Form with Zod validation
- **Real-time**: Socket.io Client

### Backend API

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL 14+
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.io
- **File Upload**: Multer
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting

### Infrastructure

- **Database**: PostgreSQL with connection pooling
- **File Storage**: AWS S3 (medical records, images)
- **Video**: Twilio Video API
- **Email**: SMTP (Nodemailer) / SendGrid
- **SMS**: Twilio
- **Logging**: Winston

## Data Model

### Core Entities

#### User
- Primary entity for authentication and authorization
- Links to pets as owner or caregiver
- Has notification preferences

#### Pet
- Belongs to a primary owner
- Can have multiple caregivers with different roles
- Central entity linking to medical records, appointments, etc.

#### PetCaregiver
- Junction table for multi-user pet management
- Defines role-based access (Admin, Editor, Viewer)

#### MedicalRecord
- Stores all medical information
- Supports multiple types (vaccination, prescription, etc.)
- Has audit logging for access

#### Appointment
- Supports both in-person and virtual appointments
- Links to clinics and veterinarians
- Tracks status and reminders

#### CareTask
- Task delegation and tracking
- Supports recurring tasks
- Priority levels

### Key Relationships

```
User ──┬─── owns ───▶ Pet ──┬─── has ───▶ MedicalRecord
       │                    │
       └── caregiverOf ──▶ PetCaregiver
                            │
                            └─── for ───▶ Pet
                                         │
                                         ├── has ──▶ Vaccination
                                         ├── has ──▶ Prescription
                                         ├── has ──▶ Appointment
                                         └── has ──▶ CareTask
```

## Security Architecture

### Authentication Flow

```
1. User Login
   ├─▶ Client sends credentials
   ├─▶ Server validates & generates JWT tokens
   │   ├─▶ Access Token (15 min expiry)
   │   └─▶ Refresh Token (7 days expiry)
   └─▶ Client stores tokens securely

2. Authenticated Request
   ├─▶ Client sends access token in Authorization header
   ├─▶ Server validates token
   └─▶ Request processed with user context

3. Token Refresh
   ├─▶ Access token expires
   ├─▶ Client sends refresh token
   ├─▶ Server generates new access token
   └─▶ Client updates stored token
```

### Authorization

- **Role-Based Access Control (RBAC)**
  - Admin: Full access to pet data and caregivers
  - Editor: Can update pet info, add records, schedule appointments
  - Viewer: Read-only access to pet information

### Data Protection

- **Encryption at Rest**: Medical records encrypted using AES-256-GCM
- **Encryption in Transit**: HTTPS/TLS for all communications
- **Access Logging**: All medical record access is audited
- **HIPAA-Equivalent**: Following veterinary healthcare data protection standards

## API Architecture

### REST API Design

- **Resource-Based URLs**: `/api/v1/pets/:petId/records`
- **HTTP Methods**: GET, POST, PUT, DELETE
- **Response Format**: Consistent JSON structure
- **Error Handling**: Standardized error responses
- **Versioning**: API version in URL path

### WebSocket Events

Real-time features using Socket.io:

- **Chat**: Instant messaging with veterinary clinics
- **Notifications**: Push notifications for appointments, tasks
- **Video Calls**: WebRTC signaling for virtual consultations
- **Typing Indicators**: Real-time typing status in conversations

## Mobile App Architecture

### State Management

```
Redux Store
├── auth slice (user, tokens, authentication state)
├── pets slice (pet list, selected pet)
├── appointments slice (upcoming appointments)
└── RTK Query API (cached server data)
```

### Navigation Structure

```
Root Navigator
├── Auth Stack (if not authenticated)
│   ├── Login Screen
│   └── Register Screen
└── Main Tabs (if authenticated)
    ├── Home Tab
    ├── Pets Stack
    │   ├── Pet List
    │   ├── Pet Profile
    │   └── Medical Records
    ├── Tasks Tab
    ├── Checklist Tab
    ├── Travel Tab
    └── Settings Tab
```

## Scalability Considerations

### Database

- **Indexes**: On frequently queried fields (userId, petId, dates)
- **Connection Pooling**: Prisma connection pooling
- **Query Optimization**: Efficient joins and eager loading
- **Archiving**: Old records moved to archive tables

### API

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Caching**: Redis for frequently accessed data (future)
- **Load Balancing**: Horizontal scaling with multiple instances (future)
- **CDN**: CloudFront for static assets (future)

### File Storage

- **AWS S3**: Scalable object storage for medical records and images
- **Image Optimization**: Compression and thumbnail generation
- **Signed URLs**: Temporary access to private files

## Monitoring & Logging

### Logging

- **Winston**: Structured logging
- **Log Levels**: Error, Warn, Info, Debug
- **Log Storage**: File-based with rotation

### Error Tracking (Future)

- Sentry for error monitoring
- Performance monitoring
- User feedback collection

## Deployment Architecture

### Development
```
Local Machine
├── PostgreSQL (local)
├── Backend API (localhost:3000)
└── Mobile App (Expo Dev Server)
```

### Production (Recommended)

```
AWS/GCP/Azure
├── Load Balancer
├── API Servers (multiple instances)
├── RDS PostgreSQL (managed database)
├── S3 (file storage)
├── CloudFront CDN
└── ElastiCache Redis (caching)
```

## Future Enhancements

1. **Microservices**: Split into separate services (auth, pets, medical, etc.)
2. **GraphQL**: Alternative to REST API
3. **Push Notifications**: FCM/APNS integration
4. **AI Features**: Symptom checker, health insights
5. **Offline Support**: Local database sync
6. **Analytics**: Usage tracking and insights

## Performance Targets

- **API Response Time**: < 200ms for most endpoints
- **Mobile App Load Time**: < 3 seconds
- **Database Queries**: < 100ms for common queries
- **Concurrent Users**: Support 10,000+ concurrent users
- **Uptime**: 99.9% availability

## Compliance & Standards

- **HIPAA-Equivalent**: Veterinary healthcare data protection
- **GDPR**: User data privacy (for international users)
- **SOC 2**: Security and availability (future certification)
- **PCI DSS**: Payment card data security (when payments added)
