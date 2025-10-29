# Deployment Guide for FormBuilder

## Problem
Your quizzes work on localhost but not on Vercel because the frontend is hardcoded to use `http://localhost:5000` which doesn't exist in production.

## Solution
You need to deploy your backend separately and configure your frontend to use the production API URL.

---

## Step 1: Deploy Your Backend

### Option A: Railway (Recommended - Free Tier Available)

1. **Sign up at** [railway.app](https://railway.app)

2. **Create a new project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo" (or upload your backend folder)

3. **Configure environment variables**:
   - Go to your project settings → Variables
   - Add these variables:
     ```
     MONGO_URI=your-mongodb-connection-string
     PORT=5000
     NODE_ENV=production
     ```

4. **Add start script**:
   - Go to Settings → Build & Deploy
   - Build Command: `npm install`
   - Start Command: `npm start`

5. **Deploy**:
   - Railway will automatically deploy your backend
   - Copy the **deployment URL** (e.g., `https://your-app.railway.app`)

### Option B: Render (Alternative)

1. Sign up at [render.com](https://render.com)
2. Create a new "Web Service"
3. Connect your GitHub repo
4. Set root directory to `/backend`
5. Add environment variables (same as above)
6. Deploy and copy the URL

---

## Step 2: Configure Your Frontend

### 1. Create Environment File

Create a `.env.production` file in your project root:

```bash
VITE_API_URL=https://your-backend-url.railway.app
```

**Replace** `https://your-backend-url.railway.app` with your actual backend URL from Railway.

### 2. For Local Development

Create a `.env` file:

```bash
VITE_API_URL=http://localhost:5000
```

### 3. Deploy to Vercel

1. **Push your changes to GitHub**

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository

3. **Add Environment Variables in Vercel**:
   - Go to your project → Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.railway.app`

4. **Redeploy**:
   - Vercel will automatically redeploy with the new environment variables

---

## Step 3: Update Backend CORS (If Needed)

If you still get CORS errors, update `backend/Server.js`:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://your-vercel-url.vercel.app'
  ]
}));
```

---

## Quick Checklist

- [ ] Backend deployed on Railway/Render
- [ ] `.env.production` file created with backend URL
- [ ] Environment variable added in Vercel dashboard
- [ ] MongoDB connection string configured in Railway
- [ ] CORS settings updated in backend
- [ ] Frontend redeployed on Vercel

---

## Testing

1. **Local**: `npm run dev` → Should use `http://localhost:5000`
2. **Production**: Visit your Vercel URL → Should use your Railway URL

---

## Troubleshooting

### "Quizzes not loading on Vercel"
- Check browser console for errors
- Verify `VITE_API_URL` is set in Vercel
- Check Railway backend logs

### "CORS Error"
- Update backend CORS settings to include your Vercel domain
- Ensure backend is accessible from your domain

### "Connection Refused"
- Verify backend is running on Railway
- Check if MongoDB connection string is correct
- Ensure PORT variable is set

