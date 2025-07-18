import pytest
from fastapi.testclient import TestClient
from hello import app

def test_hello_endpoint():
    client = TestClient(app)
    response = client.get("/api/hello")
    assert response.status_code == 200
    data = response.json()
    assert data["body"] == "Hello from Python!" 