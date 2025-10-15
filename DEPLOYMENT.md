# DialIQ Deployment Guide

## 🚀 Quick Start Deployment Options

### Option 1: Vercel (Recommended - Easiest)
Vercel is the creator of Next.js and offers the best integration.

**Steps:**
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Deploy automatically

**Commands:**
```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy from project directory
vercel

# Or deploy to production
vercel --prod
```

**Benefits:**
- ✅ Zero configuration needed
- ✅ Automatic deployments on git push
- ✅ Built-in CDN and performance optimization
- ✅ Free tier available
- ✅ Custom domains supported

### Option 2: Netlify
Great alternative with excellent Next.js support.

**Steps:**
1. Push code to GitHub
2. Connect repo to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

**Benefits:**
- ✅ Easy GitHub integration
- ✅ Free tier available
- ✅ Great for static sites
- ✅ Form handling included

### Option 3: Railway
Modern platform with great developer experience.

**Steps:**
1. Connect GitHub repo
2. Railway auto-detects Next.js
3. Deploy with one click

**Benefits:**
- ✅ Simple deployment
- ✅ Built-in databases
- ✅ Great for full-stack apps

### Option 4: Self-Hosted (VPS/Cloud)
For more control and custom requirements.

**Prerequisites:**
- Node.js 18+ installed
- PM2 for process management (recommended)

**Commands:**
```bash
# Install dependencies
npm install

# Build the application
npm run build

# Start production server
npm start

# Or with PM2 (recommended)
npm install -g pm2
pm2 start npm --name "dialiq" -- start
pm2 save
pm2 startup
```

## 📋 Pre-Deployment Checklist

### ✅ Code Quality
- [x] No linting errors
- [x] TypeScript compilation successful
- [x] All components working
- [x] Responsive design tested

### ✅ Environment Setup
- [x] All dependencies in package.json
- [x] Build script configured
- [x] TypeScript config ready

### ✅ Features Implemented
- [x] Landing page with hero section
- [x] AI receptionist introduction
- [x] Features section
- [x] Testimonials
- [x] Contact form modal
- [x] Onboarding form (8-step wizard)
- [x] Dashboard with 3 tabs:
  - Real-time call monitoring
  - Call logs with filtering
  - Comprehensive preferences (7 sections)

## 🔧 Environment Variables (if needed)

Create a `.env.local` file for any environment-specific variables:

```bash
# Example environment variables
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

## 📁 Project Structure

```
dialiq/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Dashboard with 3 tabs
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Landing page
│   └── components/
│       ├── ContactForm.tsx       # Contact form modal
│       └── OnboardingForm.tsx    # 8-step onboarding wizard
├── public/                       # Static assets
├── package.json                  # Dependencies
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript config
└── next.config.ts               # Next.js configuration
```

## 🎨 Design Features

- **Black & White Design** - Clean, professional aesthetic
- **Magnifying Glass Logo** - Custom DialIQ branding
- **Responsive Design** - Mobile-first approach
- **Framer Motion Animations** - Smooth transitions
- **Lucide React Icons** - Consistent iconography
- **Tailwind CSS** - Utility-first styling

## 🚀 Recommended Deployment Steps

### For Vercel (Recommended):

1. **Prepare Repository:**
   ```bash
   git add .
   git commit -m "Initial DialIQ website with dashboard"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository
   - Deploy automatically

3. **Custom Domain (Optional):**
   - Add your domain in Vercel dashboard
   - Update DNS records as instructed

### For Netlify:

1. **Prepare Repository:**
   ```bash
   git add .
   git commit -m "Initial DialIQ website with dashboard"
   git push origin main
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login with GitHub
   - Click "New site from Git"
   - Connect your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`

## 🔍 Testing After Deployment

1. **Landing Page:**
   - [ ] Hero section displays correctly
   - [ ] Contact form opens and submits
   - [ ] Onboarding form opens and works
   - [ ] All animations work smoothly

2. **Dashboard:**
   - [ ] Login button navigates to dashboard
   - [ ] All 3 tabs work (Real-time, Call Logs, Preferences)
   - [ ] Preferences show all 7 sections
   - [ ] Responsive design works on mobile

3. **Performance:**
   - [ ] Page loads quickly
   - [ ] Images optimize correctly
   - [ ] No console errors

## 📞 Support

If you encounter any issues during deployment:

1. Check the deployment logs for errors
2. Ensure all dependencies are installed
3. Verify Node.js version compatibility (18+)
4. Test locally with `npm run build && npm start`

## 🎯 Next Steps After Deployment

1. **Analytics:** Add Google Analytics or similar
2. **SEO:** Configure meta tags and sitemap
3. **Backend:** Connect to your API endpoints
4. **Database:** Set up user data storage
5. **Authentication:** Implement real login system
6. **Real-time:** Connect WebSocket for live call data

---

**Ready to deploy!** 🚀 Choose your preferred platform and follow the steps above.
