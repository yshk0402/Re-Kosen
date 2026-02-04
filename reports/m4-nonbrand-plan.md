# M4 非ブランド流入設計プラン（12週間）

作成日: 2026-02-04
対象サイト: https://www.kosen-job.com/

## 1. 概要
- 目的: 非ブランド検索流入の最大化
- 主要読者: 高専生
- 方針: 4カテゴリ（industry/company/career/job）をバランス配分で強化
- 期間: 12週間
- データソース: GA4（MCP取得済み）/ GSC（MCP 403のため未取得）

## 2. データ取得状況
### GA4（MCP）
- 取得期間: 2025-11-06〜2026-02-03
- 取得内容: pagePath / pageTitle / sessions / engagementRate / averageSessionDuration

### GSC（MCP）
- 取得期間: 2025-11-06〜2026-02-03
- siteUrl: `sc-domain:kosen-job.com`（`.env.local` と一致）
- 取得状況: OK（`https://www.kosen-job.com/` では 403 になるため、以後 `sc-domain` を使用）

## 3. 非ブランド判定ルール（仮）
- 除外するクエリ: `kosen-job`, `高専ジョブ`, `Re:Kosen`, `ReKosen`, `高専job`
- 正規化: 全角/半角・大文字/小文字・空白を正規化して判定
- ブランド/非ブランドの境界が曖昧なものは `{{TODO: 判定基準の最終確定}}`

## 4. GA4 上位流入ページ（90日）
- `/` 高専ジョブ（sessions 176）
- `/articles/career-zero` 0章｜高専生が一番やってはいけないこと（48）
- `/about`（45）
- `/career`（40）
- `/industry`（30）
- `/company`（25）
- `/contact`（24）
- `/articles/caree-five` 5章｜就職か進学か（17）
- `/articles/semiconductor` 日本の半導体業界とは（17）
- `/articles/career-seven` 7章｜高専生がキャリアで詰む典型パターン（15）
- `/articles/career-one` 第1章｜1年生から持つべき意識（14）
- `/articles/career-six` 6章｜企業選びで絶対にやってはいけないこと（13）
- `/articles/career-two` 2章｜方向性を決めることの重要性（10）
- `/articles/career-last` 最終章｜進路の仮説を立てる（7）
- `/articles/career-three` 3章｜4年生：決断を迫られる時期（7）
- `/articles/creer-eight` 8章｜まだやり直せる（7）
- `/articles/plant-enginieerging` 日本のプラントエンジニアリング業界とはなにか（6）
- `/articles/omron` / `/articles/NEC` / `/articles/eneos` / `/articles/jfe-steel` / `/articles/mitsubishijuko` 企業系記事

## 4.1 GSC 非ブランドクエリ（直近90日・サンプル）
※ 取得件数が少ないため、まずは方向性の仮説として扱う。
- `/articles/career-seven`: 「高専 留年」(CTR 0.5, pos 25)
- `/articles/career-seven`: 「企業選びの軸 チームワーク」(CTR 0, pos 49)
- `/articles/career-seven`: 「就活軸 チームワーク」(CTR 0, pos 43.7)
- `/articles/career-seven`: 「浅く考えろ」(CTR 0, pos 21)
- `/articles/career-seven`: 「高専 就職」(CTR 0, pos 35)
- `/articles/gas-energy`: 「電力 ガス エネルギー」(CTR 0, pos 55)

## 5. 既存記事インベントリ（部分）
### 5.1 固定データ（src/app/*/data.ts）
- industry: `energy-dx`, `infra-career`, `it-roles`
- company: `manufacturing-culture`, `startup-vs-large`, `internship-check`
- career: `career-roadmap`, `lab-prep`, `kosen-choices`
- job: `job-developer`, `job-research`, `job-operation`

### 5.2 GA4で流入確認された記事
- Careerシリーズ: `career-zero`, `career-one`, `career-two`, `career-three`, `career-four`, `caree-five`, `career-six`, `career-seven`, `career-last`, `creer-eight`
- Industry系: `semiconductor`, `gas-energy`, `plant-enginieerging`
- Company系: `omron`, `NEC`, `eneos`, `jfe-steel`, `mitsubishijuko`, `murataseisakusho`
- その他: `test`（テスト記事）

