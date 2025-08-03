@echo off
echo 🚀 ARATS Deployment Script
echo ==========================

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Vercel CLI is not installed. Please install it first:
    echo npm i -g vercel
    pause
    exit /b 1
)

echo 📋 This script will help you deploy both client and server to Vercel
echo.

REM Deploy Client
echo 1️⃣  Deploying Client...
echo    Make sure you're in the root directory (arats-g-pls)
echo    Press Enter to continue...
pause

vercel

echo.
echo ✅ Client deployed! Note down the URL.
echo.

REM Deploy Server
echo 2️⃣  Deploying Server...
echo    Now we'll deploy the server as a separate project
echo    Press Enter to continue...
pause

cd server
vercel

echo.
echo ✅ Server deployed! Note down the URL.
echo.

REM Instructions for environment variables
echo 3️⃣  Configure Environment Variables
echo.
echo 📝 CLIENT Environment Variables (in Vercel dashboard):
echo    NEXT_PUBLIC_API_URL=https://your-server-domain.vercel.app
echo.
echo 📝 SERVER Environment Variables (in Vercel dashboard):
echo    KINDE_ISSUER_URL=https://your-domain.kinde.com
echo    KINDE_CLIENT_ID=your-client-id
echo    KINDE_CLIENT_SECRET=your-client-secret
echo    DATABASE_URL=postgresql://username:password@host/database
echo    FRONTEND_URL=https://your-client-domain.vercel.app
echo    NODE_ENV=production
echo.

echo 🎉 Deployment complete!
echo 📖 See DEPLOYMENT_GUIDE.md for detailed instructions and troubleshooting.
pause 