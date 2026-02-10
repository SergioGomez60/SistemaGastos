#!/bin/bash

echo "🚀 Starting Sistema de Gastos Development Environment"
echo ""

# Check if PostgreSQL is running
echo "📊 Checking PostgreSQL..."
if ! nc -z localhost 5432 2>/dev/null; then
    echo "⚠️  PostgreSQL is not running on port 5432"
    echo ""
    echo "Please start PostgreSQL using one of these methods:"
    echo ""
    echo "Option 1 - Docker (recommended):"
    echo "  docker run --name postgres-sistema-gastos \\"
    echo "    -e POSTGRES_PASSWORD=postgres \\"
    echo "    -e POSTGRES_DB=sistema_gastos \\"
    echo "    -p 5432:5432 \\"
    echo "    -d postgres:15"
    echo ""
    echo "Option 2 - Homebrew (macOS):"
    echo "  brew services start postgresql"
    echo ""
    echo "Option 3 - System service (Linux):"
    echo "  sudo systemctl start postgresql"
    echo ""
    exit 1
fi

echo "✓ PostgreSQL is running"
echo ""

# Start backend
echo "🔧 Starting Backend Server..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start frontend
echo "🎨 Starting Frontend Server..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Development servers started!"
echo ""
echo "📍 Backend:  http://localhost:3000"
echo "📍 Frontend: http://localhost:4200"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for Ctrl+C
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait
