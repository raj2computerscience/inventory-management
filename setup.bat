@echo off
REM Axim Inventory Setup Script for Windows
REM This script helps set up the application for local development

echo.
echo 🚀 Axim Inventory Setup Script
echo ==============================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+
    exit /b 1
)
echo ✓ Node.js installed
node -v

REM Check npm  
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed
    exit /b 1
)
echo ✓ npm installed
npm -v

echo.
echo 📦 Setting up Backend...
cd backend

REM Copy .env if it doesn't exist
if not exist .env (
    copy .env.example .env
    echo ✓ Created .env from .env.example
    echo   Please edit backend\.env with your database credentials
) else (
    echo ✓ .env already exists
)

REM Install dependencies
echo Installing backend dependencies...
call npm install

REM Generate Prisma client
echo Generating Prisma client...
call npx prisma generate

echo ✓ Backend setup complete!

echo.
echo 📦 Setting up Frontend...
cd ..\frontend

REM Copy .env if it doesn't exist
if not exist .env (
    copy .env.example .env
    echo ✓ Created .env from .env.example
) else (
    echo ✓ .env already exists
)

REM Install dependencies
echo Installing frontend dependencies...
call npm install

echo ✓ Frontend setup complete!

echo.
echo ✅ Setup Complete!
echo ==============================
echo.
echo Next steps:
echo 1. Make sure PostgreSQL is running
echo 2. Update backend\.env with your database credentials
echo 3. Run: cd backend ^&^& npx prisma migrate dev
echo 4. Run database migrations: npx prisma migrate deploy
echo 5. Start backend: npm run dev
echo 6. In another terminal, start frontend: cd frontend ^&^& npm start
echo.
echo Or use Docker:
echo docker-compose up --build
echo.
