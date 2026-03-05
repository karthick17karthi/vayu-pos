# Vayu POS Landing Page - Quick Reference

## 🚀 Start Development

```bash
# 1. Install dependencies
npm install

# 2. Create .env file with your EmailJS credentials
# Copy from .env.example and fill in your keys

# 3. Start dev server (opens automatically at http://localhost:3000)
npm run dev

# 4. Stop server
Ctrl + C
```

## 📧 EmailJS Setup (5 minutes)

1. **Sign up** at [emailjs.com](https://www.emailjs.com)
2. **Add Service** - Connect your email (Gmail, Outlook, etc.)
3. **Create Template** - Use the variables in .env.example
4. **Get Keys**:
   - Public Key (Account → API Keys)
   - Service ID (Email Services)
   - Template ID (Email Templates)
5. **Create `.env` file** with your 3 keys

## 📋 Project Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main landing page component (edit here!) |
| `src/main.jsx` | React entry point |
| `src/index.css` | Global styles |
| `.env` | Your EmailJS credentials (create this!) |
| `package.json` | Dependencies and scripts |
| `tailwind.config.js` | Tailwind CSS customize |
| `vite.config.js` | Build configuration |

## 🎨 Customize the Page

Edit `src/App.jsx`:

- **Headline**: Line ~124 - change "Vayu POS" or description
- **Features**: Lines ~155-210 - add/edit feature cards
- **Form Fields**: Lines ~230-340 - add/remove form inputs
- **Colors**: Use Tailwind classes like `text-blue-600`, `bg-blue-600`

## ⚙️ Environment Variables

Create `.env` file with:
```
VITE_EMAILJS_PUBLIC_KEY=pk_your_key_here
VITE_EMAILJS_SERVICE_ID=service_your_id_here
VITE_EMAILJS_TEMPLATE_ID=template_your_id_here
```

Get these from your EmailJS dashboard.

## 🧪 Test the Form

1. Run `npm run dev`
2. Scroll to "Request Your Free Demo"
3. Fill in the form
4. Submit
5. Check your email

## 🐛 Troubleshooting

**Form not sending?**
- Check browser console (F12)
- Verify `.env` file exists with correct keys
- Restart dev server (Ctrl+C, then npm run dev)
- Clear browser cache (Ctrl+Shift+Delete)

**Wrong styling?**
- Hard refresh (Ctrl+Shift+R)
- Check Tailwind CSS is loaded (should see styling)

**Port 3000 already in use?**
- Edit `vite.config.js` - change port to 3001
- Restart server

## 📱 Features Included

✅ Hero Section with CTA button
✅ 4 Feature Cards (Billing, Inventory, GST, Multi-Branch)
✅ Professional Demo Request Form
✅ EmailJS Email Integration
✅ Form Validation
✅ Success Message & Form Reset
✅ Responsive Mobile Design
✅ Smooth Animations
✅ Sticky Navigation

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# This creates a 'dist' folder

# Preview the build
npm run preview

# Deploy 'dist' folder to:
# - Vercel
# - Netlify
# - GitHub Pages
```

## 📚 Full Docs

- **SETUP_GUIDE.md** - Detailed step-by-step setup
- **README.md** - Complete documentation
- **This file** - Quick reference

## 💡 When You're Ready

After setup works:
1. Customize colors, text, and features
2. Add your company logo
3. Connect analytics (Google Analytics)
4. Build and deploy to production

## 🔗 Useful Links

- [EmailJS Docs](https://www.emailjs.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)

---

**Still stuck?** Check SETUP_GUIDE.md for detailed troubleshooting!
