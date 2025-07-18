import pytest
from hello import handler

class DummyRequest:
    pass

def test_handler_returns_hello():
    response = handler(DummyRequest())
    assert isinstance(response, dict)
    assert response["statusCode"] == 200
    assert response["body"] == "Hello from Python!" 