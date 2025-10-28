# Vercel Deployment Guide for Streamify

## 🚀 Deployment Steps

### 1. Frontend Deployment (Vercel)

#### Prerequisites:
- Vercel account
- GitHub repository connected to Vercel
- Stream API keys

#### Steps:
1. **Connect Repository**: Link your GitHub repo to Vercel
2. **Set Root Directory**: Set `frontend` as the root directory
3. **Environment Variables**: Add these in Vercel dashboard:
   ```
   VITE_STREAM_API_KEY=your_stream_api_key
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```
4. **Deploy**: Click deploy and wait for build to complete

### 2. Backend Deployment (Separate Vercel Project)

#### Steps:
1. Create a new Vercel project for backend
2. Set root directory to `backend`
3. Add environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   STREAM_API_KEY=your_stream_api_key
   STREAM_SECRET_KEY=your_stream_secret_key
   JWT_SECRET=your_jwt_secret
   ```
4. Deploy backend

### 3. Configuration Files Created:

#### ✅ `frontend/vercel.json`
- Configures build settings
- Sets up SPA routing
- Adds CORS headers

#### ✅ `frontend/env.example`
- Template for environment variables
- Instructions for Vercel setup

#### ✅ Updated `frontend/vite.config.js`
- Optimized build configuration
- Code splitting for better performance
- Production-ready settings

#### ✅ Updated `frontend/src/lib/axios.js`
- Dynamic API URL based on environment
- Production-ready API configuration

### 4. Important Notes:

- **Backend**: Deploy separately as a serverless function or separate Vercel project
- **Frontend**: Deploy as static site with SPA routing
- **Environment Variables**: Must be set in Vercel dashboard
- **CORS**: Configured in vercel.json for API calls

### 5. Post-Deployment:

1. Update `VITE_API_URL` in frontend environment variables
2. Test all functionality
3. Update any hardcoded URLs
4. Monitor logs for any issues

## 🔧 Troubleshooting:

- **Build Errors**: Check environment variables are set
- **API Errors**: Verify backend URL is correct
- **Routing Issues**: Ensure vercel.json rewrites are working
- **CORS Issues**: Check headers configuration in vercel.json
