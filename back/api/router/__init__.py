from fastapi import APIRouter

from .images import router as images_router

# メインルーターの作成と各サブルーターの登録
router = APIRouter()
router.include_router(images_router)

__all__ = ["router"]
