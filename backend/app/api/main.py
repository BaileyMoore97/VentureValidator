from fastapi import APIRouter
from app.api.routes import model
from app.core.config import settings

api_router = APIRouter()

api_router.include_router(model.router)