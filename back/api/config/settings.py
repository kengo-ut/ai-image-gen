import os
from pathlib import Path

import torch


class Config:
    # 環境変数
    SUPABASE_URL: str = os.environ.get("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.environ.get("SUPABASE_KEY", "")
    BUCKET_NAME: str = os.environ.get("BUCKET_NAME", "")
    TABLE_NAME: str = os.environ.get("TABLE_NAME", "")
    COLLECTION_NAME: str = os.environ.get("COLLECTION_NAME", "")

    # モデル設定
    DEVICE = "cuda" if torch.cuda.is_available() else "mps" if torch.backends.mps.is_available() else "cpu"
    EMBEDDING_DIM = 512

    # データベースパス
    QDRANT_DB_PATH = str(Path(__file__).parent.parent.parent / "data" / "qdrant.db")

    # モデルパス
    SD_MODEL_PATH = "runwayml/stable-diffusion-v1-5"
    CLIP_MODEL_PATH = "openai/clip-vit-base-patch32"
