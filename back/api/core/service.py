import uuid

from core.embedding import EmbeddingService
from core.generation import ImageGenerationService
from core.storage import StorageService
from PIL import Image
from schema import Metadata


class ImageService:
    """画像生成・検索・管理のためのメインサービスクラス"""

    @staticmethod
    def generate_and_save_image(
        prompt: str, steps: int = 30, guidance_scale: float = 7.5
    ) -> Metadata:
        """画像を生成し、保存する"""
        # 画像生成
        image = ImageGenerationService.generate_image(prompt, steps, guidance_scale)

        # 埋め込み生成
        image_embedding = EmbeddingService.generate_image_embedding(image)
        text_embedding = EmbeddingService.generate_text_embedding(prompt)

        # ファイル名生成
        filename = f"{uuid.uuid4()}.png"

        # 画像をStorageにアップロード
        StorageService.upload_image_to_storage(image, filename)

        # 画像URLの取得
        image_url = StorageService.retrieve_image_url(filename)

        # メタデータをTableにアップロード
        StorageService.upload_metadata_to_table(image_url, prompt)

        # ポイントをQdrantにアップロード
        StorageService.upload_point_to_search_engine(
            image_embedding, text_embedding, image_url, prompt
        )

        response = Metadata(image_url=image_url, prompt=prompt)
        return response

    @staticmethod
    def get_all_images() -> list[Metadata]:
        """保存されている全ての画像のメタデータを取得"""
        metadata_list = StorageService.retrieve_metadata_list()
        return metadata_list

    @staticmethod
    def search_similar_images(
        query: str | None = None,
        image: Image.Image | None = None,
        is_cross_modal: bool = False,
        topk: int = 5,
    ) -> list[Metadata]:
        """テキストまたは画像に基づいて類似画像を検索"""
        if query and image:
            raise ValueError("query と image は同時に指定できません")

        query_embedding = None
        query_type = None
        if query:
            query_embedding = EmbeddingService.generate_text_embedding(query)
            query_type = "text"
        elif image:
            query_embedding = EmbeddingService.generate_image_embedding(image)
            query_type = "image"
        else:
            raise ValueError("query または image を指定してください")

        metadata_list = StorageService.search_images(
            query_embedding, query_type, is_cross_modal, topk
        )
        return metadata_list

    @staticmethod
    def delete_image_data(image_url: str):
        """画像、メタデータ、検索ポイントを削除"""
        StorageService.delete_image(image_url)
        StorageService.delete_metadata(image_url)
        StorageService.delete_point(image_url)
