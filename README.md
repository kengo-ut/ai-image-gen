# AI-IMAGE-GEN

## 概要

AI-IMAGE-GEN は、AI 技術を活用して画像を生成するアプリケーションです。このアプリケーションを使用すると、ユーザーは独自の画像を簡単に作成し、管理することができます。

特徴

- 画像生成: 拡散モデルを使用して、テキストプロンプト元にユニークな画像を生成します。
- ストレージ管理: 生成した画像は、デフォルトで Supabase のストレージに安全に保存されます。これにより、ユーザーはいつでも画像にアクセスできます。
- 画像操作: ユーザーは、選択した画像を削除したり、ダウンロードしたりすることができるため、簡単に画像を管理できます。
- 画像検索: テキストや画像を元に、関連する画像を検索することができます。この機能を使用することで、目的の画像を迅速に見つけることが可能です。

使い方

1. 画像を生成する: テキストプロンプトを入力して`Generate`ボタンをクリックすると、AI が画像を生成します。
2. 生成された画像の管理: 生成された画像は Supabase ストレージに保存され、ギャラリーで表示されます。画像を選択し、削除またはダウンロードすることができます。
3. 画像検索: 検索バーにテキストを入力するか、画像をアップロードして`Search`ボタンをクリックすると関連する画像を検索します。

技術スタック

- フロントエンド: Next.js
- バックエンド: FastAPI
- ストレージ: Supabase (生成) / Qdrant (検索)

注意

- 本プロジェクトは Supabase のセットアップを前提としています。
- メタデータを保存するためのテーブルと、画像を保存するためのバケットを作成してください。
- テーブルのスキーマは以下の通りです。

  | カラム名   | データ型  | 制約        |
  | ---------- | --------- | ----------- |
  | id         | UUID      | PRIMARY KEY |
  | image_url  | TEXT      |             |
  | prompt     | TEXT      |             |
  | created_at | TIMESTAMP | NOT NULL    |

- Policy は適宜設定してください。

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
   NEXT_PUBLIC_IMAGE_BASE_URL=xxxxx
   ```

7. `front`ディレクトリで以下のコマンドを実行し、開発サーバーを立ち上げる

   ```bash
   yarn dev
   ```

8. [http://localhost:3000](http://localhost:3000)へアクセスしてページが表示されれば OK
