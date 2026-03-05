/**
 * Vayu POS Demo Request Server
 * 
 * Node.js Express server for handling POS demo requests
 * Features: Email notifications via Gmail SMTP, CORS enabled, JSON parsing
 * 
 * Dependencies: express, nodemailer, cors, dotenv
 */

// ============================================
// 1. IMPORTS & INITIALIZATION
// ============================================

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = 5000;

// In-memory store for demo requests (clears on server restart)
let demoRequests = [];

// ============================================
// 2. MIDDLEWARE CONFIGURATION
// ============================================

// Enable CORS for all routes
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Parse form data (urlencoded)
app.use(express.urlencoded({ extended: true }));

// Handle malformed JSON without crashing the server
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('❌ Invalid JSON payload:', err.message);
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON payload',
    });
  }
  return next(err);
});

// ============================================
// 3. NODEMAILER TRANSPORTER CONFIGURATION
// ============================================

/**
 * Gmail SMTP Transporter
 * 
 * Note: Use Gmail App Password (not regular password)
 * Steps to get App Password:
 * 1. Enable 2-Factor Authentication on Gmail account
 * 2. Go to Google Account > Security > App passwords
 * 3. Select Mail and Windows Computer
 * 4. Generate and copy the 16-character password
 * 5. Use this password in EMAIL_PASS in .env file
 */

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,           // Gmail address
    pass: process.env.EMAIL_PASS,           // Gmail App Password
  },
});

// ============================================
// 4. ROUTES - HEALTH CHECK
// ============================================

/**
 * GET /
 * Health check endpoint
 */
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Vayu POS Demo Request Server is running',
    version: '1.0.0',
    endpoints: {
      demoRequest: 'POST /api/demo-request',
      health: 'GET /',
    },
  });
});

/**
 * GET /api/demo-requests
 * Returns all demo requests stored in memory
 */
app.get('/api/demo-requests', (req, res) => {
  res.status(200).json({
    success: true,
    data: demoRequests,
  });
});

// ============================================
// 5. ROUTES - DEMO REQUEST API
// ============================================

/**
 * POST /api/demo-request
 * 
 * Handles POS demo requests and sends email notifications
 * 
 * Required JSON Body:
 * {
 *   owner_name: string,
 *   hotel_name: string,
 *   license_number: string,
 *   phone: string,
 *   email: string,
 *   city: string,
 *   branches: number,
 *   message: string
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   message: string,
 *   data: { submitted details }
 * }
 */

