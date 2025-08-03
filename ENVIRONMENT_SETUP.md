# Environment Variables Setup Guide

## CORS Error Fix

The CORS error you're experiencing is because the server needs to know about your client domain. Here's how to fix it:

## Server Environment Variables (Vercel Dashboard)

Go to your **server project** in Vercel dashboard and add these environment variables:

```
FRONTEND_URL=https://arats-client.vercel.app
NODE_ENV=production
```

## Client Environment Variables (Vercel Dashboard)

Go to your **client project** in Vercel dashboard and add this environment variable:

```
NEXT_PUBLIC_API_URL=https://server-arats.vercel.app/api
```

## How to Set Environment Variables in Vercel

1. **Go to your Vercel project dashboard**
2. **Click on "Settings" tab**
3. **Click on "Environment Variables"**
4. **Add each variable:**
   - Name: `FRONTEND_URL`
   - Value: `https://arats-client.vercel.app`
   - Environment: Production (and Preview if needed)
5. **Click "Add"**
6. **Repeat for other variables**

## Redeploy After Changes

After setting environment variables:

### For Server:

```bash
cd server
vercel --prod
```

### For Client:

```bash
# From root directory
vercel --prod
```

## Test the Fix

After redeploying, test these endpoints:

1. **Server health check:**

   ```
   https://server-arats.vercel.app/api/health
   ```

2. **Events endpoint:**

   ```
   https://server-arats.vercel.app/api/events/featured
   ```

3. **Client should now work without CORS errors**

## Troubleshooting

### If CORS error persists:

1. **Check the exact domain names** - make sure they match exactly
2. **Redeploy both client and server** after setting environment variables
3. **Clear browser cache** and try again
4. **Check browser console** for the exact error message

### If API calls fail:

1. **Verify the API URL** in client environment variables
2. **Check server logs** in Vercel dashboard
3. **Test server endpoints directly** in browser

## Current Configuration

- **Client Domain:** `https://arats-client.vercel.app`
- **Server Domain:** `https://server-arats.vercel.app`
- **API Base URL:** `https://server-arats.vercel.app/api`

## Quick Test Commands

```bash
# Test server health
curl https://server-arats.vercel.app/api/health

# Test events endpoint
curl https://server-arats.vercel.app/api/events/featured

# Test CORS headers
curl -H "Origin: https://arats-client.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     https://server-arats.vercel.app/api/events/featured
```
