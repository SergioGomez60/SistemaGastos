# Quick Start Guide

## 🚀 Get Running in 3 Steps

### Step 1: Start PostgreSQL

Choose ONE option:

**Option A: Docker (Recommended)**
```bash
docker run --name postgres-sistema-gastos \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=sistema_gastos \
  -p 5432:5432 \
  -d postgres:15
```

**Option B: Homebrew (macOS)**
```bash
brew services start postgresql
createdb sistema_gastos
```

**Option C: System Service (Linux)**
```bash
sudo systemctl start postgresql
sudo -u postgres createdb sistema_gastos
```

### Step 2: Start Backend

```bash
cd backend
npm run dev
```

Wait for:
```
✓ Database connection established successfully
✓ Database synchronized
✓ Server running on http://localhost:3000
```

### Step 3: Start Frontend (New Terminal)

```bash
cd frontend
ng serve
```

Wait for:
```
** Angular Live Development Server is listening on localhost:4200 **
```

## 🎉 You're Ready!

Open your browser to: **http://localhost:4200**

## First Time Usage

1. Click **"Sign up here"**
2. Fill in the registration form
3. You'll be automatically logged in and redirected to the dashboard
4. Try refreshing the page - you'll stay logged in!
5. Click **"Logout"** to test the logout flow

## Common Issues

**Backend won't start - "Connection refused"**
- PostgreSQL is not running. Go back to Step 1.

**Port 3000 already in use**
```bash
lsof -ti:3000 | xargs kill
```

**Port 4200 already in use**
```bash
lsof -ti:4200 | xargs kill
```

## Need More Help?

- Setup details: See `SETUP.md`
- Testing guide: See `TESTING.md`
- Architecture: See `IMPLEMENTATION_SUMMARY.md`
