from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
import requests

API_BASE = "https://services.simurg.space/gim-tec-forecast"

router = APIRouter()

@router.get("/get_forecasts/{model_code}")
def get_forecasts(model_code: str):
    resp = requests.get(f"{API_BASE}/get_forecasts/{model_code}")
    if resp.status_code != 200:
        raise HTTPException(status_code=resp.status_code, detail=resp.text)
    return JSONResponse(content=resp.json())

@router.get("/get_forecast_size/{forecast_id}")
def get_forecast_size(forecast_id: str):
    resp = requests.get(f"{API_BASE}/get_forecast_size/{forecast_id}")
    if resp.status_code != 200:
        raise HTTPException(status_code=resp.status_code, detail=resp.text)
    return JSONResponse(content=resp.json()) 