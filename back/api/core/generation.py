import torch
from clients import client_manager
from PIL import Image


class ImageGenerationService:
    @staticmethod
    def generate_image(prompt: str, steps: int, guidance_scale: float) -> Image.Image:
        """Stable Diffusionで画像を生成"""
        image = client_manager.pipe(
            prompt,
            height=1024,
            width=1024,
            num_inference_steps=steps,
            guidance_scale=guidance_scale,
            max_sequence_length=512,
            generator=torch.Generator("cpu").manual_seed(0),
        ).images[0]
        return image
