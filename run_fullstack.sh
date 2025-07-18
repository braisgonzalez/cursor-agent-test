#!/bin/bash

# Exit on error
set -e

# Show directory structure for debugging
cd app
ls -l
ls -l src/app
ls -l src/app/__tests__
cd ..
ls -l app/api

# Check for required files
if [ ! -f app/src/app/page.tsx ]; then
  echo "ERROR: app/src/app/page.tsx is missing!"
  exit 1
fi
if [ ! -f app/src/app/layout.tsx ]; then
  echo "ERROR: app/src/app/layout.tsx is missing!"
  exit 1
fi

# Run backend tests
cd app/api
echo "\n=== Running backend tests (pytest) ==="
~/.local/bin/pytest

# Run frontend tests
cd ../..
cd app
echo "\n=== Running frontend tests (npm test) ==="
npm test

# Build Next.js before starting dev server
npm run build

# Start backend server in foreground
cd api
echo "\n=== Starting backend server (FastAPI, port 8000) ==="
echo "(Press Ctrl+C to stop)"
uvicorn hello:app --reload --port 8000 &
BACK_PID=$!
cd ..

# Start frontend server in foreground

echo "\n=== Starting frontend server (Next.js, port 3000) ==="
echo "(Press Ctrl+C to stop)"
npm run dev &
FRONT_PID=$!

sleep 5

# Always open Google Chrome to http://localhost:3000 on macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
  open -na "Google Chrome" --args --new-tab "http://localhost:3000" &
else
  echo "Please open http://localhost:3000 in your browser."
fi

# Wait for user to press enter to stop servers
echo "\nServers are running:"
echo "- Backend: http://localhost:8000"
echo "- Frontend: http://localhost:3000"
echo "\nPress [ENTER] to stop both servers."
read

# Kill background servers
kill $BACK_PID $FRONT_PID

echo "\nServers stopped." 