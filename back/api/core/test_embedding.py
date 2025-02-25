import numpy as np
from config import Config
from core.embedding import EmbeddingService
from numpy.testing import assert_almost_equal
from PIL import Image


def test_generate_image_embedding():
    """画像の埋め込みベクトルが正規化されているかをテスト"""
    # ダミー画像を作成 (224x224 の白画像)
    dummy_image = Image.new("RGB", (224, 224), "white")

    # 埋め込みを生成
    embedding = EmbeddingService.generate_image_embedding(dummy_image)

    # 埋め込みベクトルの長さを確認 (正規化されているか)
    assert isinstance(embedding, np.ndarray), "埋め込みが numpy 配列でない"
    assert embedding.shape[0] == Config.EMBEDDING_DIM, "埋め込みの次元数が異なる"
    assert_almost_equal(np.linalg.norm(embedding), 1.0, decimal=5)


def test_generate_text_embedding():
    """テキストの埋め込みベクトルが正規化されているかをテスト"""
    dummy_text = "hello world"

    # 埋め込みを生成
    embedding = EmbeddingService.generate_text_embedding(dummy_text)

    # 埋め込みベクトルの長さを確認 (正規化されているか)
    assert isinstance(embedding, np.ndarray), "埋め込みが numpy 配列でない"
    assert embedding.shape[0] == Config.EMBEDDING_DIM, "埋め込みの次元数が異なる"
    assert_almost_equal(np.linalg.norm(embedding), 1.0, decimal=5)
