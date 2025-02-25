import numpy as np
import torch
from clients import client_manager
from PIL import Image


class EmbeddingService:
    @staticmethod
    def generate_image_embedding(image: Image.Image) -> np.ndarray:
        """画像の埋め込みベクトルを生成"""
        with torch.no_grad():
            inputs = client_manager.clip_processor(
                images=image, return_tensors="pt"
            ).to(client_manager.clip_model.device)
            outputs = client_manager.clip_model.get_image_features(**inputs)
            image_embedding = outputs.cpu().numpy()
            return image_embedding[0] / np.linalg.norm(image_embedding[0])

    @staticmethod
    def generate_text_embedding(text: str) -> np.ndarray:
        """テキストの埋め込みベクトルを生成"""
        with torch.no_grad():
            inputs = client_manager.clip_processor(
                text=[text], return_tensors="pt", padding=True, truncation=True
            ).to(client_manager.clip_model.device)
            outputs = client_manager.clip_model.get_text_features(**inputs)
            text_embedding = outputs.cpu().numpy()
            return text_embedding[0] / np.linalg.norm(text_embedding[0])
