import sys
import httpx
import asyncio
import logging
from tenacity import after_log, before_log, retry, stop_after_attempt, wait_fixed
from core.ollama import client
from core.config import settings
from ollama import ResponseError

logger = logging.getLogger(__name__)

max_tries = 60 * 5
wait_seconds = 5

@retry(
    stop=stop_after_attempt(max_tries),
    wait=wait_fixed(wait_seconds),
    before=before_log(logger, logging.INFO),
    after=after_log(logger, logging.WARN),
)

async def pull_model(name):
    try: 
        print(f"Pulling Model {name}")
        await client.pull(model=name)
        print(f"model {name} pulled successfully")
    except Exception as e:
        logger.error(e)
        raise e

async def init(client):
    try:
        models = await client.show(settings.OLLAMA_MODEL)
    except ConnectionError as e:
        logger.error("Could not connect to the Ollama instance, is it running?.")
        sys.exit(1)
    except ResponseError as e:
        if e.status_code == 404:
            logger.info("Requested model not found.")
            await pull_model(settings.OLLAMA_MODEL)
        else:
            logger.info("There was an error requesting the model")
            sys.exit(1)
    except Exception as e:
        logger.error(e)
        sys.exit(1)

async def main():
    logger.info("Initializing Ollama")
    await init(client)
    logger.info("Ollama Initialization complete")

if __name__ == "__main__":
    asyncio.run(main())