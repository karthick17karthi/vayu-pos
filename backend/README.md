# 🚀 Vayu POS Demo Request Server

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-14%2B-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.2.1-black?style=for-the-badge&logo=express)
![Nodemailer](https://img.shields.io/badge/Nodemailer-8.0.1-EA4335?style=for-the-badge&logo=gmail)
![CORS](https://img.shields.io/badge/CORS-Enabled-blue?style=for-the-badge)

**A production-ready Node.js Express API for handling POS demo requests with email notifications**

[Quick Start](#-quick-start) • [API Documentation](#-api-documentation) • [Setup Guide](#-setup-guide) • [Troubleshooting](#-troubleshooting)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Configuration](#-configuration)
- [Testing](#-testing)
- [Email Configuration](#-email-configuration)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

---

## 🎯 Overview

The **Vayu POS Demo Request Server** is a robust Node.js Express application designed to handle POS (Point of Sale) demo requests and send professional email notifications. Built with modern technologies, it provides a secure, scalable API endpoint for collecting demo inquiries from potential customers.

### Use Cases

✅ Hotel and restaurant chains requesting POS system demos  
✅ Retail businesses exploring point of sale solutions  
✅ Multi-branch establishments with complex requirements  
✅ Managing sales inquiries with automated notifications  
✅ Professional customer engagement system  

---

## ✨ Features

### 🎨 Core Features

- ✅ **Express.js API**: Fast, lightweight HTTP server
- ✅ **Email Notifications**: Gmail SMTP integration via Nodemailer
- ✅ **CORS Enabled**: Cross-Origin Resource Sharing support
- ✅ **JSON Handling**: Automatic JSON parsing and responses
- ✅ **Input Validation**: Comprehensive field validation
- ✅ **Error Handling**: Graceful error management
- ✅ **Environment Variables**: Secure credential management
- ✅ **HTML Email Templates**: Professional, formatted email bodies
- ✅ **Async/Await**: Modern JavaScript patterns
- ✅ **Production Ready**: Monitoring and logging built-in

### 📧 Email Features

- Professional HTML email templates
- Color-coded sections for easy reading
- Detailed business and contact information
- Customer message formatting
- Clickable phone and email links
- Plain text fallback for compatibility
- Automatic timestamp in IST timezone
- Reply-To customer email configuration

### 🛡️ Security Features

- Environment variable protection for credentials
- Email format validation
- Required field validation
- HTTPS ready
- Error information obfuscation
- No credentials in logs

---

## 📦 Prerequisites

### System Requirements

- **Node.js**: Version 14.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: Version 6.0.0 or higher (comes with Node.js)
- **Gmail Account**: For sending emails

### Check Your Versions

```bash
node --version    # v14.0.0 or higher
npm --version     # 6.0.0 or higher
```

### Gmail Setup

1. Gmail account with 2-Factor Authentication enabled
2. Gmail App Password (16-character password)
   - Get it from: https://myaccount.google.com/apppasswords

---

## 📥 Installation

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- **express** (5.2.1): Web framework
- **nodemailer** (8.0.1): Email service
- **cors** (2.8.6): Cross-origin support
- **dotenv** (17.3.1): Environment configuration

### 3. Configure Environment Variables

Copy the example file:

```bash
cp .env.example .env
```

Edit `.env` with your Gmail credentials:

```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_char_app_password
PORT=5000
```

---

## 🚀 Quick Start

### Start Development Server

```bash
npm start
# OR
npm run dev
# OR
node server.js
```

### Expected Output

```
========================================
🚀 VAYU POS DEMO REQUEST SERVER
========================================
✅ Server running on port: 5000
📍 Local URL: http://localhost:5000
📍 API URL: http://localhost:5000/api/demo-request

📧 Email Configuration:
   From: vip.mvp2025@gmail.com
   To: vip.mvp2025@gmail.com

📚 Available Endpoints:
   GET  / - Health check
   POST /api/demo-request - Submit demo request

💡 Use Ctrl+C to stop the server
========================================
```

### Server is Ready!

- ✅ Health check: `http://localhost:5000`
- ✅ API endpoint: `http://localhost:5000/api/demo-request`

---

## 📁 Project Structure

```
backend/
├── server.js                # Main server file with all API endpoints
├── package.json            # Project metadata and dependencies
├── .env                    # Environment variables (gitignored)
├── .env.example           # Template for environment variables
├── .gitignore             # Git ignore rules
├── SETUP_GUIDE.md         # Detailed setup instructions
├── README.md              # This file
└── node_modules/          # Dependencies (created by npm install)
    ├── express/
    ├── nodemailer/
    ├── cors/
    └── dotenv/
```

### File Descriptions

- **server.js**: Complete server implementation with routes, middleware, and email logic
- **package.json**: Project configuration with npm scripts and dependencies
- **.env**: Local environment variables (not included in git)
- **.env.example**: Template for .env file
- **SETUP_GUIDE.md**: Step-by-step setup and testing guide

---

## 📡 API Documentation

### Base URL

```
http://localhost:5000
```

### Endpoints

#### 1. Health Check

**GET** `/`

Check if the server is running and configured correctly.

**Response (200 OK):**

```json
{
  "status": "success",
  "message": "Vayu POS Demo Request Server is running",
  "version": "1.0.0",
  "endpoints": {
    "demoRequest": "POST /api/demo-request",
    "health": "GET /"
  }
}
```

**cURL Example:**

```bash
curl http://localhost:5000/
```

---

#### 2. Submit Demo Request

**POST** `/api/demo-request`

Submit a POS demo request and receive email confirmation.

**Request Headers:**

```
Content-Type: application/json
```

**Request Body:**

```json
{
  "owner_name": "string (required)",
  "hotel_name": "string (required)",
  "license_number": "string (required)",
  "phone": "string (required)",
  "email": "string (required, valid email format)",
  "city": "string (required)",
  "branches": "number (required)",
  "message": "string (required)"
}
```

**Example Request:**

```bash
curl -X POST http://localhost:5000/api/demo-request \
  -H "Content-Type: application/json" \
  -d '{
    "owner_name": "Rajesh Kumar",
    "hotel_name": "Grand Taj Hotel",
    "license_number": "LIC-2025-001",
    "phone": "+91-9876543210",
    "email": "rajesh@tajhotel.com",
    "city": "Mumbai",
    "branches": 5,
    "message": "Looking for a modern POS system for our hotel chain. Interested in cloud-based solution with inventory management."
  }'
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Demo request submitted successfully. We will contact you soon!",
  "data": {
    "owner_name": "Rajesh Kumar",
    "hotel_name": "Grand Taj Hotel",
    "license_number": "LIC-2025-001",
    "phone": "+91-9876543210",
    "email": "rajesh@tajhotel.com",
    "city": "Mumbai",
    "branches": 5,
    "message": "Looking for a modern POS system...",
    "submitted_at": "2026-02-18T10:30:45.123Z"
  },
  "messageId": "<CADc-_xYz...@gmail.com>"
}
```

**Error Response - Missing Fields (400 Bad Request):**

```json
{
  "success": false,
  "message": "Missing required fields: email, phone",
  "requiredFields": [
    "owner_name",
    "hotel_name",
    "license_number",
    "phone",
    "email",
    "city",
    "branches",
    "message"
  ]
}
```

**Error Response - Invalid Email (400 Bad Request):**

```json
{
  "success": false,
  "message": "Invalid email format"
}
```

**Error Response - Server Error (500 Internal Server Error):**

```json
{
  "success": false,
  "message": "Failed to process demo request. Please try again later.",
  "error": "Error message details"
}
```

---

## ⚙️ Configuration

### Environment Variables

**File**: `.env`

```bash
# Gmail SMTP Configuration
EMAIL_USER=your_gmail@gmail.com           # Gmail address
EMAIL_PASS=xxxx xxxx xxxx xxxx            # 16-character App Password

# Server Configuration
PORT=5000                                  # Server port (default: 5000)
NODE_ENV=development                       # Environment (development/production)
```

### Nodemailer Configuration

The server uses Gmail SMTP with the following settings:

```javascript
{
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
}
```

**Features**:
- TLS encryption enabled automatically
- Connection pooling
- Error recovery
- Automatic retry logic

---

## 🧪 Testing

### Using cURL

**Test 1: Health Check**

```bash
curl http://localhost:5000/
```

**Test 2: Submit Demo Request**

```bash
curl -X POST http://localhost:5000/api/demo-request \
  -H "Content-Type: application/json" \
  -d '{
    "owner_name": "John Doe",
    "hotel_name": "Grand Hotel",
    "license_number": "LIC123456",
    "phone": "+91-9876543210",
    "email": "john@example.com",
    "city": "Mumbai",
    "branches": 3,
    "message": "Interested in POS system"
  }'
```

### Using Postman

1. **Create New Request**
   - Method: POST
   - URL: `http://localhost:5000/api/demo-request`

2. **Set Headers**
   - Key: `Content-Type`
   - Value: `application/json`

3. **Set Body (raw JSON)**
   ```json
   {
     "owner_name": "John Doe",
     "hotel_name": "Grand Hotel",
     "license_number": "LIC123456",
     "phone": "+91-9876543210",
     "email": "john@example.com",
     "city": "Mumbai",
     "branches": 3,
     "message": "Interested in POS system"
   }
   ```

4. **Click Send**

### Using JavaScript/Fetch

```javascript
const submitDemoRequest = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/demo-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        owner_name: 'John Doe',
        hotel_name: 'Grand Hotel',
        license_number: 'LIC123456',
        phone: '+91-9876543210',
        email: 'john@example.com',
        city: 'Mumbai',
        branches: 3,
        message: 'Interested in POS system',
      }),
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Demo request submitted successfully!');
      console.log(data);
    } else {
      console.error('❌ Error:', data.message);
    }
  } catch (error) {
    console.error('❌ Network error:', error);
  }
};

submitDemoRequest();
```

### Using Axios

```javascript
const axios = require('axios');

const submitDemoRequest = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/demo-request', {
      owner_name: 'John Doe',
      hotel_name: 'Grand Hotel',
      license_number: 'LIC123456',
      phone: '+91-9876543210',
      email: 'john@example.com',
      city: 'Mumbai',
      branches: 3,
      message: 'Interested in POS system',
    });

    console.log('✅ Success:', response.data);
  } catch (error) {
    console.error('❌ Error:', error.response.data);
  }
};

submitDemoRequest();
```

---

## 📧 Email Configuration

### Gmail App Password Setup

**Step 1: Enable 2-Factor Authentication**

1. Go to [Google Account](https://myaccount.google.com/)
2. Click **Security** on the left
3. Find "How you sign in to Google"
4. Enable **2-Step Verification**

**Step 2: Generate App Password**

1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select **Mail** as the app
3. Select your device type
4. Click **Generate**
5. Copy the 16-character password

**Step 3: Update .env**

```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Email Template

The server sends beautifully formatted HTML emails with:

- **Header**: Branding with timestamp
- **Business Section**: Company and owner details
- **Contact Section**: Phone, email, city
- **Message Section**: Customer's inquiry
- **Footer**: Timestamp in IST, automated notification message

### Email Details

- **From**: Your configured Gmail (EMAIL_USER)
- **To**: vip.mvp2025@gmail.com
- **Reply-To**: Customer's email (for direct response)
- **Subject**: "New Vayu POS Demo Request"
- **Format**: HTML with plain text fallback

---

## 🚢 Deployment

### Deploy to Heroku

1. **Create Heroku Account**
   - Visit [heroku.com](https://heroku.com)
   - Sign up for free

2. **Install Heroku CLI**
   ```bash
   # Windows
   choco install heroku-cli
   
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Linux
   curl https://cli-assets.heroku.com/install.sh | sh
   ```

3. **Login to Heroku**
   ```bash
   heroku login
   ```

4. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set EMAIL_USER=your_email@gmail.com
   heroku config:set EMAIL_PASS=your_app_password
   heroku config:set PORT=5000
   ```

6. **Deploy**
   ```bash
   git push heroku main
   ```

7. **View Logs**
   ```bash
   heroku logs --tail
   ```

### Deploy to Other Platforms

#### Vercel (with Serverless Functions)

```bash
npm install -g vercel
vercel
```

#### AWS Lambda

Use AWS CLI or AWS Console with Node.js runtime.

#### DigitalOcean App Platform

1. Connect GitHub repository
2. Set environment variables
3. Deploy

#### Railway

```bash
npm install -g railway
railway login
railway up
```

### Environment Setup for Production

```bash
# Production environment
NODE_ENV=production
PORT=5000

# Gmail credentials (use app password)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=app_password_here
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Cannot Find Module 'express'

**Error**: `Error: Cannot find module 'express'`

**Solution**:
```bash
# Install dependencies
npm install
```

#### 2. Gmail Authentication Error

**Error**: `Invalid login: [Gmail] Please log in via your web browser`

**Solution**:
- Use **Gmail App Password** (not regular password)
- Enable 2-Factor Authentication on Gmail account
- Get App Password from https://myaccount.google.com/apppasswords

#### 3. Port Already in Use

**Error**: `Error: listen EADDRINUSE :::5000`

**Solution**:

```bash
# Find and kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

Or use a different port:

```bash
PORT=5001 npm start
```

#### 4. CORS Error

**Error**: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution**:
- CORS is enabled by default in server.js
- If still having issues, check request headers
- Make sure frontend is sending requests to correct URL

#### 5. Email Not Sending

**Error**: Email fails silently

**Solution**:
- Check console logs for detailed error messages
- Verify EMAIL_USER and EMAIL_PASS in .env
- Ensure Gmail security settings allow app access
- Check firewall/network blocking port 587

#### 6. Validation Errors

**Error**: `Missing required fields`

**Solution**:
- Verify all required fields are included in request
- Check field names match exactly:
  - `owner_name` (not `ownerName`)
  - `hotel_name` (not `hotelName`)
  - `license_number` (not `licenseNumber`)
  - etc.

#### 7. .env file not loading

**Error**: `EMAIL_USER is undefined`

**Solution**:
- Ensure .env file exists in backend root directory
- Check that `require('dotenv').config()` is at top of server.js
- Restart server after editing .env
- Verify file is not .env.txt (should be .env without extension)

---

### Debug Mode

Enable detailed logging:

```javascript
// Add to server.js before routes
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
```

### Check Email Transporter

Test email configuration:

```javascript
// Add to server.js
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email Error:', error);
  } else {
    console.log('✅ Email Ready:', success);
  }
});
```

---

## 📊 Server Logs

### Successful Request Log

```
✅ Email sent successfully
   Message ID: <CADc-_xyz...@gmail.com>
   To: vip.mvp2025@gmail.com
   From: customer@example.com
```

### Error Log

```
❌ Error processing demo request:
   Error: Invalid login
   Stack: Error: Invalid login...
```

### Server Startup Log

```
✅ Server running on port: 5000
📍 Local URL: http://localhost:5000
📧 Email transporter ready
```

---

## 📝 Sample Data

### Valid Request

```json
{
  "owner_name": "Rajesh Kumar Sharma",
  "hotel_name": "The Grand Taj Palace Hotel",
  "license_number": "LIC-2025-MGR-001",
  "phone": "+91-98765-43210",
  "email": "manager@grandtaj.com",
  "city": "Mumbai",
  "branches": 5,
  "message": "We are interested in implementing a modern POS system across all our branches. We currently have 5 properties in different cities. Looking for cloud-based solution with inventory management and real-time reporting."
}
```

### Invalid Request

```json
{
  "owner_name": "John",
  "hotel_name": "Hotel ABC"
  // Missing: license_number, phone, email, city, branches, message
}
```

---

## 🔒 Security Considerations

- ✅ No credentials in source code
- ✅ Environment variables for sensitive data
- ✅ HTTPS ready (use in production)
- ✅ Email validation
- ✅ Input sanitization ready
- ✅ Error information obfuscation
- ✅ CORS configured

---

## 📄 License

MIT License - Feel free to use this project for commercial and personal purposes.

---

## 🤝 Contributing

Found a bug? Have a feature request? Feel free to:

1. Report issues
2. Submit pull requests
3. Suggest improvements
4. Share feedback

---

## 📞 Support

Need help? Check these resources:

- 📖 [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Detailed setup instructions
- 📚 [Node.js Documentation](https://nodejs.org/docs/)
- 📚 [Express Documentation](https://expressjs.com/)
- 📚 [Nodemailer Documentation](https://nodemailer.com/)
- 📚 [Gmail API Help](https://support.google.com/mail/)

---

<div align="center">

### ⭐ Star this project if you find it useful!

**Made with ❤️ using Node.js and Express**

</div>
