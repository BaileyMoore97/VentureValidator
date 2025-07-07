import asyncio
import logging
from contextlib import asynccontextmanager
from ollama import AsyncClient

logger = logging.getLogger(__name__)

client = AsyncClient(host="http://localhost:11434")