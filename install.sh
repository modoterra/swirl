#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Welcome message
echo "🚀 Welcome to SWIRL. Let us begin your installation."

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to show a loading indicator
show_loading() {
    tput civis
    local pid=$!
    local delay=0.1
    local spinner='⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'
    local i=0
    while [ "$(ps a | awk '{print $1}' | grep $pid)" ]; do
        i=$(( (i+1) % ${#spinner} ))
        printf "%s\r" "${spinner:$i:1}"
        sleep $delay
    done
    printf "\r"
    tput cnorm
}

# Check for required commands
for cmd in git composer php npm; do
    if ! command_exists "$cmd"; then
        echo "❌ Error: $cmd is not installed." >&2
        exit 1
    fi
done

# Prompt the user for the installation directory
read -p "📁 Enter the directory to install into: " install_dir

# Check if the directory already exists
if [ -d "$install_dir" ]; then
    echo "❌ Error: Directory $install_dir already exists." >&2
    exit 1
fi

# Create the directory if it doesn't exist
mkdir -p "$install_dir"

# Change to the installation directory
cd "$install_dir"

# Clone the repository
printf "🔄 Cloning the repository...\n"
git clone https://github.com/modoterra/swirl.git &> /dev/null & show_loading
cd swirl

# Install composer dependencies
printf "📦 Installing composer dependencies...\n"
composer install &> /dev/null & show_loading

# Install npm dependencies
printf "📦 Installing npm dependencies...\n"
npm install &> /dev/null & show_loading

# Copy .env.example to .env
printf "🔧 Setting up environment variables...\n"
cp .env.example .env &> /dev/null & show_loading

# Generate application key
printf "🔑 Generating application key...\n"
php artisan key:generate &> /dev/null & show_loading

echo "✅ Installation complete."
