# Gmail App Password Setup Guide

## Prerequisites

Before running the server, you need to:
1. Have a Gmail account
2. Enable 2-Factor Authentication (2FA)
3. Generate a Gmail App Password

## Step-by-Step Guide

### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account](https://myaccount.google.com/)
2. Click on **Security** in the left sidebar
3. Scroll down to "How you sign in to Google"
4. Click on **2-Step Verification**
5. Follow the prompts to enable 2FA
6. Verify your phone number via SMS or authenticator app

### Step 2: Generate Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click on **App passwords** (appears only after 2FA is enabled)
3. Select:
   - **App**: Mail
   - **Device**: Windows Computer (or your OS)
4. Click **Generate**
5. Google will show a 16-character password
6. **Copy this password**

### Step 3: Update .env File

1. Open `.env` file in the backend directory
2. Paste the Gmail address in `EMAIL_USER`:
   ```
   EMAIL_USER=your_email@gmail.com
   ```
3. Paste the 16-character App Password in `EMAIL_PASS`:
   ```
   EMAIL_PASS=xxxx xxxx xxxx xxxx
   ```

**Example:**
```
EMAIL_USER=vip.mvp2025@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

### Step 4: Install Dependencies

```bash
npm install
```

### Step 5: Run the Server

```bash
npm start
# OR
node server.js
```

You should see:
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

## Testing the API

### Test 1: Health Check

```bash
curl http://localhost:5000/
```

**Expected Response:**
```json
{
  "status": "success",
  "message": "Vayu POS Demo Request Server is running",
  "version": "1.0.0"
}
```

### Test 2: Submit Demo Request

**Using cURL:**
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

**Using JavaScript/fetch:**
```javascript
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
console.log(data);
```

**Using Postman:**
1. Create new POST request
2. URL: `http://localhost:5000/api/demo-request`
3. Go to **Body** tab → **raw** → **JSON**
4. Paste the JSON payload above
5. Click **Send**

**Success Response:**
```json
{
  "success": true,
  "message": "Demo request submitted successfully. We will contact you soon!",
  "data": {
    "owner_name": "John Doe",
    "hotel_name": "Grand Hotel",
    "license_number": "LIC123456",
    "phone": "+91-9876543210",
    "email": "john@example.com",
    "city": "Mumbai",
    "branches": 3,
    "message": "Interested in POS system",
    "submitted_at": "2026-02-18T10:30:45.123Z"
  },
  "messageId": "<123456789@gmail.com>"
}
```

## API Documentation

### Endpoint: POST /api/demo-request

**Description**: Submit a POS demo request and send email notification

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
  "email": "string (required, valid email)",
  "city": "string (required)",
  "branches": "number (required)",
  "message": "string (required)"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Demo request submitted successfully. We will contact you soon!",
  "data": { /* submitted data */ },
  "messageId": "Gmail message ID"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Missing required fields: owner_name, email",
  "requiredFields": [ /* all required fields */ ]
}
```

**Response (Error - 500):**
```json
{
  "success": false,
  "message": "Failed to process demo request. Please try again later.",
  "error": "Error message details"
}
```

## Troubleshooting

### Issue: "Invalid login" Error

**Solution:**
- Make sure you're using the **16-character App Password**, not your regular Gmail password
- The app password should be generated from [Google Account App Passwords](https://myaccount.google.com/apppasswords)

### Issue: "2-Step verification required" Error

**Solution:**
- You need to enable 2-Factor Authentication on your Gmail account first
- Go to Google Account > Security > 2-Step Verification

### Issue: Email not sending but no error

**Solution:**
- Check the console logs for detailed error messages
- Verify EMAIL_USER and EMAIL_PASS in .env file are correct
- Allow less secure apps on your Gmail account (if not using app password)

### Issue: CORS Error

**Solution:**
- The server has CORS enabled by default
- Make sure your frontend is making requests to the correct URL
- For development, CORS is enabled for all origins

### Issue: Port 5000 already in use

**Solution:**
```bash
# Windows - Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use a different port
PORT=5001 npm start
```

## Environment Variables

**File:** `.env`

```
# Gmail SMTP Configuration
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password

# Server Port (optional)
PORT=5000
```

## Email Features

### HTML Email Template

The server sends beautifully formatted HTML emails with:
- Professional header with branding
- Organized sections for business, contact, and message info
- Color-coded sections for better readability
- Clickable phone and email links
- Timestamp in IST (Indian Standard Time)
- Plain text fallback for compatibility

### Email Details

- **From:** Your configured Gmail address
- **To:** vip.mvp2025@gmail.com
- **Reply-To:** Customer's email address
- **Subject:** "New Vayu POS Demo Request"

## Server Features

✅ **CORS Enabled** - Accept requests from any origin  
✅ **JSON Parsing** - Automatic JSON request/response handling  
✅ **Error Handling** - Comprehensive error messages  
✅ **Input Validation** - Validate all required fields  
✅ **Email Verification** - Basic email format validation  
✅ **Async/Await** - Modern JavaScript async patterns  
✅ **Environment Variables** - Secure configuration management  
✅ **Logging** - Console logs for monitoring  
✅ **Graceful Shutdown** - Clean server shutdown handling  
✅ **Production Ready** - Error handling and monitoring built-in

## Performance & Security

- **Email validation** prevents invalid email submissions
- **Required field validation** ensures data completeness
- **Environment variables** protect sensitive credentials
- **Error handling** prevents server crashes
- **SMTP over TLS** ensures secure email transmission
- **Reply-To header** allows direct customer responses

## Next Steps

1. Set up Gmail App Password following the guide above
2. Update `.env` file with credentials
3. Run `npm start`
4. Test endpoints using provided examples
5. Integrate with your frontend application

## Support

For issues or questions:
- Check the troubleshooting section above
- Review console logs for detailed error messages
- Verify .env configuration
- Check Gmail security settings
