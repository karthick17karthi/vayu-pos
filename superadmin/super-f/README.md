# 🏪 POS Superadmin Dashboard

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Redux](https://img.shields.io/badge/Redux%20Toolkit-1.9.7-purple?style=for-the-badge&logo=redux)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.6-06B6D4?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?style=for-the-badge&logo=vite)

**A modern, responsive, and feature-rich Point of Sale (POS) Superadmin Dashboard**

[Features](#-features) • [Getting Started](#-getting-started) • [Usage](#-usage) • [Documentation](#-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Pages Overview](#-pages-overview)
- [Components](#-components)
- [State Management](#-state-management)
- [Styling & Theme](#-styling--theme)
- [Available Scripts](#-available-scripts)
- [Configuration](#-configuration)
- [Development Guidelines](#-development-guidelines)
- [API Integration](#-api-integration)
- [Troubleshooting](#-troubleshooting)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

The **POS Superadmin Dashboard** is a comprehensive management system designed for Point of Sale operations. Built with modern web technologies, it provides superadmins with powerful tools to manage users, track payments, create promotional offers, and generate detailed reports. The application features a clean, intuitive interface with real-time updates and seamless navigation.

### Key Highlights

- 🎨 **Modern UI/UX**: Clean, professional design with responsive layouts
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and builds
- 🔄 **State Management**: Redux Toolkit for predictable state updates
- 📱 **Mobile Friendly**: Fully responsive design that works on all devices
- 🎭 **Icon Library**: Lucide React icons for consistent visual language
- 🎯 **Type Safety Ready**: Configured for TypeScript integration
- 🔐 **Role-Based UI**: Designed with admin-level access controls in mind

---

## ✨ Features

### 📊 Dashboard
- **Real-time Statistics**: Track total revenue, orders, customers, and average order value
- **Recent Orders Table**: Monitor latest transactions with status indicators
- **Quick Stats Cards**: Today's revenue, active offers, and total users at a glance
- **Performance Metrics**: Visual representation of business growth with percentage changes
- **Responsive Grid Layout**: Adapts seamlessly to different screen sizes

### 👥 User Access Management
- **User CRUD Operations**: Add, view, update, and remove users
- **Role Assignment**: Assign roles (Admin, Manager, Cashier, Support)
- **User Status Tracking**: Monitor active/inactive user status
- **Search & Filter**: Quickly find specific users
- **Join Date Tracking**: Track when users were added to the system
- **Interactive Forms**: Smooth form handling with validation

### 💳 Payment Management
- **Transaction Tracking**: Complete overview of all payment transactions
- **Payment Method Analytics**: Visual breakdown of payment methods (Credit Card, Debit Card, Cash, Digital Wallet)
- **Success Rate Monitoring**: Track transaction success rates
- **Transaction Status**: View completed, pending, and failed transactions
- **Payment Statistics**: Total transactions, success rate, and failed transaction counts
- **Date-based Filtering**: Track transactions by date

### 🎁 Offers Management
- **Create Offers**: Add new promotional offers with discount details
- **Offer Tracking**: Monitor offer usage and validity periods
- **Active/Inactive Status**: Toggle offer availability
- **Delete Offers**: Remove expired or unwanted offers
- **Validity Management**: Set expiration dates for offers
- **Usage Statistics**: Track how many times each offer has been used

### 📈 Reports Management
- **Sales Analytics**: Comprehensive sales reports for the last 7 days
- **Inventory Status**: Track stock levels across categories
- **Category Performance**: Visual representation of top-performing categories
- **Customer Insights**: Analyze customer behavior and preferences
- **Total Sales Calculation**: Automatic aggregation of sales data
- **Average Daily Orders**: Calculate and display order trends
- **Stock Alerts**: Low stock and out-of-stock indicators

### 🎨 UI/UX Features
- **Responsive Sidebar**: Collapsible navigation with mobile overlay
- **Context-aware Navbar**: Search functionality and user profile dropdown
- **Consistent Components**: Reusable StatCard and Table components
- **Status Indicators**: Color-coded badges for different statuses
- **Pagination**: Built-in pagination for large data sets
- **Hover Effects**: Interactive elements with smooth transitions
- **Loading States**: Prepared for async data loading
- **Empty States**: Graceful handling of empty data scenarios

---

## 🛠 Tech Stack

### Frontend Framework
- **React 18.2.0**: Modern React with Hooks and functional components
- **React Router DOM 6.20.1**: Client-side routing with nested routes

### State Management
- **Redux Toolkit 1.9.7**: Simplified Redux with createSlice API
- **React-Redux 8.1.3**: Official React bindings for Redux

### Build Tool & Dev Server
- **Vite 7.3.1**: Next-generation frontend tooling
- **@vitejs/plugin-react 4.0.0**: Fast Refresh and JSX support

### Styling
- **Tailwind CSS 3.3.6**: Utility-first CSS framework
- **PostCSS 8.4.32**: CSS transformations
- **Autoprefixer 10.4.16**: Automatic vendor prefixing

### Icons & UI
- **Lucide React 0.263.1**: Beautiful, consistent icon library

### Development Tools
- **@types/react 18.2.43**: TypeScript definitions for React
- **@types/react-dom 18.2.17**: TypeScript definitions for React DOM

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 16.x or higher ([Download](https://nodejs.org/))
- **npm**: Version 8.x or higher (comes with Node.js)
  
  ```bash
  # Check your versions
  node --version
  npm --version
  ```

- **Git**: For version control ([Download](https://git-scm.com/))
- **Code Editor**: VS Code recommended ([Download](https://code.visualstudio.com/))

### Recommended VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- ESLint
- Prettier - Code formatter
- Auto Rename Tag

---

## 🚀 Getting Started

### Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd superadmin/super-f
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

   This will install all required packages defined in `package.json`.

3. **Verify installation**:
   ```bash
   npm list --depth=0
   ```

### Running the Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will start at:
- **Local**: `http://localhost:5173`
- **Network**: `http://<your-ip>:5173`

The development server features:
- ⚡ Lightning-fast Hot Module Replacement (HMR)
- 🔄 Automatic browser refresh on file changes
- 📝 JSX and ES6+ support out of the box
- 🎨 Tailwind CSS JIT compilation

### Building for Production

Create an optimized production build:

```bash
npm run build
```

This command:
- Bundles and minifies your code
- Optimizes assets and images
- Generates source maps
- Creates a `dist/` folder with production-ready files

### Preview Production Build

Test the production build locally:

```bash
npm run preview
```

The preview server will start at `http://localhost:4173`.

---

## 📁 Project Structure

```
superadmin/super-f/
│
├── public/                      # Static assets
│
├── src/                         # Source files
│   ├── components/              # Reusable UI components
│   │   ├── Navbar.jsx          # Top navigation bar with search and profile
│   │   ├── Sidebar.jsx         # Side navigation menu
│   │   ├── StatCard.jsx        # Statistics display card
│   │   └── Table.jsx           # Reusable data table with pagination
│   │
│   ├── pages/                   # Page components (route targets)
│   │   ├── DashboardPage.jsx   # Main dashboard with stats and orders
│   │   ├── UserAccessPage.jsx  # User management interface
│   │   ├── PaymentPage.jsx     # Payment tracking and analytics
│   │   ├── OfferPage.jsx       # Promotional offers management
│   │   └── ReportsPage.jsx     # Sales and inventory reports
│   │
│   ├── store/                   # Redux state management
│   │   ├── store.js            # Main store configuration
│   │   ├── dashboardSlice.js   # Dashboard state slice
│   │   ├── userAccessSlice.js  # User management state slice
│   │   ├── paymentSlice.js     # Payment data state slice
│   │   ├── offerSlice.js       # Offers state slice
│   │   └── reportSlice.js      # Reports state slice
│   │
│   ├── App.jsx                  # Root component with routing
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Global styles and Tailwind imports
│
├── index.html                   # HTML entry point
├── package.json                 # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
└── README.md                    # This file

```

### File Descriptions

#### Root Files
- **`index.html`**: Base HTML template with root div
- **`package.json`**: Project metadata, dependencies, and npm scripts
- **`vite.config.js`**: Vite build tool configuration
- **`tailwind.config.js`**: Tailwind CSS customization
- **`postcss.config.js`**: PostCSS plugins configuration

#### Source Files
- **`main.jsx`**: React application entry point, renders App component
- **`App.jsx`**: Main application wrapper with Router, Redux Provider, and routes
- **`index.css`**: Global styles, Tailwind directives, and custom CSS

---

## 📄 Pages Overview

### 1. Dashboard Page (`DashboardPage.jsx`)

**Route**: `/`

**Purpose**: Main landing page providing an overview of key business metrics.

**Features**:
- Four primary statistics cards (Revenue, Orders, Customers, Avg Order Value)
- Recent orders table with transaction details
- Three quick stat cards (Today's Revenue, Active Offers, Total Users)
- Responsive grid layout

**State Used**:
```javascript
const { stats, recentOrders } = useSelector((state) => state.dashboard);
```

**Key Components**:
- `<StatCard />`: Displays individual statistics
- `<Table />`: Shows recent orders in tabular format

---

### 2. User Access Page (`UserAccessPage.jsx`)

**Route**: `/user-access`

**Purpose**: Manage system users, their roles, and access permissions.

**Features**:
- Add new users with name, email, and role
- View all users in a table format
- User roles: Admin, Manager, Cashier, Support
- Status tracking (Active/Inactive)
- Join date tracking
- Toggle form visibility

**State Used**:
```javascript
const { users } = useSelector((state) => state.userAccess);
const dispatch = useDispatch();
```

**Actions Available**:
- `addUser`: Add a new user
- `removeUser`: Delete a user
- `updateUser`: Modify user details

**Form Fields**:
- Full Name (text input)
- Email Address (email input)
- Role (dropdown select)

---

### 3. Payment Page (`PaymentPage.jsx`)

**Route**: `/payment`

**Purpose**: Track and analyze payment transactions and methods.

**Features**:
- Transaction statistics (Total, Success Rate, Failed)
- Recent transactions table
- Payment method breakdown
  - Credit Card (45%)
  - Debit Card (25%)
  - Cash (20%)
  - Digital Wallet (10%)
- Transaction status monitoring

**State Used**:
```javascript
const { transactions, totalTransactions, successRate } = useSelector(
  (state) => state.payment
);
```

**Transaction Fields**:
- Transaction ID
- Payment Method
- Amount
- Date
- Status

---

### 4. Offer Page (`OfferPage.jsx`)

**Route**: `/offers`

**Purpose**: Create and manage promotional offers and discounts.

**Features**:
- Create new offers with title, discount, and validity
- View all offers in a custom table
- Delete offers functionality
- Status management (Active/Expired)
- Usage tracking
- Validity period management

**State Used**:
```javascript
const { offers } = useSelector((state) => state.offer);
const dispatch = useDispatch();
```

**Actions Available**:
- `createOffer`: Add a new promotional offer
- `updateOffer`: Modify existing offer
- `deleteOffer`: Remove an offer

**Form Fields**:
- Offer Title (text)
- Discount (text, e.g., "20%", "BOGO")
- Validity (date picker)

---

### 5. Reports Page (`ReportsPage.jsx`)

**Route**: `/reports`

**Purpose**: Generate and view comprehensive analytics and insights.

**Features**:
- Sales report for last 7 days
- Inventory status across categories
- Total sales calculation
- Average daily orders
- Top categories visualization with progress bars
- Customer insights section
- Stock level indicators (In Stock, Low Stock, Out of Stock)

**State Used**:
```javascript
const { salesReport, inventoryStatus } = useSelector((state) => state.report);
```

**Report Metrics**:
- Total Sales (7 Days)
- Total Orders (7 Days)
- Average Daily Orders
- Category-wise inventory

**Data Calculations**:
```javascript
const totalSales = salesReport.reduce((sum, item) => {
  const value = parseFloat(item.sales.replace('$', '').replace(',', ''));
  return sum + value;
}, 0);
```

---

## 🧩 Components

### Navbar Component (`Navbar.jsx`)

**Purpose**: Top navigation bar with branding, search, and user profile.

**Props**:
```javascript
{
  sidebarOpen: boolean,      // Current sidebar state
  setSidebarOpen: function   // Function to toggle sidebar
}
```

**Features**:
- Logo and title section
- Search bar (hidden on small screens)
- Role badge (Admin/Manager/etc.)
- User profile dropdown with logout option
- Responsive design with mobile adaptations

**State**:
```javascript
const [isProfileOpen, setIsProfileOpen] = useState(false);
```

---

### Sidebar Component (`Sidebar.jsx`)

**Purpose**: Side navigation menu for page routing.

**Props**:
```javascript
{
  sidebarOpen: boolean,      // Visibility state
  setSidebarOpen: function   // Toggle function
}
```

**Menu Items**:
```javascript
const menuItems = [
  { path: '/', label: 'Dashboard' },
  { path: '/user-access', label: 'User & Access' },
  { path: '/payment', label: 'Payment Management' },
  { path: '/offers', label: 'Offer Management' },
  { path: '/reports', label: 'Reports Management' },
];
```

**Features**:
- Collapsible on mobile with overlay
- Active link highlighting
- User info display on mobile
- Logout button
- Smooth transitions

---

### StatCard Component (`StatCard.jsx`)

**Purpose**: Display statistical metrics with visual indicators.

**Props**:
```javascript
{
  label: string,    // Stat label (e.g., "Total Revenue")
  value: string,    // Stat value (e.g., "$24,560")
  change: string,   // Percentage change (e.g., "+12.5%")
  color: string     // Tailwind color class (e.g., "bg-blue-500")
}
```

**Features**:
- Icon display with custom color
- Trending indicator (up/down arrow)
- Percentage change visualization
- Hover effect with shadow
- Responsive text sizing

**Example Usage**:
```jsx
<StatCard
  label="Total Revenue"
  value="$24,560"
  change="+12.5%"
  color="bg-blue-500"
/>
```

---

### Table Component (`Table.jsx`)

**Purpose**: Reusable data table with pagination and status badges.

**Props**:
```javascript
{
  title: string,        // Table heading
  columns: array,       // Column headers
  data: array          // Array of row objects
}
```

**Features**:
- Automatic pagination (5 items per page)
- Status badge color coding
- Responsive design with horizontal scroll
- Navigation controls (Previous/Next)
- Empty state handling

**Status Colors**:
- ✅ Active/Success/Completed: Green
- ⏳ Pending/Processing: Yellow
- ❌ Inactive/Failed/Expired: Red
- 📅 Scheduled: Blue
- ⚪ Default: Gray

**Example Usage**:
```jsx
<Table
  title="Recent Orders"
  columns={['Order No', 'Customer', 'Amount', 'Status', 'Date']}
  data={orders.map(order => ({
    'Order No': order.orderNo,
    Customer: order.customer,
    Amount: order.amount,
    Status: order.status,
    Date: order.date,
  }))}
/>
```

---

## 🔄 State Management

### Redux Store Architecture

The application uses **Redux Toolkit** for state management, with a centralized store and modular slices.

#### Store Configuration (`store/store.js`)

```javascript
export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice.reducer,
    userAccess: userAccessSlice.reducer,
    payment: paymentSlice.reducer,
    offer: offerSlice.reducer,
    report: reportSlice.reducer,
  },
});
```

---

### State Slices

#### 1. Dashboard Slice (`dashboardSlice.js`)

**Initial State**:
```javascript
{
  stats: [
    { id: 1, label: 'Total Revenue', value: '$24,560', change: '+12.5%', color: 'bg-blue-500' },
    { id: 2, label: 'Total Orders', value: '1,234', change: '+8.2%', color: 'bg-green-500' },
    { id: 3, label: 'Total Customers', value: '856', change: '+5.1%', color: 'bg-purple-500' },
    { id: 4, label: 'Avg Order Value', value: '$125.30', change: '+3.5%', color: 'bg-orange-500' },
  ],
  recentOrders: [ /* array of recent orders */ ]
}
```

**Actions**:
- `updateStats(payload)`: Update statistics data
- `updateRecentOrders(payload)`: Update recent orders list

---

#### 2. User Access Slice (`userAccessSlice.js`)

**Initial State**:
```javascript
{
  users: [
    { id, name, email, role, status, joinDate },
    // ... more users
  ]
}
```

**Actions**:
- `addUser(payload)`: Add a new user
- `removeUser(userId)`: Delete a user by ID
- `updateUser({ id, updates })`: Update user details

---

#### 3. Payment Slice (`paymentSlice.js`)

**Initial State**:
```javascript
{
  transactions: [ /* array of transactions */ ],
  totalTransactions: number,
  successRate: string
}
```

**Actions**:
- `addTransaction(payload)`: Add a new transaction
- `updateTransactionStatus({ id, status })`: Update transaction status

---

#### 4. Offer Slice (`offerSlice.js`)

**Initial State**:
```javascript
{
  offers: [
    { id, title, discount, validity, status, uses },
    // ... more offers
  ]
}
```

**Actions**:
- `createOffer(payload)`: Create a new offer
- `updateOffer({ id, updates })`: Update offer details
- `deleteOffer(offerId)`: Remove an offer

---

#### 5. Report Slice (`reportSlice.js`)

**Initial State**:
```javascript
{
  salesReport: [
    { date, sales, orders, customers },
    // ... more reports
  ],
  inventoryStatus: [
    { category, inStock, lowStock, outOfStock },
    // ... more categories
  ]
}
```

**Actions**:
- `updateSalesReport(payload)`: Update sales data
- `updateInventoryStatus(payload)`: Update inventory levels

---

### Using Redux in Components

**Import hooks and actions**:
```javascript
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser } from '../store/store';
```

**Access state**:
```javascript
const { users } = useSelector((state) => state.userAccess);
```

**Dispatch actions**:
```javascript
const dispatch = useDispatch();
dispatch(addUser({ name: 'John', email: 'john@example.com', role: 'Admin' }));
```

---

## 🎨 Styling & Theme

### Tailwind CSS Configuration

**File**: `tailwind.config.js`

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',      // Blue
        secondary: '#1F2937',    // Dark gray
      },
    },
  },
  plugins: [],
}
```

### Color Scheme

**Primary Colors**:
- 🔵 Blue (`#3B82F6`): Primary actions, links
- 🟢 Green (`#10B981`): Success states, positive metrics
- 🟣 Purple (`#8B5CF6`): Special highlights
- 🟠 Orange (`#F59E0B`): Warnings, attention
- 🔴 Red (`#EF4444`): Errors, negative metrics

**Neutral Colors**:
- ⚫ Gray shades: Text, borders, backgrounds
- ⚪ White: Cards, containers, backgrounds

### Custom Styles

**File**: `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom global styles */
body {
  @apply bg-gray-100 font-sans antialiased;
}

/* Add custom utility classes here */
```

### Responsive Breakpoints

```javascript
// Tailwind default breakpoints
sm: '640px'   // Small devices
md: '768px'   // Medium devices
lg: '1024px'  // Large devices
xl: '1280px'  // Extra large devices
2xl: '1536px' // 2X Extra large devices
```

---

## 📜 Available Scripts

### Development

```bash
# Start development server with HMR
npm run dev

# Development server runs on http://localhost:5173
```

### Production

```bash
# Build optimized production bundle
npm run build

# Output directory: dist/
```

### Preview

```bash
# Preview production build locally
npm run preview

# Preview server runs on http://localhost:4173
```

### Additional Useful Commands

```bash
# Install new package
npm install <package-name>

# Install dev dependency
npm install -D <package-name>

# Update packages
npm update

# Check for outdated packages
npm outdated

# Clear npm cache
npm cache clean --force
```

---

## ⚙️ Configuration

### Vite Configuration (`vite.config.js`)

```javascript
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,    // Development server port
  },
})
```

**Customization Options**:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,              // Change port
    open: true,              // Auto-open browser
    host: true,              // Expose to network
  },
  build: {
    outDir: 'dist',          // Output directory
    sourcemap: true,         // Generate source maps
  },
  resolve: {
    alias: {
      '@': '/src',           // Path alias
    },
  },
})
```

### PostCSS Configuration (`postcss.config.js`)

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## 💻 Development Guidelines

### Code Style

1. **Use Functional Components**: Prefer functional components with hooks
2. **Component Structure**:
   ```jsx
   // Imports
   import { useState } from 'react';
   
   // Component
   export default function ComponentName({ props }) {
     // Hooks
     const [state, setState] = useState();
     
     // Functions
     const handleAction = () => {};
     
     // Return JSX
     return (...);
   }
   ```

3. **Naming Conventions**:
   - Components: PascalCase (`DashboardPage.jsx`)
   - Functions: camelCase (`handleSubmit`)
   - Constants: UPPER_CASE (`API_URL`)
   - Files: Match component name

4. **File Organization**:
   - One component per file
   - Related files in same directory
   - Index files for exports

### Best Practices

1. **State Management**:
   - Use local state for UI-only data
   - Use Redux for shared application state
   - Keep state minimal and normalized

2. **Component Design**:
   - Make components reusable
   - Use props for customization
   - Implement proper prop validation

3. **Performance**:
   - Avoid unnecessary re-renders
   - Use React.memo for expensive components
   - Implement code splitting for routes

4. **Accessibility**:
   - Use semantic HTML
   - Add ARIA labels where needed
   - Ensure keyboard navigation

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature

# Create pull request
```

**Commit Message Convention**:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance

---

## 🔌 API Integration

### Setting Up API Calls

The application currently uses mock data in Redux slices. To integrate with a backend API:

1. **Install Axios**:
   ```bash
   npm install axios
   ```

2. **Create API Service** (`src/services/api.js`):
   ```javascript
   import axios from 'axios';
   
   const API_BASE_URL = 'https://api.yourbackend.com';
   
   const api = axios.create({
     baseURL: API_BASE_URL,
     headers: {
       'Content-Type': 'application/json',
     },
   });
   
   // Add token to requests
   api.interceptors.request.use((config) => {
     const token = localStorage.getItem('token');
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });
   
   export default api;
   ```

3. **Create Async Thunks**:
   ```javascript
   import { createAsyncThunk } from '@reduxjs/toolkit';
   import api from '../services/api';
   
   export const fetchUsers = createAsyncThunk(
     'userAccess/fetchUsers',
     async () => {
       const response = await api.get('/users');
       return response.data;
     }
   );
   ```

4. **Handle in Slice**:
   ```javascript
   extraReducers: (builder) => {
     builder
       .addCase(fetchUsers.pending, (state) => {
         state.loading = true;
       })
       .addCase(fetchUsers.fulfilled, (state, action) => {
         state.loading = false;
         state.users = action.payload;
       })
       .addCase(fetchUsers.rejected, (state, action) => {
         state.loading = false;
         state.error = action.error.message;
       });
   }
   ```

### API Endpoints Structure

```javascript
// Users
GET    /api/users          // Get all users
POST   /api/users          // Create user
PUT    /api/users/:id      // Update user
DELETE /api/users/:id      // Delete user

// Payments
GET    /api/transactions   // Get all transactions
GET    /api/transactions/:id // Get single transaction

// Offers
GET    /api/offers         // Get all offers
POST   /api/offers         // Create offer
PUT    /api/offers/:id     // Update offer
DELETE /api/offers/:id     // Delete offer

// Reports
GET    /api/reports/sales  // Get sales report
GET    /api/reports/inventory // Get inventory status

// Dashboard
GET    /api/dashboard/stats // Get dashboard statistics
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error**: `Port 5173 is already in use`

**Solution**:
```bash
# Kill process on port 5173 (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or change port in vite.config.js
```

#### 2. Module Not Found

**Error**: `Cannot find module 'xyz'`

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 3. Tailwind Styles Not Working

**Error**: Styles not applying

**Solution**:
- Check `tailwind.config.js` content paths
- Ensure `@tailwind` directives in `index.css`
- Restart dev server

#### 4. Redux State Not Updating

**Error**: State not changing

**Solution**:
- Check if reducer is added to store
- Verify action is being dispatched
- Use Redux DevTools for debugging

#### 5. Build Fails

**Error**: Build command fails

**Solution**:
```bash
# Clear cache and rebuild
npm run build -- --force
```

### Debug Tools

1. **React Developer Tools**: Browser extension for React debugging
2. **Redux DevTools**: Browser extension for Redux state inspection
3. **Vite Debug**: Run with `--debug` flag
   ```bash
   npm run dev -- --debug
   ```

---

## 🚀 Future Enhancements

### Planned Features

- [ ] **Authentication System**
  - Login/Logout functionality
  - JWT token management
  - Role-based access control
  - Password reset flow

- [ ] **Real-time Updates**
  - WebSocket integration
  - Live transaction updates
  - Real-time notifications

- [ ] **Advanced Analytics**
  - Interactive charts (Chart.js/Recharts)
  - Custom date range filtering
  - Export reports to PDF/Excel
  - Data visualization dashboard

- [ ] **User Management**
  - User profile editing
  - Avatar upload
  - Activity logs
  - Permission management

- [ ] **Payment Features**
  - Refund processing
  - Payment method management
  - Transaction details modal
  - Invoice generation

- [ ] **Offer Enhancements**
  - Offer templates
  - Bulk offer creation
  - Customer targeting
  - A/B testing

- [ ] **Mobile App**
  - React Native version
  - Push notifications
  - Offline support

- [ ] **Testing**
  - Unit tests (Jest + React Testing Library)
  - Integration tests
  - E2E tests (Cypress/Playwright)

- [ ] **Performance**
  - Code splitting
  - Lazy loading
  - PWA support
  - Service workers

- [ ] **Internationalization**
  - Multi-language support (i18n)
  - RTL support
  - Currency formatting

- [ ] **Dark Mode**
  - Theme toggle
  - Persistent theme preference
  - Custom theme builder

---

## 🤝 Contributing

### How to Contribute

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make Your Changes**
4. **Commit Your Changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
5. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly
- Ensure no console errors or warnings

### Code Review Process

1. Submit pull request with detailed description
2. Wait for automated checks to pass
3. Address review comments
4. Get approval from maintainers
5. Merge when approved

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 POS Superadmin Dashboard

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Support & Contact

### Need Help?

- 📧 **Email**: support@possuperadmin.com
- 💬 **Discord**: [Join our community](#)
- 📚 **Documentation**: [docs.possuperadmin.com](#)
- 🐛 **Bug Reports**: [GitHub Issues](#)

### Useful Resources

- [React Documentation](https://react.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Lucide Icons](https://lucide.dev/)

---

## 📊 Project Statistics

- **Version**: 0.0.1
- **Last Updated**: February 2026
- **Components**: 9
- **Pages**: 5
- **Redux Slices**: 5
- **Dependencies**: 6
- **Dev Dependencies**: 6

---

<div align="center">

### ⭐ Star this project if you find it useful!

**Made with ❤️ using React, Redux, and Tailwind CSS**

[Back to Top](#-pos-superadmin-dashboard)

</div>
```bash
npm run build
```

4. **Preview production build**:
```bash
npm run preview
```

## Tech Stack

- **React 18**: UI library
- **Vite**: Fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Redux Toolkit**: State management
- **React Router**: Client-side routing
- **Lucide React**: Beautiful icons

## Redux Store

The store contains all Redux slices in one file (`src/store/store.js`):

- **dashboardSlice**: Statistics and recent orders
- **userAccessSlice**: User management
- **paymentSlice**: Transaction tracking
- **offerSlice**: Promotional offers
- **reportSlice**: Sales and inventory reports

## Components

- **Sidebar**: Navigation menu with collapsible functionality
- **Navbar**: Top navigation bar with search and user profile
- **StatCard**: Reusable card component for statistics
- **Table**: Reusable table with pagination and status badges

## Pages

- **DashboardPage**: Main dashboard with overview stats
- **UserAccessPage**: User management with role assignment
- **PaymentPage**: Payment transaction history
- **OfferPage**: Promotional offers management
- **ReportsPage**: Sales and inventory analytics

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
