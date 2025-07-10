from fastapi import APIRouter
from app.core.ollama import client

router = APIRouter(prefix="/model", tags=["model"])

@router.get("/")
async def read_item():
    message = {'role': 'user', 'content': 'why is the sky blue?'}
    response = await client.chat(model="llama3.2:3b", messages=[message])
    return response