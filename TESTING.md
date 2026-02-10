# Testing Guide

## Manual Testing Checklist

### Backend API Testing

#### 1. Health Check
```bash
curl http://localhost:3000/api/health
```
Expected response:
```json
{"status":"OK","message":"API is running"}
```

#### 2. Register New User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

Expected response (200):
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 3. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Expected response (200):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### 4. Get Profile (Protected Route)
```bash
# Replace YOUR_TOKEN with the token from login/register
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Expected response (200):
```json
{
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### 5. Test Error Cases

**Duplicate email:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "differentuser",
    "email": "john@example.com",
    "password": "password123"
  }'
```
Expected: 409 Conflict

**Invalid credentials:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "wrongpassword"
  }'
```
Expected: 401 Unauthorized

**Missing token:**
```bash
curl -X GET http://localhost:3000/api/auth/profile
```
Expected: 401 Unauthorized

**Invalid token:**
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer invalid-token"
```
Expected: 401 Unauthorized

### Frontend Testing

#### 1. Registration Flow
1. Open `http://localhost:4200`
2. Click "Sign up here"
3. Fill in the form:
   - Username: testuser
   - Email: test@example.com
   - Password: password123
   - First Name: Test
   - Last Name: User
4. Click "Create Account"
5. ✅ Should redirect to dashboard
6. ✅ Should see welcome message with user name
7. ✅ Token should be saved in localStorage (check DevTools → Application → Local Storage)

#### 2. Login Flow
1. If logged in, click "Logout"
2. Fill in login form:
   - Email: test@example.com
   - Password: password123
3. Click "Sign In"
4. ✅ Should redirect to dashboard
5. ✅ Should see user information

#### 3. Protected Routes
1. Logout from dashboard
2. Try to access `http://localhost:4200/dashboard` directly
3. ✅ Should redirect to login page

#### 4. Session Persistence
1. Login to the application
2. Refresh the page (F5)
3. ✅ Should remain logged in
4. ✅ Dashboard should still show user info

#### 5. Logout Flow
1. While logged in, click "Logout"
2. ✅ Should redirect to login page
3. ✅ Token should be removed from localStorage
4. Try accessing dashboard again
5. ✅ Should redirect to login

#### 6. Form Validation
**Registration:**
- Try submitting with empty fields → Should show errors
- Try invalid email format → Should show error
- Try password less than 6 chars → Should show error
- Try username less than 3 chars → Should show error

**Login:**
- Try submitting with empty fields → Should show errors
- Try invalid email format → Should show error

#### 7. Error Handling
- Try registering with existing email → Should show error message
- Try login with wrong password → Should show error message
- Turn off backend server → Try any action → Should show error message

### Database Verification

```bash
# Connect to PostgreSQL
psql -U postgres -d sistema_gastos

# Check users table
SELECT id, username, email, "firstName", "lastName", "createdAt" FROM users;

# Verify passwords are hashed
SELECT id, username, password FROM users;
# Password should be a bcrypt hash starting with $2b$

# Exit
\q
```

## Security Checklist

- ✅ Passwords are hashed with bcrypt (not stored in plain text)
- ✅ JWT tokens are signed with secret key
- ✅ Protected routes require valid token
- ✅ Password is never returned in API responses
- ✅ .env file is in .gitignore
- ✅ CORS is configured
- ✅ Input validation on backend (express-validator)
- ✅ Input validation on frontend (Angular validators)

## Performance Checklist

- ✅ Lazy loading for route components
- ✅ Database connection pooling configured
- ✅ JWT tokens cached in localStorage (no repeated auth calls)
- ✅ Interceptor automatically adds token to requests

## Test Results

Record your test results:

| Test | Status | Notes |
|------|--------|-------|
| Health check | ⬜ | |
| User registration | ⬜ | |
| User login | ⬜ | |
| Get profile | ⬜ | |
| Duplicate email error | ⬜ | |
| Invalid credentials | ⬜ | |
| Missing token error | ⬜ | |
| Frontend registration | ⬜ | |
| Frontend login | ⬜ | |
| Route protection | ⬜ | |
| Session persistence | ⬜ | |
| Logout | ⬜ | |
| Form validation | ⬜ | |
| Error messages | ⬜ | |
