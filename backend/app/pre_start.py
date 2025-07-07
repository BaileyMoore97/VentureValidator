import httpx
import asyncio
import logging
from tenacity import after_log, before_log, retry, stop_after_attempt, wait_fixed
from core.ollama import client

logger = logging.getLogger(__name__)

max_tries = 60 * 5
wait_seconds = 5

@retry(
    stop=stop_after_attempt(max_tries),
    wait=wait_fixed(wait_seconds),
    before=before_log(logger, logging.INFO),
    after=after_log(logger, logging.WARN),
)

async def init(client):
    try:
        models = await client.list()
    except Exception as e:
        logger.error(e)
        raise e

async def main():
    logger.info("Initializing Ollama")
    await init(client)
    logger.info("Ollama Initialization complete")

if __name__ == "__main__":
    asyncio.run(main())