from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.main import api_router
from app.core.ollama import client
import asyncio

def initialiseRoutes(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(api_router, prefix=settings.API_V1_STR)
    return app

app = FastAPI(
    title="VentureValidator",
    openapi_url="/...",
)

appWithRoutes = initialiseRoutes(app)