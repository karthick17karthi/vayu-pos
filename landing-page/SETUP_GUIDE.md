# Vayu POS Landing Page - Setup Guide

Complete step-by-step guide to set up and run the Vayu POS landing page.

## Prerequisites

- Node.js 16+ installed ([Download](https://nodejs.org/))
- npm or yarn package manager
- EmailJS account (free) ([Sign up](https://www.emailjs.com))

## Quick Start (5 minutes)

### 1. Install Dependencies

Open terminal in the project folder and run:

```bash
npm install
```

### 2. Set Up EmailJS

#### Create Your EmailJS Account

1. Visit [emailjs.com](https://www.emailjs.com)
2. Click **Sign Up** and create a free account
3. Verify your email address

#### Connect Your Email Service

1. In the EmailJS dashboard, go to **Email Services** (left sidebar)
2. Click **Add Service**
3. Select your email provider:
   - **Gmail**: Recommended for beginners
   - **Outlook**, **Yahoo**, etc.
4. Follow the authentication steps
5. **Copy and paste your Service ID** somewhere safe
   - Format: `service_1234567890abcdef`

#### Create Email Template

1. Go to **Email Templates** (left sidebar)
2. Click **Create New Template**
3. Fill in the template form:

```
Subject: 🎉 New Vayu POS Demo Request

---

Dear Admin,

A new demo request has been received!

**Customer Information:**
Name: {{owner_name}}
Hotel/Restaurant: {{hotel_name}}
License Number: {{license_number}}
Phone: {{phone_number}}
Email: {{email}}
City: {{city}}
Number of Branches: {{branches}}

**Message:**
{{message}}

---

Best regards,
Vayu POS System
```

4. In the **To Email** field, enter your admin email address
5. Click **Save Template**
6. **Copy your Template ID** from the top of the page
   - Format: `template_abcdef1234567890`

#### Get Your Public Key

1. Click **Account** (top right) → **Account Settings**
2. Click **API Keys** tab
3. Copy the **Public Key**
   - Format: `pk_1234567890abcdef1234567890abc`

### 3. Configure Environment Variables

1. Create a `.env` file in the project root (same folder as `package.json`)
2. Copy the contents from `.env.example`:

```
VITE_EMAILJS_PUBLIC_KEY=pk_1234567890abcdef
VITE_EMAILJS_SERVICE_ID=service_1234567890abcdef
VITE_EMAILJS_TEMPLATE_ID=template_abcdef1234567890
VITE_ADMIN_EMAIL=your-email@gmail.com
```

3. Replace the placeholder values with your actual credentials:
   - `pk_...` = Your EmailJS Public Key
   - `service_...` = Your EmailJS Service ID
   - `template_...` = Your EmailJS Template ID
   - `your-email@gmail.com` = Email where you want to receive demo requests

**Example of completed .env file:**
```
VITE_EMAILJS_PUBLIC_KEY=pk_test123456789abcdefghijklmnopqr
VITE_EMAILJS_SERVICE_ID=service_x1y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6
VITE_EMAILJS_TEMPLATE_ID=template_abc123def456ghi789jkl012mno345pqr
VITE_ADMIN_EMAIL=karthick@example.com
```

### 4. Run the Development Server

```bash
npm run dev
```

The app will automatically open at `http://localhost:3000`

## Testing the Form

1. Visit `http://localhost:3000`
2. Scroll to the "Request Your Free Demo" section
3. Fill in the form with test data:
   - Owner Name: `John Doe`
   - Hotel Name: `Test Restaurant`
   - License Number: `LIC123456`
   - Phone: `9876543210`
   - Email: `test@example.com`
   - City: `Mumbai`
   - Branches: `2`
   - Message: `Testing the form`

4. Click **Submit Demo Request**
5. You should see: `"Demo Request Submitted Successfully!"`
6. Check your email inbox for the demo request

## Troubleshooting

### Form Not Sending Emails?

**Check 1: Console Errors**
- Open Developer Tools (Press `F12`)
- Go to **Console** tab
- Look for red error messages
- Share the error details for debugging

**Check 2: Verify Credentials**
- Confirm your `.env` file has all three credentials
- Check for typos in the keys
- Make sure there are no extra spaces

**Check 3: EmailJS Service**
- Log into EmailJS dashboard
- Verify the Service ID is active (green checkmark)
- Verify the Template ID exists and is active
- Check that your email service (Gmail, etc.) is connected

**Check 4: Refresh Browser**
- Save changes to `.env`
- Stop dev server (Ctrl+C)
- Run `npm run dev` again
- Hard refresh browser (Ctrl+Shift+R)

**Check 5: Template Variables**
Make sure your EmailJS template uses these exact variable names:
- `{{owner_name}}`
- `{{hotel_name}}`
- `{{license_number}}`
- `{{phone_number}}`
- `{{email}}`
- `{{city}}`
- `{{branches}}`
- `{{message}}`

> Note: Variable names must use underscores (`_`), not spaces!

### Port Already in Use?

If you see "Port 3000 is already in use":

1. Edit `vite.config.js`
2. Change `port: 3000` to `port: 3001` (or any unused port)
3. Restart dev server

### Styling Issues?

Clear your browser cache:
- Windows: `Ctrl + Shift + Delete` → Clear browsing data
- Mac: `Cmd + Shift + Delete`

Then refresh the page.

## Project Structure

```
landing-page/
├── .env                    # Your credentials (don't share!)
├── .env.example           # Template for .env file
├── .gitignore             # Files to exclude from git
├── package.json           # Project dependencies
├── README.md              # Full documentation
├── SETUP_GUIDE.md         # This file
├── vite.config.js         # Vite build configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── index.html             # Main HTML file
└── src/
    ├── main.jsx           # Entry point
    ├── App.jsx            # Landing page component
    └── index.css          # Global styles
```

## Common Tasks

### Edit the Landing Page Content

Edit `src/App.jsx`:
- **Headline**: Change "Smart Restaurant Billing Solution"
- **Description**: Update the hero section text
- **Features**: Add/remove feature cards
- **Form Fields**: Add/remove form inputs
- **Colors**: Update Tailwind classes

### Change Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#2563eb',      // Blue
  secondary: '#1e40af',    // Dark Blue
}
```

Common colors:
- Blue: `#2563eb`
- Green: `#10b981`
- Red: `#ef4444`
- Purple: `#a855f7`

### Build for Production

When ready to deploy:

```bash
npm run build
```

This creates an optimized `dist/` folder you can upload to hosting.

## Deployment Options

### Deploy to Vercel (Easiest)

1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify

1. Build project: `npm run build`
2. Drag-and-drop `dist/` folder to [netlify.com](https://netlify.com)
3. Add environment variables in Netlify dashboard

### Deploy to GitHub Pages

1. Update `vite.config.js` with your repo name
2. Run: `npm run build`
3. Push `dist/` folder to GitHub

## Security Best Practices

✅ **DO:**
- Keep `.env` file private (never commit to git)
- Use EmailJS Public Key (it's safe to expose)
- Validate form data on both client and server
- Use HTTPS when deployed

❌ **DON'T:**
- Share your `.env` file
- Commit `.env` to git/GitHub
- Expose email service credentials in code
- Leave default placeholder values in production

## Getting Help

If you encounter issues:

1. Check this guide's Troubleshooting section
2. Review the [EmailJS Documentation](https://www.emailjs.com/docs/)
3. Check browser console for errors (F12)
4. Ask in your team channel with error messages

## Next Steps

After setup works:

1. **Customize**: Edit colors, text, features, and images
2. **Add Analytics**: Integrate Google Analytics
3. **Add More Pages**: Create pricing, features, or blog pages
4. **Deploy**: Push to production
5. **Monitor**: Track form submissions and responses

## Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [EmailJS Documentation](https://www.emailjs.com/docs)
- [Vite Documentation](https://vitejs.dev)

---

**Happy coding! 🚀**

If you have questions, refer to the main README.md file.
