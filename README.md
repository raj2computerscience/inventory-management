# Axim Inventory Management Web Application

A comprehensive full-stack Inventory Management System built with React, Node.js/Express, and PostgreSQL.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
  - [Local Development](#local-development)
  - [Docker Setup](#docker-setup)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### Core Inventory Management
- **Add/Edit/Delete** inventory items manually via user-friendly forms
- **Search & Filter** inventory by device type, user name, or specifications
- **Pagination** for efficient browsing of large datasets
- **Detailed View** modal for comprehensive inventory information
- **Real-time Updates** of inventory data

### CSV Import/Export
- **Bulk Import** inventory data from CSV files
- **Auto-Validation** of required fields and unique serial numbers
- **Duplicate Detection** with detailed import reports
- **Error Reporting** showing success/failure statistics
- **Export to CSV** for inventory backups and reporting

### Dashboard Analytics
- **Statistics Cards** showing total devices and device distribution
- **Bar Charts** displaying devices by type
- **Pie Charts** showing OS distribution
- **Quick Actions** for common operations

### Authentication & Authorization
- **JWT-based Authentication** for secure access
- **User Registration** with email validation
- **Login/Logout** functionality
- **Role-based Access** (admin/user) foundation

### UI/UX
- **Responsive Design** optimized for desktop and mobile
- **Professional Dashboard** with intuitive navigation
- **Toast Notifications** for user feedback
- **Material UI Integration** for modern components
- **Tailwind CSS** for utility-first styling
- **Loading States** and error handling

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Material UI** - Component library
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **React Icons** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Prisma ORM** - Database ORM
- **PostgreSQL** - Relational database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **csv-parser** - CSV parsing
- **Multer** - File upload middleware

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📁 Project Structure

```
inventory/
├── backend/
│   ├── src/
│   │   ├── controllers/        # Business logic
│   │   │   ├── inventoryController.js
│   │   │   └── authController.js
│   │   ├── routes/             # API routes
│   │   │   ├── inventory.js
│   │   │   └── auth.js
│   │   ├── middleware/         # Custom middleware
│   │   │   ├── errorHandler.js
│   │   │   └── auth.js
│   │   ├── utils/              # Utility functions
│   │   │   ├── auth.js
│   │   │   └── db.js
│   │   └── index.js            # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── migrations/         # Database migrations
│   ├── .env                    # Environment variables
│   ├── .env.example            # Example env file
│   ├── Dockerfile              # Docker configuration
│   ├── .dockerignore           # Docker ignore file
│   ├── .gitignore              # Git ignore file
│   └── package.json            # Dependencies
│
├── frontend/
│   ├── public/
│   │   └── index.html          # HTML template
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Navbar.js
│   │   │   ├── Modal.js
│   │   │   ├── InventoryTable.js
│   │   │   ├── InventoryForm.js
│   │   │   ├── Pagination.js
│   │   │   └── Toast.js
│   │   ├── pages/              # Page components
│   │   │   ├── Dashboard.js
│   │   │   ├── Inventory.js
│   │   │   ├── ImportCSV.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── services/
│   │   │   └── api.js          # API client
│   │   ├── context/            # React Context
│   │   │   ├── AuthContext.js
│   │   │   └── ToastContext.js
│   │   ├── utils/
│   │   │   └── helpers.js      # Utility functions
│   │   ├── App.js              # Main app component
│   │   ├── index.js            # React root
│   │   └── index.css           # Global styles
│   ├── postcsss.config.js      # PostCSS config
│   ├── tailwind.config.js      # Tailwind config
│   ├── .env                    # Environment variables
│   ├── .env.example            # Example env file
│   ├── Dockerfile              # Docker configuration
│   ├── .dockerignore           # Docker ignore file
│   ├── .gitignore              # Git ignore file
│   └── package.json            # Dependencies
│
├── docker-compose.yml          # Docker Compose config
├── .env.docker                 # Docker environment variables
├── .gitignore                  # Root git ignore
└── README.md                   # This file
```

## 📋 Prerequisites

### For Local Development
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **PostgreSQL** (v12 or higher)
- **Git**

### For Docker
- **Docker** (v20.10 or higher)
- **Docker Compose** (v2.0 or higher)

## 🚀 Installation & Setup

### Local Development

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd inventory
```

#### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL="postgresql://user:password@localhost:5432/axim_inventory"

# Run Prisma migrations
npx prisma migrate dev

# Optional: Seed the database (if seed script exists)
# npx prisma db seed

# Start development server
npm run dev
```

The backend server will run on `http://localhost:5000`

#### 3. Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm start
```

The frontend will open at `http://localhost:3000`

### Docker Setup

#### 1. Prepare Environment

```bash
cd inventory

# Copy the example docker env file
cp .env.docker .env.local

# Edit .env.local if needed (optional - defaults are fine to start)
```

#### 2. Build and Run with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

Services will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- Database: `localhost:5432`

#### 3. View Logs

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

#### 4. Stop Services

```bash
# Stop and remove containers
docker-compose down

# Stop and remove volumes (removes database data)
docker-compose down -v
```

## ⚙️ Configuration

### Backend Configuration

Edit `backend/.env`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/axim_inventory"

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_secure_secret_key_here

# File Upload
MAX_FILE_SIZE=52428800
UPLOAD_DIR=uploads
```

### Frontend Configuration

Edit `frontend/.env`:

```env
# API URL
REACT_APP_API_URL=http://localhost:5000/api
```

### Database Setup (Manual)

If not using Docker or Prisma migrations:

```sql
-- Create database
CREATE DATABASE axim_inventory;

-- Connect to database
\c axim_inventory;

-- Run migrations using Prisma
npx prisma migrate deploy
```

## 💻 Usage

### Demo Credentials

```
Email: demo@example.com
Password: demo123
```

### 1. **Registration**
   - Navigate to `/register`
   - Fill in email, username, and password
   - Click Register

### 2. **Login**
   - Navigate to `/login`
   - Enter credentials
   - Click Login

### 3. **Add Inventory**
   - Go to Inventory page
   - Click "Add New" button
   - Fill in device details
   - Submit form

### 4. **Search & Filter**
   - Use search box to find devices by name, model, or serial number
   - Use filter dropdown to filter by device type
   - Pagination controls to navigate pages

### 5. **Edit Inventory**
   - Click edit icon on any item
   - Modify details in modal
   - Submit changes

### 6. **Delete Inventory**
   - Click delete icon on any item
   - Confirm deletion

### 7. **Import CSV**
   - Go to Import CSV page
   - Upload CSV file with proper format
   - View import report with statistics

### 8. **Export CSV**
   - Go to Dashboard
   - Click "Export CSV" button
   - File downloads automatically

### 9. **View Dashboard**
   - Dashboard shows total devices, device types, and OS distribution
   - Charts update automatically based on data

## 📚 API Documentation

### Authentication Endpoints

#### **Register**
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "password123"
}

Response: 201
{
  "message": "User registered successfully",
  "user": { id, email, username, role },
  "token": "jwt_token"
}
```

#### **Login**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200
{
  "message": "Login successful",
  "user": { id, email, username, role },
  "token": "jwt_token"
}
```

#### **Get Current User**
```
GET /api/auth/me
Authorization: Bearer <token>

Response: 200
{ id, email, username, role }
```

### Inventory Endpoints

#### **Get All Inventory**
```
GET /api/inventory?page=1&limit=10&search=&deviceType=Laptop
Authorization: Bearer <token>

Response: 200
{
  "inventory": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

#### **Get Single Inventory**
```
GET /api/inventory/:id
Authorization: Bearer <token>

Response: 200
{ id, userName, deviceType, deviceMake, ... }
```

#### **Create Inventory**
```
POST /api/inventory
Authorization: Bearer <token>
Content-Type: application/json

{
  "userName": "John Doe",
  "deviceType": "Laptop",
  "deviceMake": "Dell",
  "deviceModel": "XPS 13",
  "serialNumber": "ABC123XYZ",
  "operatingSystem": "Windows 11",
  "processor": "Intel Core i7",
  "ram": "16GB",
  "disk": "512GB SSD",
  "remarks": "Company laptop"
}

Response: 201
{ id, ... }
```

#### **Update Inventory**
```
PUT /api/inventory/:id
Authorization: Bearer <token>
Content-Type: application/json

{ same fields as create }

Response: 200
{ id, ... }
```

#### **Delete Inventory**
```
DELETE /api/inventory/:id
Authorization: Bearer <token>

Response: 200
{ "message": "Inventory deleted successfully" }
```

#### **Import CSV**
```
POST /api/inventory/import
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
file: <csv_file>

Response: 200
{
  "message": "CSV imported successfully",
  "totalRecords": 10,
  "successCount": 9,
  "failureCount": 1,
  "duplicates": 0,
  "duplicateSerials": []
}
```

#### **Get Dashboard Stats**
```
GET /api/inventory/stats/dashboard
Authorization: Bearer <token>

Response: 200
{
  "totalDevices": 50,
  "devicesByType": [
    { "type": "Laptop", "count": 25 },
    { "type": "PC", "count": 15 },
    ...
  ],
  "osDistribution": [
    { "os": "Windows 11", "count": 30 },
    { "os": "macOS", "count": 20 },
    ...
  ]
}
```

#### **Export CSV**
```
GET /api/inventory/export/csv
Authorization: Bearer <token>

Response: 200
File download (CSV format)
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Inventory Table
```sql
CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  userName VARCHAR(255) NOT NULL,
  deviceType VARCHAR(255) NOT NULL,
  deviceMake VARCHAR(255),
  deviceModel VARCHAR(255),
  serialNumber VARCHAR(255) UNIQUE NOT NULL,
  operatingSystem VARCHAR(255),
  processor VARCHAR(255),
  ram VARCHAR(255),
  disk VARCHAR(255),
  remarks TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_userId (userId),
  INDEX idx_deviceType (deviceType),
  INDEX idx_serialNumber (serialNumber)
);
```

### Import Logs Table
```sql
CREATE TABLE import_logs (
  id SERIAL PRIMARY KEY,
  fileName VARCHAR(255) NOT NULL,
  totalRecords INT NOT NULL,
  successCount INT NOT NULL,
  failureCount INT NOT NULL,
  duplicates INT NOT NULL,
  errorDetails TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🐛 Troubleshooting

### Common Issues

#### **Backend won't start**
```bash
# Check if port 5000 is in use
lsof -i :5000

# Kill process using port 5000
kill -9 <PID>

# Ensure DATABASE_URL is correct in .env
# Try restarting:
npm run dev
```

#### **Database connection error**
```bash
# Verify PostgreSQL is running
psql -U axim_user -d axim_inventory

# Reset database (warning: deletes all data)
npx prisma migrate reset

# Reapply migrations
npx prisma migrate deploy

# Check database status
npx prisma studio
```

#### **Frontend won't connect to backend**
```bash
# Check backend is running on port 5000
curl http://localhost:5000/api/health

# Verify REACT_APP_API_URL in frontend/.env
REACT_APP_API_URL=http://localhost:5000/api

# Clear browser cache and restart frontend
npm start
```

#### **Docker containers won't start**
```bash
# Check Docker daemon is running
docker ps

# View error logs
docker-compose logs backend

# Rebuild containers
docker-compose down
docker-compose build --no-cache
docker-compose up

# Check container health
docker ps --format "table {{.Names}}\t{{.Status}}"
```

#### **CSV Import fails**
- Ensure CSV has required columns: User Name, Device Type, Serial Number
- Check for duplicate serial numbers in CSV and database
- Verify file size is under 50MB
- Ensure CSV encoding is UTF-8

#### **Port already in use**
```bash
# Frontend (port 3000)
lsof -i :3000
kill -9 <PID>

# Backend (port 5000)
lsof -i :5000
kill -9 <PID>

# Database (port 5432)
lsof -i :5432
kill -9 <PID>
```

### Logs and Debugging

```bash
# Backend logs
# If running locally:
npm run dev

# If running in Docker:
docker-compose logs -f backend

# Frontend logs
# Check browser console: F12 -> Console tab

# Database logs
docker-compose logs -f postgres

# Access Prisma Studio (database GUI)
cd backend
npx prisma studio
# Opens at http://localhost:5555
```

## 📝 Environment Variables Reference

### Backend (.env)
| Variable | Default | Description |
|----------|---------|-------------|
| DATABASE_URL | - | PostgreSQL connection string |
| PORT | 5000 | Server port |
| NODE_ENV | development | Environment (development/production) |
| JWT_SECRET | - | JWT signing secret (keep secure!) |
| MAX_FILE_SIZE | 52428800 | Max upload size in bytes (50MB) |
| UPLOAD_DIR | uploads | Upload directory path |

### Frontend (.env)
| Variable | Default | Description |
|----------|---------|-------------|
| REACT_APP_API_URL | http://localhost:5000/api | Backend API URL |

### Docker (.env.docker)
| Variable | Default | Description |
|----------|---------|-------------|
| DB_USER | axim_user | Database username |
| DB_PASSWORD | axim_password | Database password |
| DB_NAME | axim_inventory | Database name |
| DB_PORT | 5432 | Database port |
| NODE_ENV | production | Node environment |
| JWT_SECRET | - | JWT secret |
| BACKEND_PORT | 5000 | Backend exposed port |
| FRONTEND_PORT | 3000 | Frontend exposed port |

## 📄 License

This project is licensed under the ISC License.

## 👥 Support

For issues and questions:
1. Check the Troubleshooting section
2. Review the API documentation
3. Check docker-compose logs
4. Ensure all prerequisites are installed

---

**Happy Inventory Managing! 📦**
