#!/bin/bash

# Axim Inventory Setup Script
# This script helps set up the application for local development

set -e

echo "🚀 Axim Inventory Setup Script"
echo "=============================="
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi
echo "✓ Node.js $(node -v)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi
echo "✓ npm $(npm -v)"

# Check PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed. Using Docker is recommended."
else
    echo "✓ PostgreSQL installed"
fi

echo ""
echo "📦 Setting up Backend..."
cd backend

# Copy .env if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✓ Created .env from .env.example"
    echo "  Please edit backend/.env with your database credentials"
else
    echo "✓ .env already exists"
fi

# Install dependencies
echo "Installing backend dependencies..."
npm install

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

echo "✓ Backend setup complete!"

echo ""
echo "📦 Setting up Frontend..."
cd ../frontend

# Copy .env if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✓ Created .env from .env.example"
else
    echo "✓ .env already exists"
fi

# Install dependencies
echo "Installing frontend dependencies..."
npm install

echo "✓ Frontend setup complete!"

echo ""
echo "✅ Setup Complete!"
echo "=============================="
echo ""
echo "Next steps:"
echo "1. Make sure PostgreSQL is running"
echo "2. Update backend/.env with your database credentials"
echo "3. Run: cd backend && npx prisma migrate dev"
echo "4. Run database migrations: npx prisma migrate deploy"
echo "5. Start backend: npm run dev"
echo "6. In another terminal, start frontend: cd frontend && npm start"
echo ""
echo "Or use Docker:"
echo "docker-compose up --build"
echo ""
