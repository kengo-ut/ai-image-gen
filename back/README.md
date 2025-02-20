# FastAPI Template

FastAPI によるバックエンド開発のためのテンプレートです

## 環境構築

### パッケージインストール

```bash
uv sync
```

### データ配置

- `back/data/`配下に必要なデータを配置する

### 環境変数設定

- `direnv`を使用して`.envrc`ファイルを作成し、必要な環境変数を設定する

### 開発サーバーの立ち上げ

```bash
make dev
```

```bash
# Swagger UIの確認
# ブラウザで`http://127.0.0.1:8000/docs`にアクセス
```
