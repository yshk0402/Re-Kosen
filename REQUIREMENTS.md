# Re:Kosen — REQUIREMENTS.md（ドラフト）

> 本ドキュメントは要件のラフ版です。不明点は {{TODO: 未確定}} として残します。

## 1. 概要

* プロジェクト名：**Re:Kosen**
* 種別：高専生向けキャリアメディア（モバイル最適化優先）
* 構成：Strapi（CMS） + Next.js（Web）
* 目的：

  * 高専生が「何を選べばいいか」を判断できる情報構造を提供
  * SEO流入 → 回遊 → 問い合わせ/登録へ接続する導線
  * 非エンジニアでも安全にリッチ記事を量産できる運用

## 2. 目的・KPI・非ゴール

### 2.1 KPI（MVP〜初期）

* SEO：Search Console で主要クエリの表示回数増加
* 行動：記事→関連記事回遊率、滞在時間
* CV：

  * 問い合わせクリック（**メール**）
  * CTAクリック
  * 登録（**LINE**）

### 2.2 非ゴール（初期）

* 求人応募・応募管理
* 学生会員ログイン
* 課金
* マッチング（スカウト等）
* 掲載審査ワークフローの完全自動化（運用でカバー）

## 3. 対象ユーザー

* 主：高専生
* 影響者：教授・職員
* 潜在顧客：企業（高専向け言い回し/採用広報の学習→問い合わせ）

## 4. サイト構造（ルーティング）

* `/` トップ
* `/industry` 業界研究一覧
* `/company` 企業研究一覧
* `/career` キャリア設計一覧
* `/articles/[slug]` 記事詳細（カテゴリで見た目を出し分け）
* `/tag/[slug]` タグ一覧
* `/search?q=` 検索
* `/about` `/contact` `/privacy`

## 5. SEO 方針

* カテゴリ一覧・タグ一覧はインデックス対象
* 低品質タグ（件数少/重複）は Phase2 で noindex 検討
* 記事ごとに OGP / canonical / noindex を制御可能にする
* sitemap / robots を生成

## 6. フロント要件（モバイル最適化優先）

### 6.1 レイアウト原則

* 基本 1カラム（可読性優先）
* 重要UI（目次・CTA・関連記事）は記事フローを邪魔しない配置
* 1画面に詰めすぎない（スワイプ疲れ軽減）
* タップ領域 44px 目安

### 6.2 ブレイクポイント

* `sm` 〜640：スマホ
* `md` 641〜1024：タブレット
* `lg` 1025〜：PC
  （Tailwind基準で実装可）

### 6.3 ページ別UI要件（MVP）

#### A. トップ `/`

* モバイル：

  * 価値提案（1〜2行）＋主要導線（カテゴリ3つ）
  * 人気記事（5）
  * 新着記事（10）
  * CTA（問い合わせ/登録）
* PC：2カラム可（左：カテゴリ導線、右：新着/人気）

#### B. カテゴリ一覧 `/industry` 等

* モバイル：

  * 上部にタグ絞り込み（ドロップダウン）
  * 記事カード：タイトル（2行）、抜粋（30〜60字）、タグ最大3、更新日
  * ページネーション（MVP推奨）
* PC：左フィルタ / 右一覧

#### C. 記事詳細 `/articles/[slug]`

* モバイル（最重要）：

  * カテゴリラベル / タイトル / 抜粋 / 更新日 / 著者
  * 本文直前に Summary Card（結論）
  * 目次は折りたたみ（記事冒頭に1回、追従はしない or 小さく）
  * CTA：記事中盤1回＋末尾1回（追従CTAは初期回避）
  * 関連記事：末尾に3〜6件（同カテゴリ優先＋タグ一致スコア）
* PC：2カラム可（右サイド：追従目次＋小CTA、本文は読み幅制限）

## 7. ブロック仕様（Strapi Dynamic Zone / MVP 9種）

> 編集者が「プレビューしなくても破綻しない」制約を重視。

1. Heading

* level: H2/H3/H4
* text: string（必須）
* H2/H3 は目次対象、アンカーは自動生成（slugify）

2. RichText（本文）

