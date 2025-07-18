# Backend (Python API)

This is the backend of the fullstack demo app, implemented as a Python serverless function (FastAPI-compatible) for Vercel deployment.

## Purpose
This backend provides a simple API endpoint for the Next.js frontend, demonstrating Python serverless integration with Vercel.

## Running Locally

1. (Recommended) Create and activate a virtual environment:
   ```sh
   python3 -m venv venv
   source venv/bin/activate
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Start the server (example with uvicorn):
   ```sh
   uvicorn server:app --reload
   ```
4. The API will be available at [http://localhost:8000](http://localhost:8000).

## Running Unit Tests

To run backend unit tests:
```sh
pytest
```

## Continuous Integration

A GitHub Action runs all unit tests automatically when code is merged into the main branch. 