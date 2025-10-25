# Environment Variables Required for Deployment

## Backend Environment Variables (.env)

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
NODE_ENV=production
PORT=5001

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET_KEY=your-super-secret-jwt-key-here-make-it-long-and-random

# Stream Chat & Video API
STEAM_API_KEY=your-stream-api-key
STEAM_API_SECRET=your-stream-api-secret

# Frontend URL (for CORS)
FRONTEND_URL=https://your-app-name.onrender.com
```

## Frontend Environment Variables (.env)

Create a `.env` file in the `frontend` directory with the following variables:

```env
# Stream API Key for Frontend
VITE_STREAM_API_KEY=your-stream-api-key
```

## How to Get Stream API Credentials

1. Go to [Stream Dashboard](https://dashboard.getstream.io/)
2. Create a new app or use existing one
3. Go to "API Keys" section
4. Copy the API Key and Secret
5. Use the same API Key for both backend and frontend

## MongoDB Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Get the connection string
5. Replace `<username>`, `<password>`, and `<database_name>` in the MONGO_URI

## Render Deployment Steps

1. Push your code to GitHub
2. Connect your GitHub repository to Render
3. Create a new Web Service
4. Set the following in Render dashboard:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Environment**: `Node`
   - **Plan**: `Free` (or upgrade as needed)

5. Add all environment variables in Render dashboard:
   - Go to "Environment" tab
   - Add each variable from the backend .env list above

## Important Notes

- The `STEAM_API_KEY` should be the same for both backend and frontend
- Make sure to use HTTPS URLs in production
- The `FRONTEND_URL` should match your actual Render app URL
- Keep your JWT secret key secure and random
- MongoDB connection string should include your actual credentials
