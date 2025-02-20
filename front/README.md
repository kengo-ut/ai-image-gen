# Next.js Template

Next.js によるフロントエンド開発のためのテンプレートです

## 環境構築

### パッケージマネージャーのインストール

- [Volta](https://volta.sh/) を使用して Node.js と Yarn のバージョンを管理する

```bash
# 初回（package.jsonへ固定）
volta pin node@20.15.0
volta pin yarn@4.3.1

# 以降（package.jsonから指定）
volta install node
volta install yarn
```

### パッケージインストール

```bash
yarn
```

### Schema・APIクライアントの生成

```bash
cd ../back
uv run python openapi.py > openapi.json
cd ../front
yarn gen
```

### ESLint

- 加えたいルールを`eslint.config.mjs`に記載する

### VSCode

- 以下の設定を`.vscode/settings.json`に記載する

```json
{
  "npm.packageManager": "yarn",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.codeActionsOnSave": {
    "source.addMissingImports": "explicit"
  },
  "javascript.preferences.importModuleSpecifier": "non-relative",
  "typescript.preferences.importModuleSpecifier": "non-relative"
}
```

### 環境変数

- 必要な環境変数を`.env.local`に記載する

### 開発サーバーの立ち上げ

```bash
yarn dev
```

## デプロイ

- `next.config.ts`を以下のように修正

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
```

## TODO

- testの実装 (vitest)
- authの実装
- deployの実装 (Vercel)
- CI/CDの実装 (GitHub Actions)
