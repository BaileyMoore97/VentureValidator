from typing import Union
from fastapi import FastAPI
from app.core.config import settings
from app.api.main import api_router

app = FastAPI(
    title="VentureValidator",
    openapi_url="/...",
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def read_root():
    return {"hello": "world"}