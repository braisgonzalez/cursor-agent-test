#!/bin/bash

# Exit on error
set -e

# Run backend tests
cd app/api
echo "\n=== Running backend tests (pytest) ==="
~/.local/bin/pytest

# Run frontend tests
cd ../..
cd app
echo "\n=== Running frontend tests (npm test) ==="
npm test

# Start backend server in background, redirect output to backend.log
cd api
echo "\n=== Starting backend server (FastAPI, port 8000) ==="
uvicorn hello:app --reload --port 8000 > ../../backend.log 2>&1 &
BACK_PID=$!
cd ..

# Start frontend server in background, redirect output to frontend.log
echo "\n=== Starting frontend server (Next.js, port 3000) ==="
npm run dev > ../frontend.log 2>&1 &
FRONT_PID=$!

sleep 2

# Show server logs tail
echo -e "\n=== Backend server log (last 10 lines) ==="
tail -n 10 ../backend.log

echo -e "\n=== Frontend server log (last 10 lines) ==="
tail -n 10 ../frontend.log

# Open Google Chrome to http://localhost:3000
if command -v google-chrome > /dev/null; then
  google-chrome http://localhost:3000 &
elif command -v chromium-browser > /dev/null; then
  chromium-browser http://localhost:3000 &
elif command -v open > /dev/null; then
  open -a "Google Chrome" http://localhost:3000 &
else
  echo "Please open http://localhost:3000 in your browser."
fi

# Wait for user to press enter to stop servers
echo "\nServers are running:"
echo "- Backend: http://localhost:8000 (log: backend.log)"
echo "- Frontend: http://localhost:3000 (log: frontend.log)"
echo "\nPress [ENTER] to stop both servers."
read

# Kill background servers
kill $BACK_PID $FRONT_PID

echo "\nServers stopped." 