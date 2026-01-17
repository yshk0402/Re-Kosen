# Strapi運用マニュアル（非エンジニア向け / Re:Kosen）

このマニュアルは、記事の作成・更新・公開に必要な最小限の操作をまとめたものです。

## 1. ログイン
- 管理画面URL/ログイン情報: {{TODO: Strapi管理画面URL/ログイン情報}}
- 管理画面は「/admin」配下です。

## 2. 画面の基本
- 左メニューの「Content Manager」で記事（Article）を編集します。
- 「Media Library」で画像管理をします。
- 「Content-type Builder」や「Settings」は編集しません（構造変更はエンジニア対応）。

## 3. 記事作成の最短手順
1. 左メニュー「Content Manager」→「Article」
2. 「Create new entry」をクリック
3. 基本情報を入力（タイトル/slug/カテゴリ/抜粋/タグ/ステータス）
4. 「blocks」に本文ブロックを追加（Summary Cardは1つ必須）
5. 「Save」をクリック
6. 公開する場合は `stats` を `published` にして保存

## 4. Article の入力項目（必須・推奨）
- title（必須）: 記事タイトル
- slug（必須）: URL用。基本は自動生成、必要なら半角英数+ハイフンで調整
- category: `industry` / `company` / `career`
- excerpt（必須・運用ルール）: 30〜120字の要約
- tags（必須・運用ルール）: 1〜5個推奨
- stats: `draft`（下書き）/ `review`（確認中）/ `published`（公開）/ `archived`（非公開）
- coverImage（任意・推奨）: 記事カードやOGPに使用。複数選べますが**先頭の1枚のみ表示**
- author（任意）: 著者
- featured（任意）: 関連記事のスコアに+1されます。重要記事のみ
- manualRelatedArticles（任意）: 関連記事の先頭固定（**現在は1件のみ**）
- blocks（必須・運用ルール）: 本文ブロック
- seo: {{TODO: SEOコンポーネントの入力項目（metaTitle等）を確認}}

## 5. blocks（本文ブロック）の使い方
### 5.1 Summary Card（必須）
- 目的: 記事冒頭の結論まとめ
- 入力:
  - title（必須）
  - description（任意）
  - image/link（**現在は画面表示に使われません**）
- 位置: **本文の先頭に1つ**置く
- {{TODO: Summary Card に bullets 欄の有無を確認}}

### 5.2 Heading（見出し）
- level: H2/H3/H4 のみ使用（H1はタイトルで使用）
- H2/H3 は目次に反映されます。

### 5.3 Rich Text（本文）
- 使える装飾: 太字/リンク/箇条書き/引用/改行
- 使えない装飾: 文字サイズ変更、任意HTML、表の挿入 など

### 5.4 Callout（注意・補足）
- type: `info` / `warning` / `success` / `danger`
  - `warning`/`danger` は「Warning」表示
  - `success` は「Tip」表示
- content は必須、短めにまとめる

### 5.5 Pros Con（メリット/デメリット）
- title（必須）
- pros/cons それぞれに「Rich Text」項目を複数追加
- 1項目=1ポイントを意識

### 5.6 Comparison Table（比較表）
- table_data にJSONで入力（以下の形式）
```json
[
  ["項目", "A社", "B社"],
  ["年収", "300万", "350万"],
  ["勤務地", "東京", "大阪"]
]
```
- 1行目が見出し、2行目以降が本文

### 5.7 Link Card（リンク集）
- 「cards」内に Link Card Item を追加
- 各カード:
  - title（必須）
  - url（必須）
  - description（任意）
  - image（**現在は画面表示に使われません**）
- 内部リンクは `/articles/slug` の形式、外部リンクは `https://` から入力

### 5.8 CTA（行動喚起）
- title / description / link_text / link_url が全て必要
- 記事中盤と末尾に1つずつが目安

### 5.9 Image（画像）
- image（必須）
- alt_text（必須）: 画像の説明文（SEO/アクセシビリティ）
- caption（任意）

## 6. タグ/著者の管理
- Tag作成は管理者のみ（表記ゆれ防止）
  - 既存に無ければ管理者に作成依頼
- Author は名前と slug のみ設定
- {{TODO: Tagの tagType/priority 追加有無を確認}}

## 7. 公開・更新フロー
- 公開: `stats` を `published` にして「Save」
- 下書き: `draft` のまま保存
- 非公開: `archived` に変更して保存
- 公開中の記事を編集したら、必ず再度「Save」

## 8. 公開前チェックリスト
- Summary Card が1つある
- excerpt が30〜120字
- tags が1つ以上
- 画像に alt_text が入っている
- リンクが正しい（外部URLは `https://`）
- `stats` が `published`
