# front

## 環境構築

### パッケージマネージャーのインストール

[Volta](https://volta.sh/) を使用して Node.js と Yarn をインストールする

```bash
volta install node
volta install yarn
```

### パッケージインストール

```bash
yarn
```

### 環境変数

環境変数ファイル`.env.local`を作成し、以下の環境変数を設定する (xxxxx は適切な内容に置き換える)

```
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
NEXT_PUBLIC_IMAGE_BASE_URL=xxxxx
```

### 開発サーバーの立ち上げ

```bash
yarn dev
```
