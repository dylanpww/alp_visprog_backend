# Event Management API

A robust TypeScript + Express + Prisma backend for managing events and reviews.

## 🏗️ Architecture

```
src/
├── controllers/      # Request handlers
├── errors/          # Custom error classes
├── middlewares/     # Express middlewares
├── models/          # TypeScript interfaces/types
├── routes/          # API route definitions
├── services/        # Business logic layer
├── utils/           # Utility functions
└── validations/     # Input validation rules
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your database credentials
nano .env

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start development server
npm run dev
```

### Environment Variables

```env
DATABASE_URL="postgresql://username:password@localhost:5432/event_db?schema=public"
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## 📡 API Endpoints

### Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | Get all events |
| GET | `/api/events/:id` | Get event by ID |
| POST | `/api/events` | Create new event |
| PUT | `/api/events/:id` | Update event |
| DELETE | `/api/events/:id` | Delete event |

### Reviews

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews` | Get all reviews |
| GET | `/api/reviews/:id` | Get review by ID |
| GET | `/api/reviews/event/:eventId` | Get reviews for event |
| POST | `/api/reviews` | Create new review |
| PUT | `/api/reviews/:id` | Update review |
| DELETE | `/api/reviews/:id` | Delete review |

## 📝 Request Examples

### Create Event
```bash
POST /api/events
Content-Type: application/json

{
  "name": "Tech Conference 2024",
  "location": "San Francisco, CA",
  "description": "Annual technology conference with industry leaders",
  "photoUrl": "https://example.com/photo.jpg",
  "rating": 4.5
}
```

### Create Review
```bash
POST /api/reviews
Content-Type: application/json

{
  "eventId": 1,
  "userName": "John Doe",
  "rating": 5,
  "comment": "Amazing event! Highly recommended.",
  "photoUrl": "https://example.com/review-photo.jpg"
}
```

## ✅ Validation Rules

### Event Validation
- **name**: Required, 3-255 characters
- **location**: Required, 3-255 characters
- **description**: Required, minimum 10 characters
- **photoUrl**: Optional, valid URL
- **rating**: Optional, 0-5 range

### Review Validation
- **eventId**: Required, valid event ID
- **userName**: Required, 2-255 characters
- **rating**: Required, 1-5 range
- **comment**: Required, minimum 5 characters
- **photoUrl**: Optional, valid URL

## 🗃️ Database Schema

### Events Table
```prisma
model Event {
  id          Int       @id @default(autoincrement())
  name        String
  location    String
  description String
  photoUrl    String?
  rating      Float     @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  reviews     Review[]
}
```

### Reviews Table
```prisma
model Review {
  id        Int      @id @default(autoincrement())
  eventId   Int
  userName  String
  rating    Float
  comment   String
  photoUrl  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  event     Event    @relation(fields: [eventId], references: [id])
}
```

## 🧪 Scripts

```bash
# Development
npm run dev              # Start dev server with nodemon

# Build
npm run build            # Compile TypeScript to JavaScript

# Production
npm start                # Run compiled JavaScript

# Prisma
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio GUI
npm run prisma:push      # Push schema changes
```

## 🔒 Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `404` - Not Found
- `500` - Internal Server Error

## 🌟 Features

- ✅ TypeScript for type safety
- ✅ Prisma ORM for database access
- ✅ Express.js for routing
- ✅ Input validation with express-validator
- ✅ Custom error handling
- ✅ CORS enabled
- ✅ Security headers with Helmet
- ✅ Request logging with Morgan
- ✅ Environment variables with dotenv
- ✅ Graceful shutdown handling
- ✅ Auto-update event ratings from reviews

## 📊 Response Format

All successful responses follow this format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

## 🔗 Related Projects

Connect this backend with the Kotlin Android app at:
`/Users/mdanielelel/Documents/VP 2/ALP/event/`

Update the API base URL in the Android app:
```kotlin
private const val BASE_URL = "http://10.0.2.2:5000/api/"
```

## 📄 License

MIT
