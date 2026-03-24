# Axim Inventory Frontend

React-based frontend for the Axim Inventory Management System with responsive design and modern UI.

## 📋 Quick Start

### Prerequisites
- Node.js v18+
- npm or yarn

### Local Setup

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start development server
npm start
```

App opens at `http://localhost:3000`

### Docker Setup

```bash
# From root directory
docker-compose up --build frontend

# Or build and run standalone
docker build -t axim-frontend .
docker run -p 3000:3000 axim-frontend
```

## 📁 Directory Structure

```
src/
├── components/
│   ├── Navbar.js              # Navigation bar with user menu
│   ├── Modal.js               # Reusable modal component
│   ├── Pagination.js          # Pagination controls
│   ├── InventoryTable.js      # Main inventory table
│   ├── InventoryForm.js       # Add/edit inventory form
│   └── Toast.js               # Notifications
├── pages/
│   ├── Dashboard.js           # Dashboard with charts
│   ├── Inventory.js           # Inventory management page
│   ├── ImportCSV.js           # CSV import page
│   ├── Login.js               # Login page
│   └── Register.js            # Registration page
├── services/
│   └── api.js                 # Axios API client with interceptors
├── context/
│   ├── AuthContext.js         # Authentication context
│   └── ToastContext.js        # Toast notifications context
├── utils/
│   └── helpers.js             # Utility functions
├── App.js                     # Main app component with routing
├── index.js                   # React root
└── index.css                  # Global styles

public/
└── index.html                 # HTML template

tailwind.config.js            # Tailwind CSS configuration
postcss.config.js             # PostCSS configuration
```

## 🎨 Features

### Pages

#### Dashboard
- Total devices statistics
- Devices by type (Bar chart)
- OS distribution (Pie chart)
- Quick action buttons
- Responsive grid layout

#### Inventory Management
- List all inventory with pagination
- Search functionality (name, model, serial number)
- Filter by device type
- View, edit, delete operations
- Responsive data table
- Loading states

#### Import CSV
- File upload with drag-and-drop support
- CSV format guide
- Import results with statistics
- Duplicate detection
- Success/failure tracking

#### Authentication
- Registration page with validation
- Login page
- JWT token management
- Protected routes
- User context persistence

### Components

#### Navbar
- Navigation links (Dashboard, Inventory, Import)
- User dropdown with logout
- Responsive mobile menu
- Sticky navigation

#### InventoryTable
- Sortable columns
- Color-coded device types
- Action buttons (view, edit, delete)
- Formatted dates
- Responsive table

#### InventoryForm
- Add new inventory
- Edit existing inventory
- Form validation
- Device type dropdown
- Textarea for remarks
- Loading states

#### Modal
- Reusable modal component
- Configurable size (sm, md, lg, xl, 2xl)
- Close button
- Scrollable content

#### Pagination
- Previous/Next buttons
- Page number buttons
- Intelligent page range display
- Disabled states

#### Toast
- Multiple notification types (success, error, warning, info)
- Auto-dismiss with duration
- Icon support
- Fixed position

## 🔌 API Integration

### API Client (services/api.js)

```javascript
import { inventoryService, authService } from './services/api';

// Inventory API
inventoryService.getInventory(page, limit, search, deviceType)
inventoryService.getInventoryById(id)
inventoryService.createInventory(data)
inventoryService.updateInventory(id, data)
inventoryService.deleteInventory(id)
inventoryService.importCSV(file)
inventoryService.getDashboardStats()
inventoryService.exportCSV()

// Auth API
authService.register(email, username, password)
authService.login(email, password)
authService.getCurrentUser()
authService.refreshToken()
authService.logout()
```

### API Interceptors

- Automatically adds JWT token to requests
- Handles errors globally
- Supports multipart/form-data for file uploads

## 🎯 Styling

### Technologies
- **Tailwind CSS** - Utility-first CSS framework
- **Material UI** - Component library (optional)
- **React Icons** - Icon library

### Color Scheme
- Primary: `#1e40af` (Blue)
- Secondary: `#64748b` (Gray)
- Success: `#10b981` (Green)
- Danger: `#ef4444` (Red)
- Warning: `#f59e0b` (Amber)

### Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl, 2xl
- Flexible grid layouts
- Mobile navigation menu

## 🔐 Authentication

### Flow
1. User registers/logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token included in API requests via interceptor
5. Token automatically refreshed on demand
6. Logout clears token and context

### Protected Routes
```javascript
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

Only authenticated users can access protected pages. Redirects to login if not authenticated.

## 📦 Dependencies

### Production
- `react@^18.2.0` - UI library
- `react-router-dom@^6.18.0` - Routing
- `axios@^1.6.0` - HTTP client
- `tailwindcss@^3.3.0` - CSS framework
- `recharts@^2.10.0` - Charts
- `@mui/material@^5.14.0` - UI components
- `react-icons@^4.12.0` - Icons
- `react-hot-toast@^2.4.1` - Notifications

### Development
- `react-scripts@5.0.1` - Build scripts
- `tailwindcss@^3.3.0` - Tailwind dev
- `postcss@^8.4.31` - CSS processing

## 🛠️ Available Scripts

```bash
npm start           # Start development server
npm run build       # Build for production
npm test            # Run tests
npm run eject       # Eject from create-react-app (one-way)
```

## 🔍 Environment Variables

```env
# Backend API URL (default: http://localhost:5000/api)
REACT_APP_API_URL=http://localhost:5000/api
```

## 🎨 Component Usage Examples

### Using AuthContext
```javascript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, token, login, logout, isAuthenticated } = useAuth();
  
  return (
    <>
      {isAuthenticated && <p>Welcome {user.username}</p>}
    </>
  );
}
```

### Using ToastContext
```javascript
import { useToast } from '../context/ToastContext';

function MyComponent() {
  const { success, error, warning, info } = useToast();
  
  const handleAction = async () => {
    try {
      // Do something
      success('Action completed!');
    } catch (err) {
      error('Something went wrong!');
    }
  };
  
  return <button onClick={handleAction}>Do Something</button>;
}
```

### Using API Service
```javascript
import { inventoryService } from '../services/api';

function MyComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await inventoryService.getInventory(1, 10);
        setData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);
  
  return <div>{/* render data */}</div>;
}
```

## 🌍 Build & Deployment

### Production Build
```bash
npm run build
# Creates optimized build in build/ folder
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload build/ folder to Netlify
```

### Deploy via Docker
```bash
docker build -t axim-frontend .
docker run -p 3000:3000 axim-frontend
```

## 🚚 Production Checklist

- [ ] Environment variables configured for production
- [ ] API URL points to production backend
- [ ] Build optimizations enabled
- [ ] Analytics/monitoring configured
- [ ] Error boundary added
- [ ] Loading states handled
- [ ] Responsive design tested
- [ ] Browser compatibility checked

## 🐛 Debugging

### Browser DevTools
- React Developer Tools extension
- Redux DevTools (if applicable)
- Network tab for API calls
- Console for errors

### Common Issues

**API requests failing**
- Check REACT_APP_API_URL in .env
- Verify backend is running
- Check CORS configuration
- Look at browser Network tab

**Page not rendering**
- Check console for errors
- Verify route is correct
- Check if data is loading
- Look for missing dependencies

**Styling not applying**
- Rebuild Tailwind CSS: `npm run build`
- Clear browser cache
- Check className spelling
- Verify tailwind.config.js

## 📚 References

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/)
- [Axios Documentation](https://axios-http.com/)

## 📄 License

ISC License

---

**Frontend Setup Complete! 🎉**
