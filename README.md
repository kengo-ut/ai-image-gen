# Fullstack-Template

Next.js と FastAPI によるフルスタック開発のためのテンプレートです (Health Status Checker が含まれています)

## デモ画像

![demo](/images/health_status_checker.png)

## 環境構築

### back

1. `back/.envrc`ファイルを作成し、必要な環境変数を設定する

2. `back/data/`配下に必要なデータを配置する

3. `back`ディレクトリで以下のコマンドを実行し、依存パッケージをインストールする

   ```bash
   uv sync
   ```

4. `back`ディレクトリで以下のコマンドを実行し、開発サーバーを立ち上げる
   ```bash
   make dev
   ```

### front

5. `front`で使用する Node.js と Yarn のバージョンを設定する

   ```bash
   # 初回（package.jsonへ固定）
   volta pin node@20.15.0
   volta pin yarn@4.3.1

   # 以降（package.jsonから指定）
   volta install node
   volta install yarn
   ```

6. `front`ディレクトリで以下のコマンドを実行し、依存パッケージをインストールする

   ```bash
   yarn
   ```

7. `front`ディレクトリで以下のコマンドを実行し、Schema・API クライアントを生成

   ```bash
   yarn gen
   ```

8. `front`ディレクトリで、以下の環境変数ファイル`front/.env.local`を作成する

   ```
   NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
   ```

9. `front`ディレクトリで以下のコマンドを実行し、開発サーバーを立ち上げる

   ```bash
   yarn dev
   ```

10. [http://localhost:3000](http://localhost:3000)へアクセスしてページが表示されれば OK
