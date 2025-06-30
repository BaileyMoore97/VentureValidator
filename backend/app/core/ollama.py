import asyncio
import logging
from contextlib import asynccontextmanager
from ollama import Client

logger = logging.getLogger(__name__)

class OllamaClient:
    def __init__(self, base_url: str = "http://ollama:11434"):
        self.base_url = base_url
        self.client = Client(
            host= base_url,
            headers= {'x-some-header': 'some-value'}
        )
    
    async def wait_for_ollama(self, timeout: int = 60):
        """Wait for Ollama to be ready"""
        for _ in range(timeout):
            try:
                print(self.client.list())
                response = await self.client.get(f"{self.base_url}/api/tags")
                if response.status_code == 200:
                    return True
            except:
                pass
            await asyncio.sleep(1)
        raise Exception("Ollama not ready after timeout")
    
    async def pull_model(self, model_name: str):
        """Pull a model if not already available"""
        try:
            # Check if model exists
            response = await self.client.get(f"{self.base_url}/api/tags")
            models = response.json().get("models", [])
            
            if any(model["name"].startswith(model_name) for model in models):
                logger.info(f"Model {model_name} already available")
                return
            
            logger.info(f"Pulling model {model_name}...")
            
            # Pull model (streaming response)
            async with self.client.stream(
                "POST", 
                f"{self.base_url}/api/pull",
                json={"name": model_name}
            ) as response:
                response.raise_for_status()
                async for chunk in response.aiter_text():
                    if chunk.strip():
                        # Log progress or handle streaming response
                        pass
            
            logger.info(f"Successfully pulled model {model_name}")
            
        except Exception as e:
            logger.error(f"Failed to pull model {model_name}: {e}")
            raise

# FastAPI lifespan for startup/shutdown
@asynccontextmanager
async def lifespan(app):
    # Startup
    ollama = OllamaClient()
    
    logger.info("Waiting for Ollama to be ready...")
    await ollama.wait_for_ollama()
    
    logger.info("Pulling required models...")
    models = ["llama2", "codellama"]  # Your required models
    
    for model in models:
        await ollama.pull_model(model)
    
    app.state.ollama = ollama
    logger.info("Backend initialization complete!")
    
    yield
    
    # Shutdown
    await ollama.client.aclose()

# FastAPI app
from fastapi import FastAPI

app = FastAPI(lifespan=lifespan)

@app.get("/health")
async def health():
    return {"status": "ready"}