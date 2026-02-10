# Setup Instructions

## Prerequisites

Make sure you have the following installed:
- Node.js 18+ (`node --version`)
- PostgreSQL 15+ (`postgres --version`)
- Angular CLI (`ng version`)

## Database Setup

### Option 1: Using Docker (Recommended)

Start PostgreSQL using Docker:

```bash
docker run --name postgres-sistema-gastos \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=sistema_gastos \
  -p 5432:5432 \
  -d postgres:15
```

### Option 2: Using Local PostgreSQL

1. Start PostgreSQL service:
   - macOS: `brew services start postgresql`
   - Linux: `sudo systemctl start postgresql`
   - Windows: Start from Services

2. Create the database:
```bash
psql -U postgres -c "CREATE DATABASE sistema_gastos;"
```

### Option 3: Using existing PostgreSQL

If you have PostgreSQL already running, just create the database:
```sql
CREATE DATABASE sistema_gastos;
```

## Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies (already done):
```bash
npm install
```

3. Configure environment variables:
- Edit `backend/.env` if needed (default credentials are `postgres/postgres`)

4. Start the backend:
```bash
npm run dev
```

You should see:
```
✓ Database connection established successfully
✓ Database synchronized
✓ Server running on http://localhost:3000
```

## Frontend Setup

1. Open a new terminal and navigate to frontend:
```bash
cd frontend
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the frontend:
```bash
ng serve
```

The app will be available at `http://localhost:4200`

## Testing the Application

1. Open browser to `http://localhost:4200`
2. Click "Sign up here" to register a new user
3. Fill in the registration form
4. You'll be redirected to the dashboard
5. Try logging out and logging back in
6. Refresh the page - you should stay logged in

## API Testing (Optional)

You can test the API using curl or Postman:

### Register a user:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get profile (use token from login response):
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Troubleshooting

### Backend won't start - Connection refused
- PostgreSQL is not running. Start it using one of the options above.

### Port already in use
- Backend (3000): Kill the process using `lsof -ti:3000 | xargs kill`
- Frontend (4200): Kill the process using `lsof -ti:4200 | xargs kill`

### Database connection error
- Check your `.env` file credentials match your PostgreSQL setup
- Make sure the `sistema_gastos` database exists

## Next Steps

The authentication system is complete! You can now add:
- Expense tracking features
- Category management
- Reports and analytics
- User profile editing
- Password reset functionality
