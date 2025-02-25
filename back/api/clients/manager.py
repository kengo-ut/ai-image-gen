import torch
from config import Config
from diffusers import StableDiffusionPipeline
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams
from supabase import create_client
from transformers import CLIPModel, CLIPProcessor


class ClientManager:
    def __init__(self):
        # Stable Diffusionモデルのセットアップ
        self.pipe = StableDiffusionPipeline.from_pretrained(Config.SD_MODEL_PATH).to(
            Config.DEVICE
        )

        # CLIPモデルのセットアップ
        self.clip_model = CLIPModel.from_pretrained(Config.CLIP_MODEL_PATH).to(
            Config.DEVICE
        )
        self.clip_processor = CLIPProcessor.from_pretrained(Config.CLIP_MODEL_PATH)

        # Supabaseクライアントのセットアップ
        self.supabase = create_client(Config.SUPABASE_URL, Config.SUPABASE_KEY)

        # Qdrantクライアントのセットアップ
        self.qdrant = QdrantClient(path=Config.QDRANT_DB_PATH)
        self._init_collection()

    def _init_collection(self):
        """コレクションの初期化（存在しなければ作成）"""
        collection_names = [
            collection.name for collection in self.qdrant.get_collections().collections
        ]

        if Config.COLLECTION_NAME not in collection_names:
            self.qdrant.create_collection(
                collection_name=Config.COLLECTION_NAME,
                vectors_config={
                    "image": VectorParams(
                        size=Config.EMBEDDING_DIM, distance=Distance.COSINE
                    ),
                    "text": VectorParams(
                        size=Config.EMBEDDING_DIM, distance=Distance.COSINE
                    ),
                },
            )


# シングルトンとしてクライアントマネージャーをエクスポート
client_manager = ClientManager()
