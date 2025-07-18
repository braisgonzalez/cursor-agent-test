from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from hello import handler

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/hello")
async def hello_endpoint(request: Request):
    # Simulate the Vercel handler interface
    response = handler(request)
    return response 