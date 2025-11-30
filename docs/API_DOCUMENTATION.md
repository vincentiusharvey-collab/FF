# Fetch Files API Documentation

## Base URL
```
http://localhost:3000/api/v1
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

### Authentication Endpoints

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "tokens": {
      "accessToken": "jwt_token",
      "refreshToken": "refresh_token",
      "expiresIn": 900
    }
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

---

## Pets Endpoints

### Get User's Pets
```http
GET /pets
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Bella",
      "type": "DOG",
      "breed": "Golden Retriever",
      "gender": "FEMALE",
      "weight": 65,
      "weightUnit": "lbs",
      "profileImage": "url",
      "primaryOwnerId": "uuid"
    }
  ]
}
```

### Create Pet
```http
POST /pets
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Bella",
  "type": "DOG",
  "breed": "Golden Retriever",
  "gender": "FEMALE",
  "weight": 65,
  "weightUnit": "lbs"
}
```

### Get Pet by ID
```http
GET /pets/:petId
Authorization: Bearer <token>
```

### Update Pet
```http
PUT /pets/:petId
Authorization: Bearer <token>
Content-Type: application/json

{
  "weight": 67,
  "profileImage": "new_url"
}
```

### Delete Pet
```http
DELETE /pets/:petId
Authorization: Bearer <token>
```

---

## Caregiver Management

### Get Pet Caregivers
```http
GET /pets/:petId/caregivers
Authorization: Bearer <token>
```

### Add Caregiver
```http
POST /pets/:petId/caregivers
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "caregiver@example.com",
  "role": "EDITOR"
}
```

Roles: `ADMIN`, `EDITOR`, `VIEWER`

---

## Medical Records

### Get Medical Records
```http
GET /medical/pets/:petId/records
Authorization: Bearer <token>
```

### Create Medical Record
```http
POST /medical/pets/:petId/records
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "VACCINATION",
  "title": "Rabies Vaccination",
  "description": "Annual rabies shot",
  "date": "2023-10-26T00:00:00Z",
  "veterinarianName": "Dr. Smith",
  "clinicName": "Pet Care Clinic"
}
```

Types: `VACCINATION`, `LAB_RESULT`, `VISIT_SUMMARY`, `PRESCRIPTION`, `PROCEDURE`, `DIAGNOSIS`, `ALLERGY`, `VITAL_SIGNS`, `IMAGE`, `DOCUMENT`

### Share Medical Record
```http
POST /medical/records/:recordId/share
Authorization: Bearer <token>
Content-Type: application/json

{
  "recipient": "vet@example.com",
  "shareMethod": "EMAIL",
  "permissions": "READ_ONLY",
  "expiresAt": "2024-12-31T00:00:00Z"
}
```

### Get Vaccinations
```http
GET /medical/pets/:petId/vaccinations
Authorization: Bearer <token>
```

### Get Prescriptions
```http
GET /medical/pets/:petId/prescriptions
Authorization: Bearer <token>
```

---

## Appointments

### Get Appointments
```http
GET /appointments
Authorization: Bearer <token>
```

### Create Appointment
```http
POST /appointments
Authorization: Bearer <token>
Content-Type: application/json

{
  "petId": "uuid",
  "type": "IN_PERSON_WELLNESS",
  "scheduledDate": "2024-01-15T14:00:00Z",
  "duration": 30,
  "reason": "Annual checkup",
  "clinicId": "uuid",
  "isVirtual": false
}
```

Types:
- `IN_PERSON_WELLNESS`
- `IN_PERSON_SICK_VISIT`
- `IN_PERSON_PROCEDURE`
- `VIRTUAL_CONSULTATION`
- `VIRTUAL_URGENT_CARE`

### Cancel Appointment
```http
DELETE /appointments/:appointmentId
Authorization: Bearer <token>
```

---

## Care Tasks

### Get Care Tasks
```http
GET /care/tasks
Authorization: Bearer <token>
```

### Create Care Task
```http
POST /care/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "petId": "uuid",
  "type": "MEDICATION",
  "title": "Give Morning Meds",
  "assignedTo": "uuid",
  "scheduledTime": "2024-01-01T08:00:00Z",
  "priority": "HIGH",
  "dosage": "2 pills",
  "medication": "Amoxicillin"
}
```

### Complete Care Task
```http
POST /care/tasks/:taskId/complete
Authorization: Bearer <token>
```

### Medication Reminders
```http
GET /care/pets/:petId/medication-reminders
POST /care/pets/:petId/medication-reminders
PUT /care/medication-reminders/:reminderId
DELETE /care/medication-reminders/:reminderId
```

---

## Communication

### Get Conversations
```http
GET /communications/conversations
Authorization: Bearer <token>
```

### Send Message
```http
POST /communications/conversations/:conversationId/messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Hello, I have a question about my pet",
  "type": "TEXT"
}
```

### Get Notifications
```http
GET /communications/notifications
Authorization: Bearer <token>
```

### Mark Notification as Read
```http
PUT /communications/notifications/:notificationId/read
Authorization: Bearer <token>
```

---

## Travel Planning

### Get Travel Plans
```http
GET /travel/plans
Authorization: Bearer <token>
```

### Create Travel Plan
```http
POST /travel/plans
Authorization: Bearer <token>
Content-Type: application/json

{
  "petId": "uuid",
  "destination": "Paris, France",
  "departureDate": "2024-06-01T00:00:00Z",
  "returnDate": "2024-06-15T00:00:00Z",
  "travelMode": "IN_CABIN",
  "airline": "Air France",
  "flightNumber": "AF123"
}
```

### Get Travel Documents
```http
GET /travel/pets/:petId/documents
Authorization: Bearer <token>
```

### Generate Pet ID Card
```http
POST /travel/pets/:petId/id-card
Authorization: Bearer <token>
```

---

## Clinics

### Search Clinics
```http
GET /clinics?query=emergency&latitude=40.7128&longitude=-74.0060
```

### Get Clinic Details
```http
GET /clinics/:clinicId
```

### Get Clinic Veterinarians
```http
GET /clinics/:clinicId/veterinarians
```

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

### Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

API requests are limited to 100 requests per 15 minutes per IP address. Exceeding this limit will result in a 429 Too Many Requests response.

---

## WebSocket Events

Connect to WebSocket server for real-time updates:

```javascript
const socket = io('ws://localhost:3000', {
  auth: {
    token: 'your_access_token'
  }
});

// Chat events
socket.on('chat:message', (data) => {
  console.log('New message:', data);
});

// Typing indicators
socket.emit('typing:start', conversationId);
socket.emit('typing:stop', conversationId);

// Video call signaling
socket.emit('call:offer', { targetUserId, offer });
socket.on('call:answer', ({ answer, answererId }) => {});
```

---

## Best Practices

1. **Token Management**: Store tokens securely and refresh them before expiration
2. **Error Handling**: Always check the `success` field in responses
3. **Pagination**: Use `page` and `limit` query parameters for large datasets
4. **File Uploads**: Use multipart/form-data for uploading images and documents
5. **Filtering**: Use query parameters for filtering results (e.g., `?status=PENDING`)
6. **Timestamps**: All timestamps are in ISO 8601 format (UTC)

---

## Support

For API support, please contact support@fetchfiles.com
