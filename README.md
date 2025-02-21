# AI-IMAGE-GEN

## 概要

AI-IMAGE-GEN は画像生成 AI を用いて画像を生成するアプリケーションです。
生成した画像はデフォルトでローカルに保存され、その中で気に入った画像を Supabase にアップロードすることができます。

## デモ画像

![demo](/images/demo.png)

## 環境構築

### back

1. `back`ディレクトリで以下のコマンドを実行し、依存パッケージをインストールする

   ```bash
   uv sync
   ```

2. `back`ディレクトリで、以下の環境変数ファイル`back/.envrc`を作成する

   ```
   export SUPABASE_URL=xxxxxx
   export SUPABASE_KEY=xxxxxx
   export BUCKET_NAME=xxxxxx
   ```

3. `back`ディレクトリで以下のコマンドを実行し、開発サーバーを立ち上げる
   ```bash
   make dev
   ```

### front

4. `front`で使用する Node.js と Yarn のバージョンを設定する

   ```bash
   # 初回（package.jsonへ固定）
   volta pin node@20.15.0
   volta pin yarn@4.3.1

   # 以降（package.jsonから指定）
   volta install node
   volta install yarn
   ```

5. `front`ディレクトリで以下のコマンドを実行し、依存パッケージをインストールする

   ```bash
   yarn
   ```

6. `front`ディレクトリで、以下の環境変数ファイル`front/.env.local`を作成する

   ```
   NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
   ```

7. `front`ディレクトリで以下のコマンドを実行し、開発サーバーを立ち上げる

   ```bash
   yarn dev
   ```

8. [http://localhost:3000](http://localhost:3000)へアクセスしてページが表示されれば OK
