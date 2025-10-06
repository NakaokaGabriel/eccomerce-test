#!/bin/bash

# E-commerce Backend Setup Script
echo "🚀 Setting up E-commerce Backend Development Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose and try again."
    exit 1
fi

echo "✅ Docker and Docker Compose are available"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
if command -v pnpm &> /dev/null; then
    pnpm install
else
    npm install
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Start database
echo "🗄️ Starting PostgreSQL database..."
docker-compose up -d postgres

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Run database migrations
echo "🔄 Running database migrations..."
npx prisma db push

# Seed the database
echo "🌱 Seeding database..."
npm run db:seed

echo "✅ Setup complete!"
echo ""
echo "🎉 Your development environment is ready!"
echo ""
echo "📚 Available commands:"
echo "  npm run start:dev     - Start development server"
echo "  npm run docker:dev    - Start with Docker Compose"
echo "  npm run db:studio     - Open Prisma Studio"
echo "  npm run lint          - Run ESLint"
echo "  npm run format        - Format code with Prettier"
echo "  npm test              - Run tests"
echo ""
echo "🌐 Access your application:"
echo "  API: http://localhost:3000"
echo "  Health: http://localhost:3000/health"
echo "  Prisma Studio: http://localhost:5555 (run 'npm run db:studio')"
echo ""
echo "Happy coding! 🚀"

