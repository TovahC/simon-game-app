#!/bin/bash
# =============================================================================
# Simon Game - Quick Setup Script
# =============================================================================
# Run this script to set up the project for local development.
# Usage: npm run setup  OR  ./setup.sh
# =============================================================================

set -e

echo ""
echo "🎮 ═══════════════════════════════════════════════"
echo "   SIMON GAME - SETUP"
echo "═══════════════════════════════════════════════════"
echo ""

# Copy env files
echo "📋 Setting up environment files..."

if [ ! -f .env ]; then
  cp .env.example .env
  echo "   ✅ Created .env"
else
  echo "   ⏭️  .env already exists, skipping"
fi

if [ ! -f frontend/.env ]; then
  cp frontend/.env.example frontend/.env
  echo "   ✅ Created frontend/.env"
else
  echo "   ⏭️  frontend/.env already exists, skipping"
fi

echo ""

# Install dependencies
echo "📦 Installing backend dependencies..."
npm install

echo ""
echo "📦 Installing frontend dependencies..."
cd frontend && npm install && cd ..

echo ""
echo "═══════════════════════════════════════════════════"
echo "   ✅ SETUP COMPLETE!"
echo "═══════════════════════════════════════════════════"
echo ""
echo "   To start the app, open TWO terminals:"
echo ""
echo "   Terminal 1 (Backend):"
echo "   $ npm run dev:backend"
echo ""
echo "   Terminal 2 (Frontend):"
echo "   $ cd frontend && npm run dev"
echo ""
echo "   Then open: http://localhost:5173"
echo ""
echo "═══════════════════════════════════════════════════"
echo ""
