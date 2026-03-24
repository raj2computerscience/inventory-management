# Axim Inventory Backend API

Express.js backend API for the Axim Inventory Management System with Prisma ORM and PostgreSQL.

## 📋 Quick Start

### Prerequisites
- Node.js v18+
- PostgreSQL 12+
- npm or yarn

### Local Setup

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL="postgresql://user:password@localhost:5432/axim_inventory"

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Server runs on `http://localhost:5000`

### Docker Setup

```bash
# From root directory
docker-compose up --build backend

# Or just the database
docker-compose up postgres
```

## 📁 Directory Structure

```
src/
├── controllers/
│   ├── inventoryController.js    # Inventory CRUD & CSV import/export
│   └── authController.js         # Authentication logic
├── routes/
│   ├── inventory.js              # Inventory API routes
│   └── auth.js                   # Auth API routes
├── middleware/
│   ├── errorHandler.js           # Global error handling
│   └── auth.js                   # JWT middleware
├── utils/
│   ├── auth.js                   # Auth utilities (JWT, bcrypt)
│   └── db.js                     # Prisma client
└── index.js                      # Express app entry point

prisma/
├── schema.prisma                 # Database schema
└── migrations/                   # Database migrations

.env                              # Environment variables
package.json                      # Dependencies
Dockerfile                        # Docker configuration
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (requires auth)
- `POST /api/auth/refresh` - Refresh JWT token

### Inventory Management
- `GET /api/inventory` - Get all inventory (pagination, search, filter)
- `GET /api/inventory/:id` - Get single item
- `POST /api/inventory` - Create new item
- `PUT /api/inventory/:id` - Update item
- `DELETE /api/inventory/:id` - Delete item

### CSV Operations
- `POST /api/inventory/import` - Import CSV file
- `GET /api/inventory/export/csv` - Export to CSV

### Dashboard
- `GET /api/inventory/stats/dashboard` - Dashboard statistics

## 🗄️ Database Schema

### Users
- id (Primary Key)
- email (Unique)
- username (Unique)
- password (hashed)
- role (admin/user)
- createdAt
- updatedAt

### Inventory
- id (Primary Key)
- userId (Foreign Key)
- userName
- deviceType
- deviceMake
- deviceModel
- serialNumber (Unique)
- operatingSystem
- processor
- ram
- disk
- remarks
- createdAt
- updatedAt

### ImportLogs
- id (Primary Key)
- fileName
- totalRecords
- successCount
- failureCount
- duplicates
- errorDetails
- createdAt

## 🔒 Authentication

Uses JWT (JSON Web Tokens) for authentication:

1. User registers/logs in with email and password
2. Password is hashed using bcryptjs
3. JWT token returned with 7-day expiration
4. Token included in Authorization header for protected routes
5. Middleware validates token on each request

## 📤 CSV Import Format

Required columns in CSV:
```
User Name, Device Type, Device Make/Model, Serial Number, Operating System, Processor, RAM, Disk, Remarks
```

Device Types:
- Laptop
- PC
- MacBook
- Mac Mini
- Mobile/Tablet
- Network Device
- Other

Features:
- Duplicate serial number detection
- Validation of required fields
- Detailed import report with success/failure stats

## 🚀 Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/axim_inventory
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_here
MAX_FILE_SIZE=52428800
UPLOAD_DIR=uploads
```

## 📦 Dependencies

### Production
- `@prisma/client` - Database ORM
- `express` - Web framework
- `cors` - CORS middleware
- `dotenv` - Environment variables
- `jsonwebtoken` - JWT tokens
- `bcryptjs` - Password hashing
- `csv-parser` - CSV parsing
- `multer` - File uploads
- `express-validator` - Input validation

### Development
- `nodemon` - Auto-reload
- `@prisma/cli` - Prisma commands

## 🛠️ Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start with nodemon (development)
npm run prisma:migrate    # Create and apply migrations
npm run prisma:studio     # Open Prisma Studio (GUI for DB)
npm run prisma:push       # Push schema to database
```

## 🔍 Prisma Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create migration
npx prisma migrate dev --name "description"

# Apply migrations
npx prisma migrate deploy

# Reset database (warning: deletes all data)
npx prisma migrate reset

# Open Prisma Studio GUI
npx prisma studio

# View schema
npx prisma db push
```

## 📝 Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message here",
  "details": "Additional details (only in development)"
}
```

Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict (e.g., duplicate serial number)
- `500` - Server Error

## 🧪 Testing API Endpoints

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","username":"user","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123"}'

# Get inventory (with token)
curl -X GET http://localhost:5000/api/inventory \
  -H "Authorization: Bearer <token>"

# Create inventory
curl -X POST http://localhost:5000/api/inventory \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"userName":"John","deviceType":"Laptop","serialNumber":"ABC123",...}'
```

### Using Postman
1. Import API endpoints
2. Set up Bearer Token in Authorization tab
3. Add request body for POST/PUT requests
4. Send requests

## 🐛 Debugging

Enable detailed logging:
```bash
# Show all database queries
DEBUG=prisma:* npm run dev

# Show all app logs
NODE_DEBUG=express npm run dev
```

Access Prisma Studio:
```bash
npx prisma studio
# Opens at http://localhost:5555
```

View database directly:
```bash
psql -U axim_user -d axim_inventory
```

## 🚢 Deployment

### Production Setup

1. **Environment Variables**
   ```env
   NODE_ENV=production
   DATABASE_URL=postgresql://prod_user:prod_password@prod_host:5432/axim_inventory
   JWT_SECRET=very_secure_secret_key_min_32_chars
   ```

2. **Database Migrations**
   ```bash
   npx prisma migrate deploy
   ```

3. **Start Server**
   ```bash
   npm start
   ```

### Via Docker

```bash
docker build -t axim-backend .
docker run -p 5000:5000 \
  -e DATABASE_URL="postgresql://..." \
  -e JWT_SECRET="..." \
  axim-backend
```

## 📚 References

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)

## 📄 License

ISC License

---

**Backend Setup Complete! 🚀**
