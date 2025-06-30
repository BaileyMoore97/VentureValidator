from fastapi import APIRouter
from app.api.routes import llm
from app.core.config import settings

api_router = APIRouter()
api_router.include_router(llm.router)