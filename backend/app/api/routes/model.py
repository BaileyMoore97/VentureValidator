from fastapi import APIRouter

router = APIRouter(prefix="/model", tags=["model"])

@router.get("/")
def read_item():
    return {"hello": "world2"}