# back

## 環境構築

### パッケージインストール

```bash
uv sync
```

### 環境変数設定

- `direnv`を使用して`.envrc`ファイルを作成し、以下の環境変数を設定する (xxxxx は適切な内容に置き換える)

```
# Supabase
export SUPABASE_URL=xxxxx
export SUPABASE_KEY=xxxxx
export BUCKET_NAME=xxxxx
export TABLE_NAME=xxxxx

# Qdrant
export COLLECTION_NAME=xxxxx

# Python
export PYTHONPATH=xxxxx/ai-image-gen/back/api
```

### 開発サーバーの立ち上げ

```bash
make dev
```

```bash
# Swagger UIの確認
# ブラウザで`http://127.0.0.1:8000/docs`にアクセス
```
