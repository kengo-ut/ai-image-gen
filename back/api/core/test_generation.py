from core.generation import ImageGenerationService
from PIL import Image


def test_generate_image():
    """画像生成のテスト"""
    prompt = "a cat in a forest"
    steps = 1

    # 画像生成
    image = ImageGenerationService.generate_image(prompt, steps)

    # 画像が生成されているか
    assert isinstance(image, Image.Image), "画像が PIL イメージでない"
