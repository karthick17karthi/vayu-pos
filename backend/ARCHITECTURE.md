# 🏗️ Server Architecture & Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT APPLICATIONS                      │
├─────────────────────────────────────────────────────────────────┤
│  • Web Frontend (React)  • Mobile App  • Third-party Services  │
└──────────────┬──────────────────────────────────────────────────┘
               │ HTTP/HTTPS Requests
               │ (JSON)
┌──────────────▼──────────────────────────────────────────────────┐
│                  VAYU POS DEMO SERVER (Express)                │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              EXPRESS MIDDLEWARE LAYER                   │   │
│  │  • CORS Middleware (Allow cross-origin requests)       │   │
│  │  • JSON Parser (Parse application/json)                │   │
│  │  • URL Encoder (Parse form data)                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                 ROUTING LAYER                           │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │ GET /                                            │  │   │
│  │  │ └─> Health Check Response                        │  │   │
│  │  ├──────────────────────────────────────────────────┤  │   │
│  │  │ POST /api/demo-request                           │  │   │
│  │  │ └─> Request Handler with Validation & Email     │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │            BUSINESS LOGIC LAYER                         │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │ 1. Extract & Validate Data                      │   │   │
│  │  │    • Check all required fields                  │   │   │
│  │  │    • Validate email format                      │   │   │
│  │  │    • Validate phone format (optional)           │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  │                      │                                  │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │ 2. Prepare Email Content                        │   │   │
│  │  │    • Create HTML email body                     │   │   │
│  │  │    • Create plain text fallback                 │   │   │
│  │  │    • Format all submitted data                  │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │         EMAIL SERVICE LAYER (Nodemailer)               │   │
│  │  • Gmail SMTP Connection                              │   │
│  │  • TLS Encryption                                      │   │
│  │  • Authentication (App Password)                       │   │
│  │  • Email Sending with Reply-To                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└──────────────┬──────────────────────────────────────────────────┘
               │
       ┌───────┴──────────┐
       │                  │
       ▼                  ▼
  ┌─────────────┐   ┌───────────────────┐
  │ Gmail SMTP  │   │ JSON Response to  │
  │ (Send Email)│   │ Client App        │
  └─────────────┘   └───────────────────┘
       │                  │
       ▼                  ▼
  ┌─────────────┐   ┌───────────────────┐
  │ Email Queue │   │ Success/Error     │
  │ Processing  │   │ Message           │
  └─────────────┘   └───────────────────┘
       │                  │
       ▼                  ▼
  vip.mvp2025@    Client Receives
  gmail.com        Response
```

---

## Request-Response Flow Diagram

### Successful Request Flow

```
CLIENT REQUEST
     │
     ▼
POST /api/demo-request
(JSON body with 8 fields)
     │
     ▼
Express Middleware
(Parse JSON, CORS check)
     │
     ▼
Route Handler
     │
     ▼
Validate Fields
(All 8 required fields present?)
     │ ✅ YES
     ▼
Validate Email Format
     │ ✅ Valid email
     ▼
Create Email Content
(HTML + plain text)
     │
     ▼
Send via Nodemailer
(Gmail SMTP)
     │ ✅ Success
     ▼
Log Success
"✅ Email sent successfully"
     │
     ▼
CLIENT RESPONSE (200 OK)
{
  success: true,
  message: "Demo request submitted successfully",
  data: { submitted data },
  messageId: "<xyz@gmail.com>"
}
     │
     ▼
EMAIL SENT
to vip.mvp2025@gmail.com
```

### Error Flow (Missing Fields)

```
CLIENT REQUEST
     │
     ▼
POST /api/demo-request
(Incomplete JSON body)
     │
     ▼
Validate Fields
     │ ❌ Missing: phone, email
     ▼
CLIENT RESPONSE (400 Bad Request)
{
  success: false,
  message: "Missing required fields: phone, email",
  requiredFields: [ ... ]
}
```

### Error Flow (Invalid Email)

```
CLIENT REQUEST
     │
     ▼
POST /api/demo-request
(Invalid email format)
     │
     ▼
Validate Email Format
     │ ❌ Invalid email
     ▼
CLIENT RESPONSE (400 Bad Request)
{
  success: false,
  message: "Invalid email format"
}
```

---

## Technology Stack Visualization

```
┌─────────────────────────────────────────┐
│        APPLICATION LAYER                │
├─────────────────────────────────────────┤
│  Express.js (Web Framework)             │
│  - Route handling                       │
│  - Middleware management                │
│  - Request/Response handling            │
└─────────────────────────────────────────┘
              │
┌─────────────▼─────────────────────────┐
│      MIDDLEWARE LAYER                 │
├───────────────────────────────────────┤
│  CORS          │    JSON Parser        │
│  (Cross-       │    (Body Parser)      │
│  Origin)       │                       │
└───────────────┬───────────────────────┘
                │
