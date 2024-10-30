#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Clone the repository
echo "Cloning the repository..."
git clone https://github.com/modoterra/swirl.git
cd swirl

# Install composer dependencies
echo "Installing composer dependencies..."
composer install

# Install npm dependencies
echo "Installing npm dependencies..."
npm install

# Copy .env.example to .env
echo "Setting up environment variables..."
cp .env.example .env

# Generate application key
echo "Generating application key..."
php artisan key:generate

echo "Installation complete."
