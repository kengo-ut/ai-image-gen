from io import BytesIO

from core import ImageService
from fastapi import APIRouter, HTTPException
from PIL import Image
from schema import (
    DeleteResponse,
    ImageGenerationParams,
    ImageSearchQuery,
    ImageUrls,
    Metadata,
)

router = APIRouter(prefix="/images", tags=["images"])


@router.post("/generate", response_model=Metadata)
async def generate_image(request: ImageGenerationParams):
    """プロンプトから画像を生成し保存する"""
    try:
        result = ImageService.generate_and_save_image(
            request.prompt, request.steps, request.guidance_scale
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/list", response_model=list[Metadata])
async def list_images():
    """保存されている全ての画像を取得する"""
    try:
        return ImageService.get_all_images()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/search", response_model=list[Metadata])
async def search_images(
    request: ImageSearchQuery,
):
    """テキストまたは画像に基づいて類似画像を検索する"""
    try:
        # 画像の場合、PILイメージに変換
        pil_image = None
        if request.image:
            contents = await request.image.read()
            pil_image = Image.open(BytesIO(contents))

        results = ImageService.search_similar_images(
            query=request.query, image=pil_image, topk=request.topk
        )
        return results
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/delete", response_model=DeleteResponse)
async def delete_images(request: ImageUrls):
    """画像を削除する"""
    try:
        for image_url in request.image_urls:
            ImageService.delete_image_data(image_url)
        return DeleteResponse(status="success", message="Images deleted successfully")
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