* body: rich text（必須）
* 許可：太字/リンク/箇条書き/引用/改行
* 禁止：任意HTML、fontサイズ変更 等

3. Summary Card（結論）

* title: string（デフォルト「結論」）
* bullets: string[]（3〜5推奨）
* 記事冒頭で高視認性

4. Callout

* type: info / warn / tip
* title: 任意
* body: rich text

5. ProsCons

* pros: string[]
* cons: string[]
* モバイル：縦積み、PC：2カラム可

6. Comparison Table

* caption 任意
* columns: string[]
* rows: { cells: string[] }[]
* モバイル：横スクロール必須（先頭列固定は余力で）

7. Link Cards

* items: { title, description?, linkType(internal/external), internalArticle?, url? }
* OGP自動取得なし（手入力）

8. CTA

* title / description / buttonText / buttonUrl / variant?
* モバイルで押しやすい

9. Image

* image upload
* alt 必須
* caption 任意

## 8. コンテンツモデル（Strapi）

### 8.1 Article

* title（必須）
* slug（uid, 必須, unique）
* category（industry/company/career）
* excerpt（必須：30〜120字）
* coverImage（任意だが推奨）
* author（relation, 任意）
* tags（many-to-many, **必須：1〜5推奨**）
* status（draft/review/published/archived）
* seo component：metaTitle / metaDescription / ogImage / canonical / noindex
* blocks（dynamic zone, 必須）
* manualRelatedArticles（任意）
* featured（トップ掲載用）

**入力バリデーション**

* tags は1つ以上必須
* excerpt は空禁止
* Image.alt は必須
* Summary Card を最低1つ含む（運用 or カスタム検証）

### 8.2 Tag

* name / slug
* tagType（major/skill/path/industry/other）
* priority（表示順）
* 運用：Tag作成は管理者のみ

### 8.3 Page（固定ページ）

* title / slug / seo / blocks

## 9. 検索・関連記事

### 9.1 検索（MVP）

* 対象：title / excerpt / blocksのplain text
* 表示：関連度順 + 新着補正
* UI：検索窓をヘッダー常設（モバイルはアイコン→展開）

### 9.2 関連記事（MVP）

* スコア：同カテゴリ +3 / タグ一致 +2（最大3タグ）/ featured +1（任意）/ 30日以内更新 +1
* 上位6件表示
* manualRelatedArticles がある場合は先頭固定

## 10. 非機能要件

### 10.1 パフォーマンス

* LCP重視、画像最適化（Next/Image, lazy）
* フォント軽量（読みやすさ優先）
* 記事は SSG/ISR（更新頻度で選択）

### 10.2 アクセシビリティ

* 見出し階層遵守（Headingブロックの強制）
* alt必須
* フォーカス可視化
* 表は横スクロールでも読める（caption/説明）

### 10.3 セキュリティ

* Strapi管理：2FA推奨、IP制限できれば
* ロールで公開権限分離（Editor/Publisher）
* フォーム（/contact）はスパム対策（reCAPTCHA等）
* XSS：RichText 許可タグ制限

## 11. 運用

* Editor：下書き→status=review
* Publisher：確認→published
* 誤字修正：更新→即反映（ISRなら再生成）
* バックアップ：DB日次（最低）／画像は Phase2

## 12. 受け入れ条件（MVP）

* モバイルで読みやすい（余白/文字サイズ/目次/表横スクロール）
* 管理画面でブロック9種で記事作成できる
* 一覧→詳細→関連記事→回遊が成立
* 記事ごとOGP
* sitemap/robots生成
* GA/SC導入
* 問い合わせ導線（メール）と登録導線（LINE）が機能

## 13. 未確定（TODO）

* {{TODO: Strapi のホスティング方式（Vercel外）とDB/ストレージの選定}}
* {{TODO: /contact の実装（mailto か フォーム送信か、送信先/通知方法）}}
* {{TODO: LINE登録の導線（公式アカウントURL、計測方法）}}
* {{TODO: 記事の公開頻度・ISRの再生成間隔}}
* {{TODO: 解析ツール（GA4以外の併用有無）}}
