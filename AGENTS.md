# AGENTS.md（v0.1 / ドラフト） — Re:Kosen

> 本ドキュメントは、Gemini CLI / Codex などの **AIコーディングエージェント向け作業指針** です。
> 不明点は推測で埋めず、必ず {{TODO: 未確定}} として残し、ユーザーとの対話で解決してください。

---

## 0. プロジェクト概要

* プロジェクト名：Re:Kosen
* プロダクト種別：高専生向けキャリアメディア（モバイル最適化優先）
* 技術スタック：

  * Frontend：Next.js（App Router 想定） + Tailwind CSS
  * CMS：Strapi（Dynamic Zone によるブロック編集）
  * Hosting：Vercel（Next.js） / Railway（Strapi） / Supabase（DB・Media）

## 1. 目的（MVP）

* SEO流入 → 記事回遊 → 問い合わせ / 登録（LINE）への導線を成立させる
* 非エンジニアでも安全に「リッチ記事」を量産できる編集体験を実現
* モバイルで“読みやすい”記事体験を最優先する

## 2. 非ゴール（初期）

* 求人応募・応募管理
* 学生会員ログイン
* 課金
* マッチング（スカウト等）
* 掲載審査フローの完全自動化（運用でカバー）

## 3. 主要ルーティング

* `/` トップ
* `/industry` / `/company` / `/career`（カテゴリ一覧）
* `/articles/[slug]`（記事詳細）
* `/tag/[slug]`（タグ一覧）
* `/search?q=`（検索）
* `/about` / `/contact` / `/privacy`

## 4. コンテンツモデル（Strapi）

### Article（必須）

* title / slug（uid, unique） / category
* excerpt（必須）
* tags（必須：1つ以上）
* status（draft / review / published / archived）
* seo component（metaTitle / metaDescription / ogImage / canonical / noindex）
* blocks（Dynamic Zone, 必須）
* optional：coverImage / author / manualRelatedArticles / featured

**バリデーション要件**

* tags は必須
* excerpt は空禁止
* Image ブロックの alt は必須
* Summary Card ブロックを最低1つ含める（運用 or カスタム検証）

### Tag

* name / slug / tagType / priority
* Tag 作成は管理者のみ（表記ゆれ防止）

### Page

* title / slug / seo / blocks

## 5. ブロックレンダリング（Frontend）

MVP 対象ブロック（9種）：

* Heading（H2/H3/H4）※H2/H3は目次生成対象
* RichText（太字/リンク/箇条書き/引用/改行のみ許可）
* Summary Card（記事冒頭に表示、最重要）
* Callout（info / warn / tip）
* ProsCons（モバイル縦積み、PCは2カラム可）
* Comparison Table（モバイル横スクロール必須）
* Link Cards（internal / external、OGP自動取得なし）
* CTA（記事中盤 + 末尾）
* Image（alt必須）

## 6. 検索・関連記事ロジック

### 検索（MVP）

* 対象：title / excerpt / blocks の plain text
* 並び順：関連度 + 新着補正
* UI：ヘッダー常設（モバイルはアイコン → 展開）

### 関連記事（MVP）

* スコアリング：

  * 同カテゴリ +3
  * タグ一致 +2（最大3タグ）
  * featured +1（任意）
  * 30日以内更新 +1
* 上位6件を表示
* manualRelatedArticles がある場合は先頭固定

## 7. UX 原則（モバイル最優先）

* 基本 1カラム、可読性最優先
* 追従 CTA は初期では使わない（もしくは最小）
* 目次は折りたたみ式、記事冒頭に1回のみ表示
* タップ領域は約 44px を目安
* 表は必ず横スクロール対応、行間を詰めすぎない

## 8. コンバージョン導線

* 登録：LINE

  * LINE公式アカウントURLは接続済み（実値はコード/Strapi設定に準拠）
  * 計測：LINE公式アカウントのWebアプリ
* 問い合わせ：Google Forms

  * `/contact` はGoogle Formsに接続（`NEXT_PUBLIC_GOOGLE_FORM_URL`）

## 9. 計測・SEO運用

* Google Analytics / Search Console 導入
* sitemap / robots.txt 生成
* 記事ごとに OGP 設定

## 10. AIエージェント作業ルール（重要）

### ❌ 禁止事項

* 破壊的コマンドを **自動実行しない**

  * 例：`rm -rf`、DB削除、依存関係の無断アップデート 等
* 環境変数・秘密情報をログやリポジトリに出力しない
* DBマイグレーションや権限変更を独断で行わない

### ✅ 必須行動

* 変更は小さく、目的・差分・影響範囲を明示
* 仕様が曖昧な場合は {{TODO}} を残して質問する（最大5つ）
* XSS 対策（RichText の許可タグ制限）を最優先
* 常にモバイル表示を確認（特に目次・表・CTA）

## 11. MVP マイルストーン（目安）

1. Strapi：モデル / コンポーネント / Dynamic Zone / 権限 / バリデーション
2. Next.js：ルーティング / 一覧・詳細 / ブロックレンダラー / 目次 / 関連記事
3. 検索：簡易全文検索 + UI
4. SEO：メタ情報 / OGP / sitemap / robots
5. 導線：LINE 登録 / Google Forms 問い合わせ
6. 仕上げ：モバイルUI / 表スクロール / アクセシビリティ

## 12. 未確定事項（対話で解消）

* {{TODO: 検索の実装担当（Strapi側 or Next側）}}
