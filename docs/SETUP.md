# Fetch Files - Setup Guide

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- React Native development environment (for mobile)
- Git

## Initial Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd FF
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# - Set DATABASE_URL to your PostgreSQL connection string
# - Set JWT secrets
# - Configure AWS/Twilio/SMTP credentials

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run migrate

# (Optional) Seed database with sample data
npm run seed

# Start development server
npm run dev
```

The backend API will be available at `http://localhost:3000`

### 3. Mobile App Setup

```bash
cd mobile

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env
# - Set API_URL to your backend URL (e.g., http://localhost:3000/api/v1)

# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

## Database Setup

### PostgreSQL Installation

**macOS:**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql-14
sudo systemctl start postgresql
```

**Windows:**
Download and install from https://www.postgresql.org/download/windows/

### Create Database

```bash
# Connect to PostgreSQL
psql postgres

# Create database
CREATE DATABASE fetchfiles;

# Create user (if needed)
CREATE USER fetchuser WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE fetchfiles TO fetchuser;
```

### Update DATABASE_URL

Edit `backend/.env`:
```
DATABASE_URL="postgresql://fetchuser:your_password@localhost:5432/fetchfiles?schema=public"
```

## Development

### Running the Backend

```bash
cd backend
npm run dev
```

The server will restart automatically when you make changes.

### Running the Mobile App

```bash
cd mobile
npm start
```

This will start Expo Dev Server. You can:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your physical device

### Database Migrations

When you make changes to `backend/prisma/schema.prisma`:

```bash
cd backend

# Create a new migration
npx prisma migrate dev --name your_migration_name

# Apply migrations to production
npx prisma migrate deploy

# View database in Prisma Studio
npx prisma studio
```

## Testing

### Backend Tests

```bash
cd backend
npm test

# Watch mode
npm run test:watch

# Coverage
npm test -- --coverage
```

### Mobile Tests

```bash
cd mobile
npm test
```

## Building for Production

### Backend

```bash
cd backend

# Build TypeScript
npm run build

# Start production server
npm start
```

### Mobile

```bash
cd mobile

# Build for iOS
expo build:ios

# Build for Android
expo build:android
```

## Deployment

### Backend Deployment (Example: Heroku)

```bash
# Install Heroku CLI
brew install heroku/brew/heroku

# Login to Heroku
heroku login

# Create Heroku app
heroku create fetch-files-api

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set JWT_ACCESS_SECRET=your_secret
heroku config:set JWT_REFRESH_SECRET=your_secret

# Deploy
git push heroku main

# Run migrations
heroku run npm run migrate:prod
```

### Mobile Deployment

Follow the official Expo documentation for app store deployment:
- iOS: https://docs.expo.dev/distribution/app-stores/#ios
- Android: https://docs.expo.dev/distribution/app-stores/#android

## Environment Variables

### Backend (.env)

```bash
# Server
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/fetchfiles"

# JWT
JWT_ACCESS_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-secret-key
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Encryption
ENCRYPTION_KEY=your-32-character-key

# AWS S3
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=fetch-files-medical-records

# Twilio
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
TWILIO_VIDEO_API_KEY=your-key

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
```

### Mobile (.env)

```bash
API_URL=http://localhost:3000/api/v1
WS_URL=ws://localhost:3000
ENVIRONMENT=development
```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Prisma Client Out of Sync

```bash
cd backend
npm run prisma:generate
```

### Metro Bundler Issues (Mobile)

```bash
cd mobile
npx expo start -c
```

### Database Connection Issues

1. Verify PostgreSQL is running
2. Check DATABASE_URL in .env
3. Ensure database exists
4. Check user permissions

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)

## Support

For setup issues, please contact support@fetchfiles.com