## 6. 競合サイトの傾向（要点）
- `gekkan-kosen.com` は「高専のニュース・取材・学生/教員向け企画」中心で、キャリア意思決定よりも情報発信色が強い。 (2025/2026版の高専特集ページ) citeturn1search0turn1search3
- `kosen-link.com` は「高専学校データベース/学校比較」系の情報量が厚く、進路設計・職種理解の深掘りは薄い。 citeturn1search1
- `kosen-plus.com` は「高専紹介・地域/学校別情報」寄りで、非ブランド検索のハブとして地域・学校名で強い。 citeturn1search2

## 7. 重点領域（#12-1）
優先度は「検索需要見込み × 既存流入 × 競合ギャップ」でスコア化。
- P1: 進路意思決定（career）
- P2: 職種理解（job）
- P3: 業界理解（industry）
- P4: 企業研究（company）

## 8. クラスター設計（#12-2）
### Career（進路意思決定）
- Hub: 高専生の進路設計ガイド（就職/編入/研究の全体像）
- Spokes:
  - 学年別ロードマップ（1〜5年）
  - 就職 vs 編入の判断軸
  - 研究室配属前の準備
  - 進路でやってはいけないこと（careerシリーズ統合）

### Job（職種理解）
- Hub: 高専生の職種マップ（開発/研究/運用）
- Spokes:
  - 開発職: 設計〜実装〜運用の流れ
  - 研究職: テーマ設定〜実験〜成果発表
  - 運用/保守: トラブル対応と評価ポイント
  - 職種ごとの必要スキルマップ

### Industry（業界理解）
- Hub: 高専生向け業界研究ハンドブック
- Spokes:
  - 半導体業界の構造と高専スキル
  - エネルギー/インフラ業界の仕事
  - プラント/重工系の職種と働き方
  - IT/通信インフラの職種比較

### Company（企業研究）
- Hub: 高専生の企業研究ガイド（選び方/比較軸）
- Spokes:
  - 大手 vs スタートアップの成長環境
  - 製造業で高専生が評価される理由
  - インターン準備の優先度
  - 企業研究の質問集（面談/OB訪問向け）

## 9. 記事候補一覧（#12-3）
### Career
- 高専生の進路設計ガイド（Hub）
- 高専1〜5年の進路ロードマップ
- 就職/編入/研究で後悔しやすい判断ミス
- 進路を決めるための情報収集チェックリスト
- 研究室配属前の準備と選び方

### Job
- 高専生の職種マップ（Hub）
- 開発職の仕事フローと高専スキルの活かし方
- 研究職の1日の流れと成果の出し方
- 運用/保守で評価される力と伸ばし方
- 職種別に必要な資格・スキル一覧

### Industry
- 高専生向け業界研究ハンドブック（Hub）
- 半導体業界の構造と高専卒の配属先
- エネルギー/インフラ業界の職種比較
- プラント/重工系で高専生が担う仕事
- IT/通信インフラ業界でのキャリアパス

### Company
- 高専生の企業研究ガイド（Hub）
- 大手とスタートアップの比較軸（配属・育成・裁量）
- 製造業で高専生が評価される理由（事例付き）
- インターン準備で評価されるポイント
- 企業研究で聞くべき質問集

## 10. 内部リンク設計（#12-4）
### 主要ハブ
- Career Hub → careerシリーズ各章へリンク
- Job Hub → `job-developer`, `job-research`, `job-operation`
- Industry Hub → `semiconductor`, `gas-energy`, `plant-enginieerging`, `energy-dx`
- Company Hub → `manufacturing-culture`, `startup-vs-large`, `internship-check`, 企業記事群

### リンク原則
- ハブ ↔ スポークの双方向リンク必須
- 既存流入がある記事に「次に読む」枠を設置
- 1記事あたり内部リンク2〜3本を目安

## 11. 12週間スケジュール
- Week 1: GA4/GSC取得・既存記事棚卸し
- Week 2: 重点領域確定
- Week 3-4: クラスター設計
- Week 5-7: 記事候補設計
- Week 8-10: 内部リンク設計
- Week 11-12: 仕上げと改善ループ

## 12. `report_pipeline_orchestralator.md` への追記案（参照のみ）
- 日次レポートで出力される「上位記事」「低CTR候補」を
  週次で M4クラスターに紐付けて改善候補を更新する。
- 週次で `reports/m4-nonbrand-plan.md` の
  「内部リンク候補」と「新規記事候補」を更新する運用を追加。

## 13. 未確定・TODO
- {{TODO: Search Console 権限の復旧（MCP 403解消）}}
- {{TODO: 非ブランド判定ルールの最終確定}}
- {{TODO: 記事候補の優先順位（編集リソースに応じて調整）}}
