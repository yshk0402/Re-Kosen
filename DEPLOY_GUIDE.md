# Re:Kosen デプロイ手順書

このドキュメントでは、Re:Kosenを本番環境にデプロイするための手順をステップバイステップで説明します。

---

## 事前準備

以下のアカウントを作成しておいてください：
- [ ] [GitHub](https://github.com/) アカウント（リポジトリをプッシュ済み）
- [ ] [Supabase](https://supabase.com/) アカウント
- [ ] [Railway](https://railway.app/) アカウント
- [ ] [Vercel](https://vercel.com/) アカウント
- [ ] [Google](https://google.com/) アカウント（GA4・Form用）

---

## Step 1: Supabase でデータベースを作成（5分）

### 1.1 プロジェクト作成
1. [Supabase Dashboard](https://supabase.com/dashboard) にログイン
2. 「New Project」をクリック
3. 以下を入力：
   - **Name**: `re-kosen`
   - **Database Password**: 強力なパスワードを設定（メモしておく！）
   - **Region**: `Northeast Asia (Tokyo)` を選択
4. 「Create new project」をクリック
5. 作成完了まで約2分待つ

### 1.2 接続文字列を取得
1. プロジェクトが作成されたら、ダッシュボード上部の **「Connect」ボタン** をクリック
2. 「Connection String」セクションで **「URI」** タブを選択
3. **「Transaction」** モード（Session pooler）を選択（Strapiにはこちらを推奨）
4. 接続文字列をコピー
5. `[YOUR-PASSWORD]` の部分を、Step 1.1 で設定したパスワードに置き換えてメモ

> **💡 ヒント**: 「Connect」ボタンが見つからない場合は、左メニュー「Project Settings」→「Database」→「Connection string」からも取得できます。

```
例: postgresql://postgres.xxxxx:MyPassword123@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres
```

---

## Step 2: Railway で Strapi をデプロイ（15分）

### 2.1 プロジェクト作成
1. [Railway](https://railway.app/) にGitHubでログイン
2. 「New Project」→「Deploy from GitHub repo」
3. リポジトリ `Re-Kosen` を選択
4. **Root Directory** に `cms` と入力
5. 「Deploy」をクリック（まだ失敗するが正常）

### 2.2 環境変数を設定
1. デプロイされたサービスをクリック
2. 「Variables」タブを開く
3. 以下の環境変数を追加：

| 変数名 | 値 | 説明 |
|--------|-----|------|
| `DATABASE_CLIENT` | `postgres` | 固定値 |
| `DATABASE_URL` | `postgresql://...` | Step 1.2でコピーした接続文字列 |
| `APP_KEYS` | ランダム文字列 | [生成ツール](https://generate-secret.vercel.app/32),で2つ生成してカンマ区切り |
| `API_TOKEN_SALT` | ランダム文字列 | [生成ツール](https://generate-secret.vercel.app/32) |
| `ADMIN_JWT_SECRET` | ランダム文字列 | [生成ツール](https://generate-secret.vercel.app/32) |
| `JWT_SECRET` | ランダム文字列 | [生成ツール](https://generate-secret.vercel.app/32) |
| `PREVIEW_URL` | VercelのURL | `https://re-kosen.vercel.app` |
| `PREVIEW_SECRET` | ランダム文字列 | [生成ツール](https://generate-secret.vercel.app/32) |
| `NODE_ENV` | `production` | 固定値 |

### 2.3 デプロイを確認
1. 「Deployments」タブでデプロイ状況を確認
2. 成功したら「Settings」→「Networking」→「Generate Domain」
3. 生成されたURL（例: `re-kosen-cms.up.railway.app`）をメモ

### 2.4 Strapi 管理者アカウント作成
1. 生成されたURL + `/admin` にアクセス
   - 例: `https://re-kosen-cms.up.railway.app/admin`
2. 管理者アカウント情報を入力して登録
3. ログイン成功を確認

### 2.5 API トークンを作成
1. Strapi管理画面で「Settings」→「API Tokens」
2. 「Create new API Token」をクリック
3. 以下を入力：
   - **Name**: `Frontend`
   - **Token type**: `Full access`
4. 「Save」をクリック
5. 表示されたトークンをコピー（**一度しか表示されない！**）

---

## Step 3: Vercel で Next.js をデプロイ（10分）

### 3.1 プロジェクト作成
1. [Vercel](https://vercel.com/) にGitHubでログイン
2. 「Add New...」→「Project」
3. リポジトリ `Re-Kosen` を選択
4. 以下を設定：
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `.`（変更不要）

### 3.2 環境変数を設定
「Environment Variables」セクションで以下を追加：

| 変数名 | 値 | 例 |
|--------|-----|-----|
| `STRAPI_URL` | RailwayのURL | `https://re-kosen-cms.up.railway.app` |
| `STRAPI_API_TOKEN` | Step 2.5で作成したトークン | `xxxxxx...` |
| `NEXT_PUBLIC_SITE_URL` | VercelのURL（後で更新可） | `https://re-kosen.vercel.app` |
| `PREVIEW_SECRET` | Strapiと同じ値 | `xxxxxx...` |

### 3.3 デプロイ
1. 「Deploy」をクリック
2. 2-3分待ってデプロイ完了を確認
3. 生成されたURL（例: `re-kosen.vercel.app`）にアクセス

### 3.4 サイトURLを更新（任意）
カスタムドメインを使う場合：
1. Vercel「Settings」→「Domains」
2. ドメインを追加
3. DNS設定を更新
4. 環境変数 `NEXT_PUBLIC_SITE_URL` を更新

---

## Step 4: Google Form を作成（5分）

### 4.1 フォーム作成
1. [Google Forms](https://forms.google.com/) にアクセス
2. 「空白」で新規フォーム作成
3. タイトル：「Re:Kosen お問い合わせ」
4. 質問を追加：
   - お名前（短い回答）
   - メールアドレス（短い回答）
   - 所属（高専生/企業/その他）（ラジオボタン）
   - お問い合わせ内容（段落）
5. 右上「送信」→「リンク」→URLをコピー

### 4.2 Vercel に環境変数追加
1. Vercel「Settings」→「Environment Variables」
2. 追加：
   - `NEXT_PUBLIC_GOOGLE_FORM_URL` = コピーしたURL
3. 「Redeploy」で反映

---

## Step 5: Google Analytics 4 を設定（10分）

### 5.1 GA4 プロパティ作成
1. [Google Analytics](https://analytics.google.com/) にアクセス
2. 「管理」→「プロパティを作成」
3. プロパティ名：`Re:Kosen`
4. レポートのタイムゾーン：日本
5. 通貨：日本円

### 5.2 データストリーム作成
1. 「データストリーム」→「ウェブ」
2. ウェブサイトURL：VercelのURL
3. ストリーム名：`Re:Kosen Web`
4. 「作成」をクリック
5. **測定ID**（`G-XXXXXXXXXX`形式）をコピー

### 5.3 Vercel に環境変数追加
1. Vercel「Settings」→「Environment Variables」
2. 追加：
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` = 測定ID
3. 「Redeploy」で反映

---

## Step 6: Google Search Console に登録（5分）

### 6.1 プロパティ追加
1. [Search Console](https://search.google.com/search-console) にアクセス
2. 「プロパティを追加」
3. 「URLプレフィックス」を選択
4. VercelのURL（例: `https://re-kosen.vercel.app`）を入力

### 6.2 所有権確認
1. 「HTMLタグ」方式を選択
2. メタタグをコピー（`<meta name="google-site-verification" content="xxxxx" />`）
3. **layout.tsx** の `<head>` に追加するか、Vercelの「Settings」→「General」→「Custom Meta Tags」で設定
4. 「確認」をクリック

### 6.3 サイトマップを送信
1. 左メニュー「サイトマップ」
2. URL入力欄に `sitemap.xml` と入力
3. 「送信」をクリック

---

## Step 7: テスト記事を作成（10分）

### 7.1 Strapi で記事作成
1. Strapi管理画面（`https://xxx.railway.app/admin`）にログイン
2. 左メニュー「Content Manager」→「Article」
3. 「Create new entry」をクリック
4. 以下を入力：
   - **title**: テスト記事タイトル
   - **slug**: `test-article`
   - **category**: `industry`
   - **excerpt**: 記事の概要
   - **stats**: `published`
   - **tags**: 1つ以上選択（なければTagで先に作成）
   - **blocks**: Summary Card + Heading + RichText を追加
5. 「Save」をクリック

### 7.2 フロントエンドで確認
1. VercelのURL + `/articles/test-article` にアクセス
2. 記事が正しく表示されることを確認

---

## 完了チェックリスト

- [ ] Supabase: データベース作成完了
- [ ] Railway: Strapi デプロイ完了
- [ ] Railway: 管理者アカウント作成完了
- [ ] Vercel: Next.js デプロイ完了
- [ ] Vercel: 環境変数設定完了
- [ ] Google Form: 作成・連携完了
- [ ] GA4: 設定・連携完了
- [ ] Search Console: 登録・サイトマップ送信完了
- [ ] テスト記事: 作成・表示確認完了

---

## トラブルシューティング

### Strapi にアクセスできない
- Railway の Logs を確認
- 環境変数が正しく設定されているか確認
- `DATABASE_URL` のパスワード部分が正しいか確認

### 記事が表示されない
- Strapi で記事の `stats` が `published` になっているか確認
- Vercel の環境変数 `STRAPI_URL` と `STRAPI_API_TOKEN` が正しいか確認
- Vercel を Redeploy してキャッシュをクリア

### GA4 でデータが見えない
- 計測ID が正しく設定されているか確認
- ブラウザの広告ブロッカーを無効化
- リアルタイムレポートで確認（反映に数分かかる）

---

## 質問があれば

デプロイ中に問題が発生した場合は、エラーメッセージと一緒に質問してください！
