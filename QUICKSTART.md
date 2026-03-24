# Quick Start Guide

## 🚀 Start Here (Choose One)

### Option 1: Docker (Recommended - Easiest)

**Prerequisite:** Docker and Docker Compose installed

```bash
cd inventory

# Start all services (Frontend, Backend, Database)
docker-compose up --build

# Wait for services to start, then visit:
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# Database: localhost:5432
```

**First Time Setup:**
1. Wait for all services to be healthy (about 1-2 minutes)
2. Open http://localhost:3000 in browser
3. Use demo credentials:
   - Email: demo@example.com
   - Password: demo123

**Or Register a new account if demo account doesn't work yet**

### Option 2: Local Development (Requires PostgreSQL)

**Prerequisites:** Node.js 18+, PostgreSQL 12+

#### Step 1: Clone and Setup

```bash
cd inventory

# Linux/Mac
chmod +x setup.sh
./setup.sh

# Or Windows
setup.bat
```

#### Step 2: Configure Database

Edit `backend/.env`:
```
DATABASE_URL="postgresql://your_user:your_password@localhost:5432/axim_inventory"
```

#### Step 3: Initialize Database

```bash
cd backend
npx prisma migrate dev
# This creates the database and runs migrations
```

#### Step 4: Start Backend

```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

#### Step 5: Start Frontend (New Terminal)

```bash
cd frontend
npm start
# App opens at http://localhost:3000
```

### Option 3: Manual Setup

```bash
# Backend
cd backend
npm install
cp .env.example .env
# Edit .env with database credentials
npx prisma generate
npx prisma migrate dev
npm run dev

# Frontend (New Terminal)
cd frontend
npm install
cp .env.example .env
npm start
```

---

## 📝 Demo Credentials

```
Email: demo@example.com
Password: demo123
```

*Note: These credentials will work if a seed script is implemented. Otherwise, register a new account.*

---

## 🎯 What to Do After Starting

### 1. **Check Dashboard**
   - View total devices and statistics
   - See device and OS distribution charts

### 2. **Add Sample Inventory**
   - Go to "Inventory" page
   - Click "Add New" button
   - Fill in device details and submit

### 3. **Try CSV Import**
   - Go to "Import CSV" page
   - Download `sample-import.csv` from project root
   - Upload and see results

### 4. **Explore Features**
   - Search for devices
   - Filter by device type
   - Edit/delete items
   - Export to CSV

---

## 🐛 Troubleshooting

### Docker Issues

**Containers won't start:**
```bash
# Check logs
docker-compose logs -f

# Rebuild from scratch
docker-compose down -v
docker-compose up --build
```

### Backend Issues

**Port 5000 already in use:**
```bash
lsof -i :5000
kill -9 <PID>
npm run dev
```

**Database connection error:**
```bash
# Verify PostgreSQL is running
psql -U your_user -d axim_inventory

# Reset database (warning: deletes data)
npx prisma migrate reset
```

### Frontend Issues

**Blank page or API errors:**
- Check browser console (F12) for errors
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend/.env

**Port 3000 already in use:**
```bash
lsof -i :3000
kill -9 <PID>
npm start
```

---

## 📚 File Structure Quick Reference

```
inventory/
├── backend/                 # Express API server
│   ├── src/                # Source code
│   └── prisma/             # Database schema
├── frontend/               # React app
│   ├── src/               # Source code
│   └── public/            # Static files
├── docker-compose.yml      # Docker orchestration
├── README.md               # Full documentation
└── sample-import.csv       # Sample data for import
```

---

## 🔗 Key Endpoints

| Feature | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000/api |
| Prisma Studio | Depends on setup |
| Database | localhost:5432 |

---

## 📖 Next Steps

1. **Read [README.md](README.md)** - Full documentation
2. **Check [backend/README.md](backend/README.md)** - Backend specific info
3. **Check [frontend/README.md](frontend/README.md)** - Frontend specific info
4. **Import sample data** - Use `sample-import.csv`
5. **Explore the API** - Try different endpoints
6. **Customize** - Modify features for your needs

---

## ✨ Features Overview

✅ Full CRUD operations for inventory  
✅ Search, filter, and pagination  
✅ CSV import with duplicate detection  
✅ CSV export functionality  
✅ Dashboard with charts  
✅ User authentication (JWT)  
✅ Responsive design  
✅ Toast notifications  
✅ Production-ready code  
✅ Docker support  

---

## 🆘 Need Help?

1. Check the main [README.md](README.md)
2. Look at [backend/README.md](backend/README.md) for API details
3. Check [frontend/README.md](frontend/README.md) for UI details
4. Review error messages in browser console (F12)
5. Check Docker logs: `docker-compose logs -f`
6. Check application logs in terminals where services run

---

## 🎉 You're All Set!

The application is ready to use. Start exploring and managing your inventory!

**Happy Inventory Management!** 📦
