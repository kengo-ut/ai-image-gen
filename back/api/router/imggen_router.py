import uuid

from fastapi import APIRouter

from api.core.imggen_operations import (
    delete_images,
    generate_image,
    retrieve_image_paths,
    save_image,
    upload_images,
)
from api.schema import ImagePath, ImagePaths, ImagePrompt

imggen_router = APIRouter(prefix="/imggen")


@imggen_router.post("/generate", response_model=ImagePath)
async def generate(request: ImagePrompt):
    filename = f"{uuid.uuid4().hex}.png"
    image = generate_image(request.prompt, request.steps, request.guidance_scale)
    image_path = save_image(image, filename)

    return {"image_path": image_path}


@imggen_router.get("/retrieve", response_model=ImagePaths)
async def retrieve():
    image_paths = retrieve_image_paths()
    return {"image_paths": image_paths}


@imggen_router.post("/delete", response_model=None)
async def delete(request: ImagePaths):
    delete_images(request.image_paths)
    return None


@imggen_router.post("/upload", response_model=None)
async def upload(request: ImagePaths):
    upload_images(request.image_paths)
    return None
