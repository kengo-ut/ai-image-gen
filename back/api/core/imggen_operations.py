import os
from pathlib import Path

import torch
from diffusers import StableDiffusionPipeline
from fastapi import HTTPException
from PIL.Image import Image
from supabase import Client, create_client

SUPABASE_URL: str = os.environ.get("SUPABASE_URL", "")
SUPABASE_KEY: str = os.environ.get("SUPABASE_KEY", "")
BUCKET_NAME: str = os.environ.get("BUCKET_NAME", "")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Stable Diffusionのロード
device = "mps" if torch.backends.mps.is_available() else "cpu"
pipe = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5").to(
    device
)

# 画像保存ディレクトリ
IMAGE_DIR = Path(__file__).parent.parent.parent.parent / "front" / "public" / "temp"
IMAGE_DIR.mkdir(parents=True, exist_ok=True)


# 画像の生成
def generate_image(prompt: str, steps: int, guidance_scale: float) -> Image:
    """画像の生成"""
    image = pipe(
        prompt, num_inference_steps=steps, guidance_scale=guidance_scale
    ).images[0]
    return image


# 画像の一時保存
def save_image(image: Image, filename: str) -> str:
    filepath = IMAGE_DIR / filename
    image.save(filepath)
    return f"/temp/{filename}"


# 画像パスの取得
def retrieve_image_paths() -> list[str]:
    return [f"/temp/{path.name}" for path in IMAGE_DIR.iterdir()]


# 画像の削除
def delete_images(file_paths: list[str]):
    for file_path in file_paths:
        delete_file_path = IMAGE_DIR / Path(file_path).name
        delete_file_path.unlink(missing_ok=True)


# 画像のアップロード
def upload_images(file_paths: list[str]):
    for file_path in file_paths:
        upload_file_path = IMAGE_DIR / Path(file_path).name
        response = None
        with open(upload_file_path, "rb") as file:
            response = supabase.storage.from_(BUCKET_NAME).upload(
                upload_file_path.name, file
            )

        if response is None:
            raise HTTPException(status_code=500, detail="Failed to upload image.")