app.post('/api/demo-request', async (req, res) => {
  try {
    console.log('📥 Incoming demo request body:', req.body);
    console.log(`📧 EMAIL_USER: ${process.env.EMAIL_USER || 'undefined'}`);
    console.log(`🔐 EMAIL_PASS present: ${Boolean(process.env.EMAIL_PASS)}`);
    // ==========================================
    // 5.1 REQUEST VALIDATION
    // ==========================================

    const {
      owner_name,
      hotel_name,
      license_number,
      phone,
      email,
      city,
      branches,
      message,
    } = req.body;

    // Validate all required fields
    const requiredFields = [
      'owner_name',
      'hotel_name',
      'license_number',
      'phone',
      'email',
      'city',
      'branches',
      'message',
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
        requiredFields: requiredFields,
      });
    }

    // Email validation (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    // ==========================================
    // 5.2 PREPARE EMAIL CONTENT
    // ==========================================

    /**
     * Format email body with all submitted details
     * Clear, structured HTML format
     */
    const emailHtmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              color: #333;
              line-height: 1.6;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #f9f9f9;
              padding: 20px;
              border-radius: 8px;
              border: 1px solid #e0e0e0;
            }
            .header {
              background-color: #1f2937;
              color: #fff;
              padding: 20px;
              border-radius: 8px 8px 0 0;
              text-align: center;
              margin: -20px -20px 20px -20px;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .header p {
              margin: 5px 0 0 0;
              font-size: 14px;
              opacity: 0.9;
            }
            .section {
              margin-bottom: 20px;
            }
            .section-title {
              background-color: #3b82f6;
              color: #fff;
              padding: 12px 15px;
              border-radius: 4px;
              font-weight: bold;
              margin-bottom: 12px;
            }
            .field {
              display: flex;
              padding: 10px 0;
              border-bottom: 1px solid #e0e0e0;
            }
            .field:last-child {
              border-bottom: none;
            }
            .field-label {
              font-weight: bold;
              width: 150px;
              color: #1f2937;
            }
            .field-value {
              flex: 1;
              color: #555;
              word-break: break-word;
            }
            .message-box {
              background-color: #ecfdf5;
              border-left: 4px solid #10b981;
              padding: 15px;
              border-radius: 4px;
              margin-top: 10px;
            }
            .message-box h4 {
              margin: 0 0 10px 0;
              color: #065f46;
            }
            .message-box p {
              margin: 0;
              color: #047857;
              white-space: pre-wrap;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #e0e0e0;
              font-size: 12px;
              color: #999;
            }
            .timestamp {
              color: #666;
              font-size: 12px;
              margin-top: 15px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header -->
            <div class="header">
              <h1>🎉 New Vayu POS Demo Request</h1>
              <p>A new demo request has been submitted</p>
            </div>

            <!-- Business Information -->
            <div class="section">
              <div class="section-title">📊 Business Information</div>
              <div class="field">
                <span class="field-label">Owner Name:</span>
                <span class="field-value">${owner_name}</span>
              </div>
              <div class="field">
                <span class="field-label">Hotel Name:</span>
                <span class="field-value">${hotel_name}</span>
              </div>
              <div class="field">
                <span class="field-label">License Number:</span>
                <span class="field-value">${license_number}</span>
              </div>
              <div class="field">
                <span class="field-label">Number of Branches:</span>
                <span class="field-value">${branches}</span>
              </div>
            </div>

            <!-- Contact Information -->
            <div class="section">
              <div class="section-title">📞 Contact Information</div>
              <div class="field">
                <span class="field-label">Phone:</span>
                <span class="field-value">
                  <a href="tel:${phone}" style="color: #3b82f6; text-decoration: none;">
                    ${phone}
                  </a>
                </span>
              </div>
              <div class="field">
                <span class="field-label">Email:</span>
                <span class="field-value">
                  <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">
                    ${email}
                  </a>
                </span>
              </div>
              <div class="field">
                <span class="field-label">City:</span>
                <span class="field-value">${city}</span>
              </div>
            </div>

            <!-- Message -->
            <div class="section">
              <div class="section-title">💬 Message</div>
              <div class="message-box">
                <h4>Customer Message:</h4>
                <p>${message}</p>
              </div>
            </div>

            <!-- Footer -->
            <div class="footer">
              <div class="timestamp">
                📅 Submitted on: ${new Date().toLocaleString('en-IN', {
                  timeZone: 'Asia/Kolkata',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })} IST
              </div>
              <p>This is an automated email from Vayu POS System</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Plain text version of email
    const emailTextContent = `
New Vayu POS Demo Request
=========================

BUSINESS INFORMATION:
Owner Name: ${owner_name}
Hotel Name: ${hotel_name}
License Number: ${license_number}
Number of Branches: ${branches}

CONTACT INFORMATION:
Phone: ${phone}
Email: ${email}
City: ${city}

MESSAGE:
${message}

Submitted on: ${new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })} IST
    `;

    // ==========================================
    // 5.3 SEND EMAIL VIA NODEMAILER
    // ==========================================

    const mailOptions = {
      from: process.env.EMAIL_USER,                    // Sender email
      to: 'vip.mvp2025@gmail.com',                     // Recipient email
      subject: 'New Vayu POS Demo Request',            // Email subject
      html: emailHtmlContent,                          // HTML formatted body
      text: emailTextContent,                          // Plain text fallback
      replyTo: email,                                   // Reply to customer email
    };

    // Send the email asynchronously
    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email sent successfully');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   To: vip.mvp2025@gmail.com`);
    console.log(`   From: ${email}`);

    demoRequests.push(req.body);
    console.log('🧾 Demo request stored in memory. Total:', demoRequests.length);

    // ==========================================
    // 5.4 PREPARE SUCCESS RESPONSE
    // ==========================================

    const responseData = {
      owner_name,
      hotel_name,
      license_number,
      phone,
      email,
      city,
      branches,
      message,
      submitted_at: new Date().toISOString(),
    };

    res.status(200).json({
      success: true,
      message: 'Demo request submitted successfully. We will contact you soon!',
      data: responseData,
      messageId: info.messageId,
    });

  } catch (error) {
    // ==========================================
    // 5.5 ERROR HANDLING
    // ==========================================

    console.error('❌ Error processing demo request:');
    console.error(`   Error: ${error.message}`);
    if (error && error.response) {
      console.error(`   Nodemailer response: ${error.response}`);
    }
    if (error && error.responseCode) {
      console.error(`   Nodemailer responseCode: ${error.responseCode}`);
    }
    console.error(`   Stack: ${error.stack}`);

    res.status(500).json({
      success: false,
      message: 'Failed to process demo request. Please try again later.',
      error: error.message,
    });
  }
});

// ============================================
// 6. ERROR HANDLING - 404 NOT FOUND
// ============================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    method: req.method,
    path: req.path,
    availableEndpoints: {
      health: 'GET /',
      demoRequest: 'POST /api/demo-request',
    },
  });
});

// Centralized error handler to prevent crashes
app.use((err, req, res, next) => {
  console.error('❌ Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// ============================================
// 7. SERVER STARTUP
// ============================================

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});
