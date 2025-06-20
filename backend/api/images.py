from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
import requests

API_BASE = "https://services.simurg.space/gim-tec-forecast"

router = APIRouter()

@router.get("/get_forecast_image/{forecast_id}")
def get_forecast_image(forecast_id: str, shift: int = 0):
    resp = requests.get(f"{API_BASE}/get_forecast_image/{forecast_id}?shift={shift}", stream=True)
    if resp.status_code != 200:
        raise HTTPException(status_code=resp.status_code, detail=resp.text)
    content_type = resp.headers.get("content-type", "application/octet-stream")
    return StreamingResponse(resp.raw, media_type=content_type) 