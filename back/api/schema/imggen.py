from pydantic import BaseModel, Field


class ImagePrompt(BaseModel):
    prompt: str = Field(..., description="Prompt for image generation")
    steps: int = Field(50, description="Number of steps for diffusion")
    guidance_scale: float = Field(7.5, description="Guidance scale for diffusion")


class ImagePath(BaseModel):
    image_path: str = Field(..., description="Path to image")


class ImagePaths(BaseModel):
    image_paths: list[str] = Field(..., description="List of image paths")
