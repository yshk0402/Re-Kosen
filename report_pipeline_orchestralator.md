# 日次レポート実行手順書 (Codex用)

目的: Codexがこのファイルの手順を順に実行し、`reports/` に日次レポートを保存する。

## 使うSkill
- analytics-tracking
- seo-audit
- on-page-seo-auditor
- agent-browser
- mcp-builder

## 事前条件
- `pnpm install` 済み
- `.env.local` に以下が設定済み
- MCPサーバー `ga4_gsc` が利用可能

## 手順
1. 環境変数の読み込みを確認
   - `.env.local` が存在すること
2. MCPサーバーの起動確認
   - CodexのMCP一覧に `ga4_gsc` があること
3. GA4/GSCの取得確認 (MCP)
   - `ga4.query` で前日データが取得できること
   - `gsc.query` で前日データが取得できること
4. 日次レポート生成
   - `pnpm analytics:daily` を実行
5. 出力の保存確認
   - `reports/daily-YYYY-MM-DD.md` が生成されていること
6. 追加分析 (任意)
   - seo-audit でGSCの落ち込み記事を抽出
   - on-page-seo-auditor で上位記事の改善点を抽出
7. 結果の要約を追記
   - `reports/daily-YYYY-MM-DD.md` の末尾に追加

## MCPツール仕様
- `ga4.query`
  - `dateRanges`: [{ startDate, endDate }]
  - `dimensions`: ["pagePath", "pageTitle", ...]
  - `metrics`: ["sessions", "engagementRate", ...]
- `gsc.query`
  - `startDate`, `endDate`
  - `dimensions`: ["page", "query"]

## 失敗時の対応
- `ga4.query` が失敗する
  - `.env.local` の `GOOGLE_APPLICATION_CREDENTIALS` を確認
- `gsc.query` が失敗する
  - Search Consoleでサービスアカウントの権限を確認
  - `siteUrl` は `.env.local` の `GSC_SITE_URL` と一致させる（`sc-domain:kosen-job.com` 推奨）
- `reports/` に出力されない
  - `REPORTS_DIR` の値を確認

## M4 連携（週次）
- 日次レポートの「上位記事」「低CTRクエリ」を週次で抽出し、
  `reports/m4-nonbrand-plan.md` のクラスター/内部リンク候補に反映する。
- 非ブランド判定は `kosen-job`, `高専ジョブ`, `Re:Kosen` を除外（必要に応じて更新）。
