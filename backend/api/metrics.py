from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
import requests

API_BASE = "https://services.simurg.space/gim-tec-forecast"

router = APIRouter()

@router.get("/get_metrics/{model_code}")
def get_metrics(model_code: str):
    resp = requests.get(f"{API_BASE}/get_metrics/{model_code}")
    if resp.status_code != 200:
        raise HTTPException(status_code=resp.status_code, detail=resp.text)
    return JSONResponse(content=resp.json()) 