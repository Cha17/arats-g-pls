# ARATS Deployment Guide

## Overview

This project is a monorepo with two parts:

- **Client**: Next.js frontend application
- **Server**: Hono API server

## Deployment Strategy

Due to Vercel's limitations with monorepos, we need to deploy the client and server as **separate projects**.

## Step 1: Deploy the Client

### 1.1 Deploy from Root Directory

```bash
# From the root directory (arats-g-pls)
vercel
```

### 1.2 Configure Client Environment Variables

In your Vercel client project dashboard, add:

```
NEXT_PUBLIC_API_URL=https://your-server-domain.vercel.app
```

## Step 2: Deploy the Server

### 2.1 Deploy Server as Separate Project

```bash
# Navigate to server directory
cd server

# Deploy server
vercel
```

### 2.2 Configure Server Environment Variables

In your Vercel server project dashboard, add:

```
# Kinde Authentication
KINDE_ISSUER_URL=https://your-domain.kinde.com
KINDE_CLIENT_ID=your-client-id
KINDE_CLIENT_SECRET=your-client-secret

# Database (Neon)
DATABASE_URL=postgresql://username:password@host/database

# Frontend URL
FRONTEND_URL=https://your-client-domain.vercel.app

# Node Environment
NODE_ENV=production
```

## Step 3: Update Client Configuration

### 3.1 Update API URL

After getting your server URL, update the client's environment variable:

```
NEXT_PUBLIC_API_URL=https://your-server-domain.vercel.app
```

### 3.2 Redeploy Client

```bash
# From root directory
vercel --prod
```

## Step 4: Test Deployment

### 4.1 Test Server Endpoints

- `GET https://your-server-domain.vercel.app/` - Should return server status
- `GET https://your-server-domain.vercel.app/health` - Should return health check
- `GET https://your-server-domain.vercel.app/api/auth/me` - Should return auth error (no token)

### 4.2 Test Client

- Visit your client URL
- Test login functionality
- Verify API calls work

## Troubleshooting

### Common Issues

1. **"Entry point not found" error**

   - Make sure you're deploying from the correct directory
   - For client: deploy from root directory
   - For server: deploy from server directory

2. **CORS errors**

   - Verify `FRONTEND_URL` is set correctly in server environment variables
   - Check that the URL matches exactly (including https://)

3. **Database connection errors**

   - Verify `DATABASE_URL` is correct
   - Check that your database allows connections from Vercel's IP ranges

4. **Authentication errors**
   - Verify Kinde environment variables are set correctly
   - Check that Kinde redirect URLs are configured properly

### Debugging Steps

1. **Check Vercel Function Logs**

   - Go to your Vercel project dashboard
   - Navigate to Functions tab
   - Check logs for detailed error messages

2. **Test Locally First**

   ```bash
   # Test server locally
   cd server
   npm run dev

   # Test client locally
   cd client
   npm run dev
   ```

3. **Verify Environment Variables**
   - Double-check all environment variables are set in Vercel dashboard
   - Ensure no typos in variable names or values

## File Structure After Deployment

```
arats-g-pls/ (Client Project)
├── client/
├── package.json
└── vercel.json

server/ (Server Project - Separate Vercel Project)
├── src/
├── package.json
└── vercel.json
```

## Important Notes

1. **Separate Domains**: Your client and server will have different domains
2. **Environment Variables**: Each project needs its own environment variables
3. **CORS**: Server is configured to accept requests from the client domain
4. **Database**: Make sure your database is accessible from Vercel's servers

## Support

If you encounter issues:

1. Check Vercel function logs
2. Verify all environment variables are set
3. Test endpoints individually
4. Check CORS configuration
