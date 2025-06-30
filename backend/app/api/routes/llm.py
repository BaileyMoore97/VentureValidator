from fastapi import APIRouter

router = APIRouter(tags=["llm"])


@router.get("/")
def read_item():
    print("root get for llm router")