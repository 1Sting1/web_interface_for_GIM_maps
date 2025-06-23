from fastapi import FastAPI
from api import models, forecasts, images, metrics

app = FastAPI()

app.include_router(models.router, prefix="/api")
app.include_router(forecasts.router, prefix="/api")
app.include_router(images.router, prefix="/api")
app.include_router(metrics.router, prefix="/api")
