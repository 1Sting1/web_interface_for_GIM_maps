from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
import requests

API_BASE = "https://services.simurg.space/gim-tec-forecast"

router = APIRouter()

@router.get("/models")
def get_models():
    resp = requests.get(f"{API_BASE}/models")
    if resp.status_code != 200:
        raise HTTPException(status_code=resp.status_code, detail=resp.text)
    return JSONResponse(content=resp.json())
