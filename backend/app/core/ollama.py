import asyncio
import logging
from contextlib import asynccontextmanager
from ollama import AsyncClient
from .config import settings

logger = logging.getLogger(__name__)

client = AsyncClient(host=settings.OLLAMA_HOST)