# Re:Kosen

高専生向けキャリアメディア（モバイル最適化優先）。

## ドキュメント

- `REQUIREMENTS.md`：要件・KPI・ブロック仕様
- `AGENTS.md`：AIエージェント向け作業指針
- `STRAPI_MANUAL.md`：Strapi運用手順
- `DEPLOY_GUIDE.md`：デプロイ手順と環境変数

## 構成

- Frontend：Next.js（App Router） + Tailwind CSS
- CMS：Strapi（Dynamic Zone）
- Hosting：Vercel（Web） / Railway（Strapi） / Supabase（DB・Media）

## クイックスタート（Web）

1. 依存関係をインストール（npm / yarn / pnpm のいずれでも可）
2. `.env.local` を作成
3. 開発サーバーを起動

```bash
# 例: pnpm
pnpm install
pnpm dev

# 例: npm
npm install
npm run dev
```

開発サーバー起動後、`http://localhost:3000` にアクセスします。

## CMS（Strapi）

- Strapiはホスト済みの管理画面にアクセスして運用します。
- 管理画面URLは `STRAPI_URL` が分かる場合は `${STRAPI_URL}/admin` です。
- ローカルで触る場合は `cms/` を使用し、詳細は `STRAPI_MANUAL.md` と
  `DEPLOY_GUIDE.md` を参照してください。

## 環境変数（例）

| 変数名 | 用途 |
| --- | --- |
| `STRAPI_URL` | StrapiのベースURL（`/api` なし） |
| `STRAPI_API_TOKEN` | Strapi API Token |
| `STRAPI_REVALIDATE_SECONDS` | ISRの再生成間隔（任意、既定300） |
| `NEXT_PUBLIC_SITE_URL` | サイトURL |
| `NEXT_PUBLIC_MEDIA_URL` | 画像配信URL |
| `NEXT_PUBLIC_GOOGLE_FORM_URL` | `/contact` のGoogle Forms URL |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 測定ID |
| `PREVIEW_SECRET` | Strapiプレビュー用 |

## 主要スクリプト

- `dev`：開発サーバー起動
- `build`：本番ビルド
- `start`：本番起動
- `lint`：Lint

## リポジトリ構成

- `src/`：Next.js アプリケーション
- `cms/`：Strapi プロジェクト
- `public/`：静的アセット
- `Pencil/`：デザイン資産
