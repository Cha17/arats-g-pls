# Server Deployment Guide

## Issues Fixed:

1. ✅ Updated `vercel.json` for proper Bun runtime configuration
2. ✅ Fixed server export format for Vercel
3. ✅ Added proper health check and root endpoints

## Required Environment Variables

You need to set these environment variables in your Vercel project:

### Kinde Authentication

```
KINDE_ISSUER_URL=https://your-domain.kinde.com
KINDE_CLIENT_ID=your-client-id
```

### Database (Neon)

```
DATABASE_URL=postgresql://username:password@host/database
```

### Frontend URL

```
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

## Deployment Steps

### Option 1: Deploy Server as Separate Project (Recommended)

1. **Create a new Vercel project for the server:**

   ```bash
   cd server
   vercel
   ```

2. **Set environment variables in Vercel dashboard:**

   - Go to your server project settings
   - Add all the environment variables listed above

3. **Deploy:**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy Both Together (Advanced)

If you want to deploy both client and server together, you'll need to:

1. Configure Vercel to handle both builds
2. Set up proper routing between client and server
3. Configure environment variables for both

## Testing Deployment

After deployment, test these endpoints:

- `GET /` - Should return server status
- `GET /health` - Should return health check
- `GET /api/auth/me` - Should return auth error (no token) or user data

## Common Issues

1. **"Module not found" errors**: Make sure all dependencies are in `package.json`
2. **Environment variables not working**: Check Vercel dashboard settings
3. **CORS errors**: Verify `FRONTEND_URL` is set correctly
4. **Database connection errors**: Check `DATABASE_URL` format and permissions

## Debugging

Check Vercel function logs in the dashboard for detailed error messages.
