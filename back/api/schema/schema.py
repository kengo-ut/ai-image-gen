from fastapi import File, Form, UploadFile
from pydantic import BaseModel, Field


class ImageGenerationParams(BaseModel):
    prompt: str = Field(..., description="Prompt for image generation")
    steps: int = Field(..., description="Number of steps for diffusion")
    guidance_scale: float = Field(..., description="Guidance scale for diffusion")


class Metadata(BaseModel):
    image_url: str = Field(..., description="URL of the image")
    prompt: str = Field(..., description="Text prompt for the image")


class ImageSearchQuery(BaseModel):
    query: str | None = Field(None, description="Text query for image search")
    image: UploadFile | None = Field(None, description="Image file for image search")
    topk: int = Field(3, description="Number of similar images to return")


class ImageUrls(BaseModel):
    image_urls: list[str] = Field(..., description="URLs of the images")


class Payload(Metadata):
    pass


class DeleteResponse(BaseModel):
    status: str = Field(..., description="Status of the deletion")
    message: str = Field(..., description="Message describing the status")
