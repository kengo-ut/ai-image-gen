import uuid
from io import BytesIO
from pathlib import Path
from typing import List, Literal

import numpy as np
from clients import client_manager
from config import Config
from fastapi import HTTPException
from PIL import Image
from qdrant_client.models import FieldCondition, Filter, MatchValue, PointStruct
from schema import Metadata


class StorageService:
    @staticmethod
    def upload_image_to_storage(image: Image.Image, filename: str):
        """画像をStorageにアップロード"""
        # BytesIOに変換
        image_bytes_io = BytesIO()
        image.save(image_bytes_io, format="PNG")
        image_bytes = image_bytes_io.getvalue()

        # 画像をStorageにアップロード
        response = client_manager.supabase.storage.from_(Config.BUCKET_NAME).upload(
            path=filename, file=image_bytes, file_options={"content-type": "image/png"}
        )

        if response is None:
            raise HTTPException(
                status_code=500, detail="Failed to upload image to storage"
            )

    @staticmethod
    def upload_metadata_to_table(image_url: str, prompt: str):
        """メタデータをTableにアップロード"""
        metadata = Metadata(image_url=image_url, prompt=prompt)

        data_response = (
            client_manager.supabase.table(Config.TABLE_NAME)
            .insert(metadata.model_dump())
            .execute()
        )
        if not data_response.data:
            raise HTTPException(
                status_code=500, detail="Failed to insert metadata to table"
            )

    @staticmethod
    def upload_point_to_search_engine(
        image_embedding: np.ndarray,
        text_embedding: np.ndarray,
        image_url: str,
        prompt: str,
    ):
        """ポイント (画像・テキストのembeddingとメタデータ)をQdrantにアップロード"""
        point = PointStruct(
            id=str(uuid.uuid4()),
            vector={"image": list(image_embedding), "text": list(text_embedding)},
            payload={"image_url": image_url, "prompt": prompt},
        )

        client_manager.qdrant.upsert(
            collection_name=Config.COLLECTION_NAME, points=[point]
        )

    @staticmethod
    def retrieve_image_url(filename: str) -> str:
        """画像のURLをStorageから取得"""
        image_url = client_manager.supabase.storage.from_(
            Config.BUCKET_NAME
        ).get_public_url(filename)
        return image_url

    @staticmethod
    def retrieve_metadata_list() -> List[Metadata]:
        """メタデータの一覧をTableから取得"""
        response = (
            client_manager.supabase.table(Config.TABLE_NAME)
            .select("*")
            .order("created_at", desc=True)
            .execute()
        )

        metadata_list = []
        for item in response.data:
            metadata = Metadata(image_url=item["image_url"], prompt=item["prompt"])
            metadata_list.append(metadata)

        return metadata_list

    @staticmethod
    def search_images(
        query_embedding: np.ndarray,
        query_type: Literal["image", "text"],
        topk: int = 3,
    ) -> List[Metadata]:
        """画像を検索"""
        results = client_manager.qdrant.query_points(
            collection_name=Config.COLLECTION_NAME,
            query=query_embedding.tolist(),
            using=query_type,
            with_payload=True,
            with_vectors=False,
            limit=topk,
        ).points

        metadata_list = []
        for result in results:
            if result is None or result.payload is None:
                raise HTTPException(status_code=404, detail="No results found")
            metadata: Metadata = Metadata(**result.payload)
            metadata_list.append(metadata)

        return metadata_list

    @staticmethod
    def delete_image(image_url: str):
        """画像をStorageから削除"""
        filename = Path(image_url).name[:-1]
        response = client_manager.supabase.storage.from_(Config.BUCKET_NAME).remove(
            [filename]
        )
        if not response:
            raise HTTPException(
                status_code=404, detail=f"URL {image_url} は存在しません"
            )

    @staticmethod
    def delete_metadata(image_url: str):
        """メタデータをTableから削除"""
        response = (
            client_manager.supabase.table(Config.TABLE_NAME)
            .delete()
            .match({"image_url": image_url})
            .execute()
        )
        if not response.data:
            raise HTTPException(
                status_code=404, detail=f"URL {image_url} は存在しません"
            )

    @staticmethod
    def delete_point(image_url: str):
        """ポイントをQdrantから削除"""
        points = client_manager.qdrant.scroll(
            collection_name=Config.COLLECTION_NAME,
            scroll_filter=Filter(
                must=[
                    FieldCondition(key="image_url", match=MatchValue(value=image_url))
                ]
            ),
            limit=1,
        )
        if not points or not points[0]:
            raise HTTPException(
                status_code=404, detail=f"URL {image_url} は存在しません"
            )

        point_id = points[0][0].id
        client_manager.qdrant.delete(
            collection_name=Config.COLLECTION_NAME, points_selector=[point_id]
        )
