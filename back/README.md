# BACK

## 環境構築

### パッケージインストール

```bash
uv sync
```

### データ配置

- `back/data/`配下に Qdrant のデータベースが配置される

```bash
data
└── qdrant.db
    ├── collection
    │   └── image-text-embeddings
    │       └── storage.sqlite
    └── meta.json
```

### 環境変数設定

- `direnv`を使用して`.envrc`ファイルを作成し、以下の環境変数を設定する

```bash
# Supabase
export SUPABASE_URL=xxxxx
export SUPABASE_KEY=xxxxx
export BUCKET_NAME=xxxxx
export TABLE_NAME=xxxxx

# Qdrant
export COLLECTION_NAME=xxxxx

# Python
export PYTHONPATH=xxxxx
```

### 開発サーバーの立ち上げ

```bash
. .venv/bin/activate
make dev
```

```bash
# Swagger UIの確認
# ブラウザで`http://127.0.0.1:8000/docs`にアクセス
```

## TODO

- test の実装 (pytest / unittest)
- エラーハンドリングの実装
