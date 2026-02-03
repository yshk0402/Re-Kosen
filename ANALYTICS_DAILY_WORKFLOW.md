# Re:Kosen Daily Analytics Workflow (MCP/Skills)

目的: 人間は意思決定のみ。毎朝の分析は自動化し、mdで結論とアクションを提示する。

## 前提 / TODO
- GA4 Property ID: 520303035
- GSC プロパティURL: https://www.kosen-job.com/
- 認証方式: サービスアカウント
- サービスアカウントJSONキー: /home/yshk0402/ダウンロード/kosen-job-141507d2c571.json
- レポート出力: reports/daily-YYYY-MM-DD.md
- {{TODO: KPIの優先順 (CV / 記事成長 / タグ成長 / 回遊)}}

## おすすめツール (GTM以外)
- Looker Studio: GA4/GSCを接続し、定点の可視化に使う (日次mdの補助)
- BigQuery (GA4エクスポート): 履歴保管と柔軟な集計
- GA4 Data API + GSC API: 自動日次レポート生成のデータ取得
- Consent/Privacy (必要であれば): Cookie同意管理の簡易導入

## 使うSkill
- analytics-tracking: 目的に沿ったイベント/指標設計・出力仕様
- seo-audit: 検索パフォーマンスの診断ロジック (必要時)
- agent-browser: ダッシュボードの目視確認やスクショ生成 (必要時)
- find-skills: skills.sh から必要なskillを探索 (導入済み)
- on-page-seo-auditor: 記事単位の改善点を抽出 (導入済み)

## skills.sh 探索手順
1. find-skills を導入
   - `CI=1 npx skills add https://github.com/vercel-labs/skills --skill find-skills --yes`
2. skills.sh で候補探索
   - `npx skills find "mcp server"`
   - `npx skills find "google analytics ga4"`
   - `npx skills find "search console gsc"`
   - `npx skills find "daily report automation"`

注記: 現行の `npx skills` では `find` が未提供の可能性があるため、未対応なら skills.sh のWeb検索を行い、該当skillがなければ自作MCPに切替える。

## 毎朝の実行フロー (MCP)
1. MCP `ga4.query` で前日データ取得
   - 指標: `sessions`, `engagement_rate`, `average_session_duration`, `conversions`(CV定義), `event_count`
   - ディメンション: `page_path`, `page_title`, `date`, `session_source`, `session_medium`
2. MCP `gsc.query` で前日データ取得
   - 指標: `clicks`, `impressions`, `ctr`, `position`
   - ディメンション: `page`, `query`, `date`
3. 正規化 & 連結
   - GA4の`page_path`とGSCの`page`をURLで正規化
4. 意思決定用スコアリング
   - 記事成長スコア = クリック前日比 + CTR改善 + 位置改善 + エンゲージ改善
   - タグ/カテゴリ成長スコア = タグ内の記事成長スコアの合計 + 新規流入
   - CV導線改善スコア = CTAクリック率 + CV率の前日比
5. mdレポートを出力 (結論 → 根拠 → 次アクション)

## 出力フォーマット (md)
```
# Daily Analytics Report - YYYY-MM-DD

## Summary
- 伸ばすべき記事: [上位3件]
- 増やすべきタグ/カテゴリ: [上位3件]
- CV導線の改善点: [上位3件]

## Articles To Grow (Top 10)
| Rank | URL | Score | Clicks Δ | CTR Δ | Position Δ | Engagement Δ |

## Tags / Categories To Expand
| Rank | Tag/Category | Score | 対象記事数 | Clicks Δ |

## CV Funnel Watch
| Step | Metric | Yesterday | Δ | Note |

## Recommended Actions
1. [具体的アクション]
2. [具体的アクション]
3. [具体的アクション]
```

## 実装メモ (次ステップ)
- MCPサーバー: `scripts/mcp/ga4_gsc_server.mjs`
- 日次レポート: `scripts/analytics/daily_report_mcp.mjs`
- 実行: `pnpm analytics:daily`
- 出力: `reports/daily-YYYY-MM-DD.md`
- 手順書: `report_pipeline_orchestralator.md`

## 実行前の環境変数 (手動実行)
```
export GOOGLE_APPLICATION_CREDENTIALS="/home/yshk0402/ダウンロード/kosen-job-141507d2c571.json"
export GA4_PROPERTY_ID="520303035"
export GSC_SITE_URL="https://www.kosen-job.com/"
export REPORT_TIMEZONE="Asia/Tokyo"
export REPORTS_DIR="reports"
export CV_EVENT_NAMES="cta_clicked,form_submitted"
```
