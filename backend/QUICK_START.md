# 🚀 Quick Start Guide

Get the Vayu POS Demo Request Server running in 5 minutes!

## Prerequisites

- Node.js 14+ installed
- Gmail account with 2FA enabled
- Gmail App Password generated

## Step 1: Get Gmail App Password (2 minutes)

1. Go to https://myaccount.google.com/apppasswords
2. Select: App = Mail, Device = Windows Computer
3. Click "Generate"
4. Copy the 16-character password

## Step 2: Configure Environment (1 minute)

Edit `.env` file:

```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
PORT=5000
```

## Step 3: Install Dependencies (1 minute)

```bash
npm install
```

## Step 4: Start Server (1 minute)

```bash
npm start
```

You should see:

```
✅ Server running on port: 5000
📍 Local URL: http://localhost:5000
📧 Email transporter ready
```

## Step 5: Test the API (Quick)

### Health Check
```bash
curl http://localhost:5000/
```

### Submit Demo Request
```bash
curl -X POST http://localhost:5000/api/demo-request \
  -H "Content-Type: application/json" \
  -d '{
    "owner_name": "John Doe",
    "hotel_name": "Grand Hotel",
    "license_number": "LIC123",
    "phone": "+919876543210",
    "email": "john@example.com",
    "city": "Mumbai",
    "branches": 3,
    "message": "Interested in demo"
  }'
```

## ✅ Done!

Server is running and ready to receive demo requests. Check your email inbox!

## Need Help?

- Read [README.md](./README.md) for complete documentation
- Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup
- Run tests: `node test.js`

## Troubleshooting

**Server won't start?**
- Check Node.js version: `node --version`
- Reinstall: `rm -r node_modules && npm install`

**Emails not sending?**
- Verify .env has correct credentials
- Check Gmail security settings
- Use App Password, not regular password

**Port in use?**
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use different port
PORT=5001 npm start
```

That's it! 🎉
