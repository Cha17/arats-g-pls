#!/bin/bash

echo "🚀 Deploying ARATS Server to Vercel"
echo "===================================="

# Check if we're in the server directory
if [ ! -f "package.json" ] || [ ! -d "api" ]; then
    echo "❌ Error: Please run this script from the server directory"
    echo "   cd server && ./deploy.sh"
    exit 1
fi

# Clean up any existing Vercel config
echo "🧹 Cleaning up existing Vercel configuration..."
rm -rf .vercel

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed. Please install it first:"
    echo "npm i -g vercel"
    exit 1
fi

echo "📦 Current API files:"
ls -la api/

echo ""
echo "🚀 Starting deployment..."
echo "   This will create a new Vercel project for your server"
echo ""

# Deploy to Vercel
vercel

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Set environment variables in Vercel dashboard:"
echo "   - KINDE_ISSUER_URL"
echo "   - KINDE_CLIENT_ID" 
echo "   - KINDE_CLIENT_SECRET"
echo "   - DATABASE_URL"
echo "   - FRONTEND_URL"
echo "   - NODE_ENV=production"
echo ""
echo "2. Test your endpoints:"
echo "   - https://your-domain.vercel.app/api"
echo "   - https://your-domain.vercel.app/api/health"
echo "   - https://your-domain.vercel.app/api/auth/me"
echo ""
echo "3. Update your client's NEXT_PUBLIC_API_URL to point to your server" 