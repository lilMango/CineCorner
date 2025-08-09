#!/bin/bash

echo "🎬 Setting up CineCorner - Social Platform for Film Lovers & Filmmakers"
echo "=================================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create .env.local file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cp env.example .env.local
    echo "✅ .env.local created from template"
    echo ""
    echo "⚠️  IMPORTANT: Please update .env.local with your actual credentials:"
    echo "   - DATABASE_URL (PostgreSQL connection string)"
    echo "   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
    echo "   - CLERK_SECRET_KEY"
    echo "   - UPLOADTHING_SECRET"
    echo "   - UPLOADTHING_APP_ID"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "🎉 Setup complete! Next steps:"
echo ""
echo "1. Update your .env.local file with the required credentials"
echo "2. Set up your PostgreSQL database"
echo "3. Run 'npm run db:push' to set up the database schema"
echo "4. Run 'npm run dev' to start the development server"
echo ""
echo "📚 Documentation:"
echo "   - README.md for detailed setup instructions"
echo "   - Visit http://localhost:3000 after starting the dev server"
echo ""
echo "🔗 Required Services:"
echo "   - PostgreSQL database (local or cloud)"
echo "   - Clerk account for authentication"
echo "   - UploadThing account for file uploads"
echo ""
echo "Happy filmmaking! 🎬✨"