#!/bin/bash

# Navigate to the project directory
cd /home/alexsoft1/onway/

# Fetch latest changes from the repository
git fetch

git merge origin/server

# Install dependencies
#npm install --force

# Build the Next.js application
npm run build

# Restart the Next.js application using PM2
pm2 restart front

