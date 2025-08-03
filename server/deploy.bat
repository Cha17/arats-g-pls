@echo off
echo 🚀 Deploying ARATS Server to Vercel
echo ====================================

REM Check if we're in the server directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the server directory
    echo    cd server ^&^& deploy.bat
    pause
    exit /b 1
)

if not exist "api" (
    echo ❌ Error: API directory not found
    echo    Make sure you're in the server directory
    pause
    exit /b 1
)

REM Clean up any existing Vercel config
echo 🧹 Cleaning up existing Vercel configuration...
if exist ".vercel" rmdir /s /q .vercel

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Vercel CLI is not installed. Please install it first:
    echo npm i -g vercel
    pause
    exit /b 1
)

echo 📦 Current API files:
dir api

echo.
echo 🚀 Starting deployment...
echo    This will create a new Vercel project for your server
echo.

REM Deploy to Vercel
vercel

echo.
echo ✅ Deployment complete!
echo.
echo 📝 Next steps:
echo 1. Set environment variables in Vercel dashboard:
echo    - KINDE_ISSUER_URL
echo    - KINDE_CLIENT_ID 
echo    - KINDE_CLIENT_SECRET
echo    - DATABASE_URL
echo    - FRONTEND_URL
echo    - NODE_ENV=production
echo.
echo 2. Test your endpoints:
echo    - https://your-domain.vercel.app/api
echo    - https://your-domain.vercel.app/api/health
echo    - https://your-domain.vercel.app/api/auth/me
echo.
echo 3. Update your client's NEXT_PUBLIC_API_URL to point to your server
pause 