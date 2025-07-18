from fastapi import FastAPI

app = FastAPI()

@app.get("/hello")
def hello():
    return {"body": "Hello from Python!"} 