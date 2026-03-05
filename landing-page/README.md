# Vayu POS - Landing Page

A professional, responsive React landing page for Vayu POS - Smart Restaurant Billing Solution.

## Features

✨ **Hero Section** - Eye-catching introduction with call-to-action
✨ **Features Showcase** - Display of 4 main features (Billing, Inventory, GST Reports, Multi-Branch Support)
✨ **Request Demo Form** - Comprehensive form with 8 fields to capture restaurant details
✨ **EmailJS Integration** - Automatic email delivery of form submissions
✨ **Responsive Design** - Mobile-friendly layout using Tailwind CSS
✨ **Modern UI** - Clean, professional design with smooth animations
✨ **Form Validation** - Client-side validation for all required fields
✨ **Success Feedback** - Alert and form reset after successful submission

## Tech Stack

- **React 18** - UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **EmailJS** - Email service for form submissions
- **PostCSS & Autoprefixer** - CSS processing

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up EmailJS

You need to set up EmailJS to send email notifications when users submit the form.

#### Step 1: Create an EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com) and sign up for a free account
2. Verify your email

#### Step 2: Create an Email Service
1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add Service**
3. Choose your email provider (Gmail recommended)
4. Follow the instructions to connect your email account
5. Copy your **Service ID** (e.g., `service_xxxxx`)

#### Step 3: Create an Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Vayu POS Demo Request

Name: {{owner_name}}
Hotel: {{hotel_name}}
License: {{license_number}}
Phone: {{phone_number}}
Email: {{email}}
City: {{city}}
Branches: {{branches}}
Message: {{message}}
```

4. Configure the "To Email" to your admin email address
5. Copy your **Template ID** (e.g., `template_xxxxx`)

#### Step 4: Get Your Public Key
1. Go to **Account Settings**
2. Click **API Keys**
3. Copy your **Public Key**

#### Step 5: Update App.jsx

Open `src/App.jsx` and replace the configuration at the top:

```javascript
// Before:
emailjs.init('YOUR_PUBLIC_KEY')

// And in handleSubmit function:
await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  { ... }
)

// After: Replace with your actual credentials
emailjs.init('pk_1234567890abcdef')

await emailjs.send(
  'service_1234567890',
  'template_abcdef1234',
  { ... }
)
```

## Running the Application

### Development Server

```bash
npm run dev
```

The app will automatically open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
landing-page/
├── index.html              # Main HTML file
├── package.json            # Project dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
├── postcss.config.js       # PostCSS configuration
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Main landing page component
    └── index.css           # Global styles
```

## Form Fields

The Request Demo form includes the following fields:

| Field | Type | Required |
|-------|------|----------|
| Owner Name | Text | Yes |
| Hotel Name | Text | Yes |
| Hotel License Number | Text | Yes |
| Phone Number | Tel | Yes |
| Email Address | Email | Yes |
| City | Text | Yes |
| Number of Branches | Number | Yes |
| Message | Textarea | No |

## Features Explained

### 1. Hero Section
- Gradient background with compelling headline
- Short description of the product
- Call-to-action button linking to demo form

### 2. Features Section
- 4 feature cards with icons
- Hover effects for better interactivity
- Clear descriptions of each feature

### 3. Demo Request Form
- Clean, organized layout
- All required fields clearly marked
- Smooth focus states and validation
- Loading state during submission
- Success alert and form reset

### 4. Navigation
- Sticky header with logo and CTA button
- Smooth scrolling to form section

## Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#your-color',
  secondary: '#your-color',
}
```

### Change Content
Edit `src/App.jsx` to modify:
- Headline and descriptions
- Feature titles and descriptions
- Form field labels
- Footer content

### Add More Features
Duplicate a feature card in the Features section and modify:
```jsx
<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
  <div className="bg-[COLOR]-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
    {/* Your SVG Icon */}
  </div>
  <h3 className="text-xl font-bold text-gray-800 mb-3">Your Feature Title</h3>
  <p className="text-gray-600">Your feature description</p>
</div>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Form Not Sending?
1. Check console for errors (Press F12)
2. Verify EmailJS Public Key is correctly set
3. Verify Service ID and Template ID match EmailJS dashboard
4. Check EmailJS Email Service is properly connected
5. Check Email Template variable names match (should use underscores: `owner_name`, `hotel_name`, etc.)

### Styling Issues?
1. Clear browser cache (Ctrl+Shift+Delete)
2. Rebuild project: `npm run build`
3. Check that Tailwind CSS is properly configured

### Port Already in Use?
Edit `vite.config.js` and change the port number:
```javascript
server: {
  port: 3001,  // Change to different port
  open: true
}
```

## Production Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Connect your GitHub repository to Netlify
3. Set build command to `npm run build`
4. Set publish directory to `dist`

## Security Note

⚠️ **Important**: Your EmailJS Public Key is safe to expose publicly, but keep your email credentials secure.

Never commit your `.env` file with sensitive data to version control.

## License

Built for Vyonomen Interns Program

## Support

For issues or questions about the landing page, contact the development team.
