# Fullstack Monorepo: Next.js + Python API

This repository contains a modern fullstack application, structured as a monorepo for seamless development and deployment on Vercel.

## Project Structure

- `app/` — Main application folder
  - `app/` (root): Next.js (React, TypeScript) frontend
  - `app/api/`: Python serverless functions (FastAPI-compatible) for backend API endpoints

## Features
- Professional, interactive Next.js frontend
- Python backend as serverless API endpoints
- Ready for one-click deployment on Vercel
- Automated testing and CI with GitHub Actions

## Getting Started

### 1. Install Frontend Dependencies
```sh
cd app
npm install
```

### 2. Run the Frontend Locally
```sh
npm run dev
# App runs at http://localhost:3000
```

### 3. Run the Backend Locally
```sh
cd app/api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn hello:handler --reload  # Or use your FastAPI server if needed
```

### 4. Run Unit Tests
- **Frontend:**
  ```sh
  cd app
  npm test
  ```
- **Backend:**
  ```sh
  cd app/api
  pytest
  ```

## Continuous Integration
- GitHub Actions run all unit tests on every push and PR.

## Deployment
- Deploy directly to Vercel. Set the Root Directory to `app` in Vercel project settings.
- Both the Next.js frontend and Python API endpoints will be deployed together.

---

For more details, see the `app/README.md` and `app/api/README.md` files.