┌───────────────▼──────────────────────┐
│     BUSINESS LOGIC LAYER             │
├──────────────────────────────────────┤
│  • Field Validation                  │
│  • Email Format Validation           │
│  • Email Template Creation           │
│  • Error Handling                    │
└───────────────┬──────────────────────┘
                │
┌───────────────▼──────────────────────┐
│   INTEGRATION LAYER                  │
├──────────────────────────────────────┤
│  Nodemailer ←─→ Gmail SMTP Server   │
│  (Email Client)   (SMTP Relay)       │
└──────────────────────────────────────┘
```

---

## Data Flow Through Components

### 1. Request Data Structure

```javascript
Request Body
└── owner_name: string
├── hotel_name: string
├── license_number: string
├── phone: string
├── email: string
├── city: string
├── branches: number
└── message: string
```

### 2. Validation Process

```
Input Data
    │
    ├─→ Check all 8 fields exist
    │   └─→ If missing: return 400 error
    │
    ├─→ Validate email format
    │   └─→ If invalid: return 400 error
    │
    └─→ All valid ✅
        └─→ Proceed to email
```

### 3. Email Generation

```
Validated Data
    │
    ├─→ Create HTML Template
    │   ├─ Header section
    │   ├─ Business info section
    │   ├─ Contact info section
    │   ├─ Message section
    │   └─ Footer with timestamp
    │
    ├─→ Create Plain Text Version
    │   └─ Fallback for email clients
    │
    └─→ Email Object
        ├─ from: EMAIL_USER
        ├─ to: vip.mvp2025@gmail.com
        ├─ subject: "New Vayu POS Demo Request"
        ├─ html: emailHtmlContent
        ├─ text: emailTextContent
        └─ replyTo: customer email
```

### 4. Response Generation

```
Email Sent Successfully
    │
    └─→ Send 200 OK Response
        {
          success: true,
          message: "Demo request submitted...",
          data: { submitted data },
          messageId: "Gmail message ID"
        }
        │
        └─→ Log entry created
            "✅ Email sent successfully"
```

---

## Deployment Architecture

```
┌────────────────────────────────────┐
│   Local Development                │
├────────────────────────────────────┤
│  npm start                         │
│  Port: 5000                        │
│  http://localhost:5000             │
└────────────────────────────────────┘
              │
              │ (Git push)
              │
┌─────────────▼────────────────────────┐
│   Production Deployment              │
├──────────────────────────────────────┤
│  • Heroku / DigitalOcean / AWS      │
│  • Environment Variables (.env)     │
│  • HTTPS / SSL Certificates         │
│  • Auto-scaling / Load Balancing    │
│  • Error Monitoring                 │
│  • Email logging & tracking         │
└──────────────────────────────────────┘
```

---

## Environment Configuration Flow

```
.env FILE
    │
    ├─→ EMAIL_USER
    │   └─→ Gmail address (from)
    │
    ├─→ EMAIL_PASS
    │   └─→ Gmail App Password
    │
    ├─→ PORT
    │   └─→ Server port (5000)
    │
    └─→ NODE_ENV
        └─→ Environment (dev/prod)
            │
            ▼
        Nodemailer Configuration
        └─→ SMTP Transporter Setup
            └─→ Gmail Authentication
                └─→ Ready to send emails
```

---

## Security & Error Handling

```
REQUEST RECEIVED
    │
    ├─→ CORS Check ✓
    │   │
    │   ├─ Request from allowed origin?
    │   └─ Allow or reject
    │
    ├─→ JSON Parsing ✓
    │   │
    │   ├─ Valid JSON?
    │   └─ Parse or return 400
    │
    ├─→ Validation ✓
    │   │
    │   ├─ All fields present?
    │   └─ Email valid?
    │
    ├─→ Email Sending ✓
    │   │
    │   ├─ SMTP connection?
    │   ├─ Auth successful?
    │   └─ Email delivered?
    │
    └─→ Response ✓
        │
        ├─ Success (200)
        ├─ Client error (400)
        ├─ Server error (500)
        └─ Unknown endpoint (404)
```

---

## Database & Storage (Current)

```
┌──────────────────────────────────┐
│  Stateless API (No Database)     │
├──────────────────────────────────┤
│  • No data persistence           │
│  • All data sent via email       │
│  • Logs to console               │
│  • Example: Add MongoDB later    │
└──────────────────────────────────┘
```

---

## Monitoring & Logging

```
SERVER EVENTS
    │
    ├─→ Server Start
    │   └─ "✅ Server running on port: 5000"
    │
    ├─→ Email Transporter Ready
    │   └─ "✅ Email transporter ready"
    │
    ├─→ Request Received
    │   └─ Log method, path, timestamp
    │
    ├─→ Email Sent
    │   └─ "✅ Email sent successfully"
    │
    ├─→ Error Occurred
    │   └─ "❌ Error: [error message]"
    │
    └─→ Server Shutdown
        └─ "🛑 Shutting down server..."
```

---

This architecture provides a scalable, maintainable foundation for the Vayu POS Demo Request system.
