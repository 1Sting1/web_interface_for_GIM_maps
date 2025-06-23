from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
import requests
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

API_BASE = "https://services.simurg.space/gim-tec-forecast"

router = APIRouter()

@router.get("/get_metrics/{model_code}")
def get_metrics(model_code: str, request: Request):
    params = dict(request.query_params)
    url = f"{API_BASE}/get_metrics/{model_code}"
    logger.info(f"Proxying request to: {url} with params: {params}")

    try:
        resp = requests.get(url, params=params)
        logger.info(f"Received status code: {resp.status_code} from upstream API")
        resp.raise_for_status() 
        data = resp.json()
        logger.info(f"Received data from upstream API (first 500 chars): {str(data)[:500]}")
        return JSONResponse(content=data)
    except requests.exceptions.HTTPError as http_err:
        logger.error(f"HTTP error occurred: {http_err} - {resp.text}")
        raise HTTPException(status_code=resp.status_code, detail=resp.text)
    except Exception as err:
        logger.error(f"An error occurred: {err}")
        raise HTTPException(status_code=500, detail=str(err)) 