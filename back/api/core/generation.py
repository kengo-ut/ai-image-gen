from clients import client_manager
from PIL import Image


class ImageGenerationService:
    @staticmethod
    def generate_image(prompt: str, steps: int) -> Image.Image:
        """Stable Diffusionで画像を生成"""
        image = client_manager.pipe(
            prompt, num_inference_steps=steps, guidance_scale=0.0
        ).images[0]
        return image
