import Image from "next/image";

import logo from "../../../LandingPage/ロゴ_LP用.png";

const ctaHref = "#"; // {{TODO: 参加フォームURL}}

export default function CompanyMeetupLandingPage() {
  return (
    <main
      className="relative min-h-screen bg-[#f6f1e7] text-[#1b1f2a]"
      style={{ fontFamily: '"M PLUS 1p", "Noto Sans JP", sans-serif' }}
    >
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
        <div className="absolute -left-20 top-16 h-64 w-64 rounded-full bg-[#f2b880] opacity-35 blur-[90px]" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-[#5aa2a4] opacity-25 blur-[110px]" />
        <div className="absolute bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7c8c7f] opacity-20 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(27,31,42,0.08)_1px,transparent_0)] [background-size:22px_22px] opacity-60" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-14 sm:px-10">
        <header className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="rounded-[28px] border-2 border-[#1b1f2a] bg-white px-4 py-2 shadow-[6px_6px_0_0_#1b1f2a]">
              <span className="text-xs font-semibold tracking-[0.2em]">Re:Kosen Meetup</span>
            </div>
            <Image
              src={logo}
              alt="高専ジョブ ロゴ"
              className="h-10 w-auto"
              priority
            />
          </div>
          <a
            href={ctaHref}
            className="rounded-full border-2 border-[#1b1f2a] bg-[#1b1f2a] px-6 py-3 text-sm font-semibold text-[#f6f1e7] shadow-[6px_6px_0_0_#f2b880] transition hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#f2b880]"
          >
            ▶ 交流会に参加する
          </a>
        </header>

        <section className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#1b1f2a] bg-white px-4 py-2 text-xs font-semibold tracking-[0.2em]">
              高専生との少人数交流会
            </p>
            <div className="space-y-4">
              <h1
                className="text-3xl font-semibold leading-[1.2] sm:text-5xl"
                style={{ fontFamily: '"Noto Serif JP", "Noto Sans JP", serif' }}
              >
                高専生との少人数交流会
                <br />
                参加企業を募集しています
              </h1>
              <p className="text-lg text-[#2c3240] sm:text-xl">
                採用前提なし。業界・職種不問。<br />
                <span className="font-semibold">
                  仕事観・意思決定について対話する交流会
                </span>
                です。
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                "説明会・選考ではありません",
                "スライド・資料は不要です",
                "若手社員の参加も歓迎します",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border-2 border-[#1b1f2a] bg-white px-4 py-4 text-sm font-semibold shadow-[4px_4px_0_0_#1b1f2a]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-[32px] border-2 border-[#1b1f2a] bg-white p-6 shadow-[10px_10px_0_0_#1b1f2a] sm:p-8">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5c6170]">
                Event Snapshot
              </p>
              <span className="rounded-full border border-[#1b1f2a] px-3 py-1 text-xs font-semibold">
                90min / 少人数
              </span>
            </div>
            <div>
              <h2
                className="text-2xl font-semibold"
                style={{ fontFamily: '"Noto Serif JP", "Noto Sans JP", serif' }}
              >
                この交流会で行うこと
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#2c3240]">
                高専生が進路を決める前に「社会人はどんな考え方で仕事を選び、続けているのか」
                を知るための場です。履歴書の提出や、選考への誘導は一切ありません。
              </p>
            </div>
            <div className="space-y-3">
              {[
                "業界・職種混合での少人数交流",
                "1テーブルあたり数名の学生と社会人で対話",
                "企業紹介は自己紹介レベルのみ",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-[#1b1f2a] bg-[#f6f1e7] px-4 py-3 text-sm"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#1b1f2a]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <a
              href={ctaHref}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full border-2 border-[#1b1f2a] bg-[#f2b880] px-6 py-4 text-sm font-semibold shadow-[6px_6px_0_0_#1b1f2a] transition hover:-translate-y-1"
            >
              ▶ 交流会に参加する
            </a>
            <p className="text-xs text-[#5c6170]">
              ※ 無理な営業や継続契約の勧誘は行いません。
            </p>
          </div>
        </section>

        <section className="mt-20 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5c6170]">
              Section 01
            </p>
            <h2
              className="text-2xl font-semibold sm:text-3xl"
              style={{ fontFamily: '"Noto Serif JP", "Noto Sans JP", serif' }}
            >
              この交流会で行うこと
            </h2>
            <p className="text-base leading-relaxed text-[#2c3240]">
              本交流会は、高専生が進路を決める前に
              <span className="font-semibold">
                「社会人はどんな考え方で仕事を選び、続けているのか」
              </span>
              を知るための場です。
            </p>
            <p className="text-base leading-relaxed text-[#2c3240]">
              企業にとっては、学生に会社を売り込む場ではなく、
              <span className="font-semibold">
                仕事・キャリア・意思決定の実例を共有する場
              </span>
              になります。履歴書の提出や、選考への誘導は一切ありません。
            </p>
          </div>
          <div className="rounded-[28px] border-2 border-[#1b1f2a] bg-[#1b1f2a] p-6 text-[#f6f1e7] shadow-[10px_10px_0_0_#f2b880]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2b880]">
              Key Promise
            </p>
            <ul className="mt-4 space-y-4 text-sm leading-relaxed">
              <li>採用前提なし。説明会・選考ではありません。</li>
              <li>スライド・資料不要。対話が中心です。</li>
              <li>若手社員の参加も歓迎します。</li>
            </ul>
          </div>
        </section>

        <section className="mt-20">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5c6170]">
                Section 02
              </p>
              <h2
                className="mt-3 text-2xl font-semibold sm:text-3xl"
                style={{ fontFamily: '"Noto Serif JP", "Noto Sans JP", serif' }}
              >
                当日の内容（予定）
              </h2>
            </div>
            <div className="rounded-full border-2 border-[#1b1f2a] bg-white px-5 py-2 text-xs font-semibold shadow-[4px_4px_0_0_#1b1f2a]">
              企業紹介は自己紹介レベルのみ
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[28px] border-2 border-[#1b1f2a] bg-white p-6 shadow-[8px_8px_0_0_#1b1f2a]">
              <ul className="space-y-4 text-sm text-[#2c3240]">
                {[
                  "業界・職種混合での少人数交流",
                  "1テーブルあたり数名の学生と社会人で対話",
                  "企業紹介は自己紹介レベルのみ",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#1b1f2a]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[28px] border-2 border-[#1b1f2a] bg-[#f2b880] p-6 shadow-[8px_8px_0_0_#1b1f2a]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1b1f2a]">
                話題の例
              </p>
              <ul className="mt-4 space-y-3 text-sm text-[#1b1f2a]">
                {[
                  "なぜ今の仕事を選んだのか",
                  "若手のうちに考えておいてよかったこと",
                  "仕事で一番悩んだ意思決定",
                  "「この会社、合わないな」と感じる瞬間",
                  "働く中で価値観が変わった経験",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#1b1f2a]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-[#1b1f2a]">
                ※ 技術的な話題が出ても構いませんが、必須ではありません。
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5c6170]">
              Section 03
            </p>
            <h2
              className="text-2xl font-semibold sm:text-3xl"
              style={{ fontFamily: '"Noto Serif JP", "Noto Sans JP", serif' }}
            >
              なぜ高専生が対象なのか
            </h2>
            <p className="text-base leading-relaxed text-[#2c3240]">
              高専生は、大学生よりも早い段階で専門分野を持ち、年上や社会人と話す機会が多い環境にいます。
              そのため、
              <span className="font-semibold">
                「どんな仕事を選ぶか」「どんな環境で働くか」
              </span>
              を早くから考え始める傾向があります。
            </p>
            <p className="text-base leading-relaxed text-[#2c3240]">
              進路はメーカーやITに限らず、コンサル、企画、ビジネス職など多岐にわたります。高専生が視野を広げ、
              判断材料を増やすための場です。
            </p>
          </div>
          <div className="rounded-[28px] border-2 border-[#1b1f2a] bg-white p-6 shadow-[8px_8px_0_0_#1b1f2a]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5c6170]">
              参加対象
            </p>
            <div className="mt-5 space-y-4 text-sm text-[#2c3240]">
              <div className="rounded-2xl border border-[#1b1f2a] bg-[#f6f1e7] px-4 py-3">
                全国の高専生（学年不問）
              </div>
              <div className="rounded-2xl border border-[#1b1f2a] bg-[#f6f1e7] px-4 py-3">
                オンライン／オフライン両対応
              </div>
              <div className="rounded-2xl border border-[#1b1f2a] bg-[#f6f1e7] px-4 py-3">
                業界・職種の制限なし
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5c6170]">
                Section 04
              </p>
              <h2
                className="mt-3 text-2xl font-semibold sm:text-3xl"
                style={{ fontFamily: '"Noto Serif JP", "Noto Sans JP", serif' }}
              >
                企業にとってのメリット
              </h2>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "思考力・前提整理力の高い学生と出会える",
                body: "高専生は前提を整理し、構造で考える訓練を受けています。コンサル・企画・ビジネス系職種とも相性が良い層です。",
              },
              {
                title: "就活モードではない、素の反応が見える",
                body: "志望動機を作っていない状態のため、違和感や興味がそのまま表に出ます。ミスマッチの兆候も早く見えます。",
              },
              {
                title: "将来の選択肢として認知に残る",
                body: "すぐに採用につながらなくても問題ありません。「あの会社の人の話は印象に残っている」という状態を作ることが目的です。",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border-2 border-[#1b1f2a] bg-white p-6 shadow-[8px_8px_0_0_#1b1f2a]"
              >
                <h3
                  className="text-lg font-semibold"
                  style={{ fontFamily: '"Noto Serif JP", "Noto Sans JP", serif' }}
                >
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#2c3240]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border-2 border-[#1b1f2a] bg-[#1b1f2a] p-6 text-[#f6f1e7] shadow-[8px_8px_0_0_#f2b880]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2b880]">
              この交流会に向いている企業
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                "業界・職種を問わず仕事の話ができる",
                "若手社員に裁量がある、または育てたい",
                "採用を短期成果だけで考えていない",
                "思考プロセスや価値観を大切にしている",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#f2b880]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] border-2 border-[#1b1f2a] bg-white p-6 shadow-[8px_8px_0_0_#1b1f2a]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5c6170]">
              向いていない企業
            </p>
            <ul className="mt-5 space-y-3 text-sm text-[#2c3240]">
              {[
                "会社説明や募集告知をしたい",
                "学生を囲い込みたい",
                "即時の採用成果だけを求めている",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#1b1f2a]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-20 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5c6170]">
              Section 06
            </p>
            <h2
              className="text-2xl font-semibold sm:text-3xl"
              style={{ fontFamily: '"Noto Serif JP", "Noto Sans JP", serif' }}
            >
              実施概要
            </h2>
            <p className="text-base leading-relaxed text-[#2c3240]">
              判断材料として最低限の情報をまとめています。詳細や日程はお問い合わせください。
            </p>
          </div>
          <div className="rounded-[28px] border-2 border-[#1b1f2a] bg-white p-6 shadow-[8px_8px_0_0_#1b1f2a]">
            <dl className="space-y-4 text-sm text-[#2c3240]">
              {[
                ["対象", "全国の高専生（学年不問）"],
                ["形式", "少人数制・業界混合交流会"],
                ["開催方法", "オンライン／オフライン"],
                ["所要時間", "約90分"],
                ["募集企業数", "◯社（先着）"],
                ["参加条件", "勧誘・選考誘導を行わないこと"],
                ["準備物", "なし（スライド不要）"],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-wrap justify-between gap-2 border-b border-dashed border-[#1b1f2a]/40 pb-3 last:border-none last:pb-0">
                  <dt className="font-semibold">{label}</dt>
                  <dd className="text-right text-[#2c3240]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mt-20 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5c6170]">
              Section 07
            </p>
            <h2
              className="text-2xl font-semibold sm:text-3xl"
              style={{ fontFamily: '"Noto Serif JP", "Noto Sans JP", serif' }}
            >
              参加までの流れ
            </h2>
          </div>
          <div className="rounded-[28px] border-2 border-[#1b1f2a] bg-[#f2b880] p-6 shadow-[8px_8px_0_0_#1b1f2a]">
            <ol className="space-y-4 text-sm text-[#1b1f2a]">
              {[
                "フォームより参加希望を送信",
                "運営より簡単な確認のご連絡",
                "交流会に参加",
              ].map((item, index) => (
                <li key={item} className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#1b1f2a] bg-white text-xs font-semibold">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-[#1b1f2a]">
              ※ 無理な営業や継続契約の勧誘は行いません。
            </p>
          </div>
        </section>

        <section className="mt-20 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5c6170]">
              Section 08
            </p>
            <h2
              className="text-2xl font-semibold sm:text-3xl"
              style={{ fontFamily: '"Noto Serif JP", "Noto Sans JP", serif' }}
            >
              運営について
            </h2>
            <p className="text-base leading-relaxed text-[#2c3240]">
              本交流会は、高専生向けキャリア支援を行う
              <span className="font-semibold">高専ジョブ</span>が運営しています。
              学生が安心して参加できるよう、企業・学生双方にルールを設けた上で運営しています。
            </p>
          </div>
          <div className="rounded-[28px] border-2 border-[#1b1f2a] bg-white p-6 shadow-[8px_8px_0_0_#1b1f2a]">
            <div className="flex items-center gap-4">
              <Image src={logo} alt="高専ジョブ" className="h-12 w-auto" />
              <div>
                <p className="text-sm font-semibold">高専ジョブ</p>
                <p className="text-xs text-[#5c6170]">高専生向けキャリア支援 / コミュニティ運営</p>
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm text-[#2c3240]">
              <p>学生の安全と対話の質を最優先にルールを整備しています。</p>
              <p>参加企業にも「勧誘・選考誘導を行わない」ことをお願いしています。</p>
            </div>
          </div>
        </section>

        <section className="mt-24 rounded-[36px] border-2 border-[#1b1f2a] bg-[#1b1f2a] p-10 text-[#f6f1e7] shadow-[12px_12px_0_0_#f2b880]">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2b880]">
                Final CTA
              </p>
              <h2
                className="mt-4 text-2xl font-semibold sm:text-3xl"
                style={{ fontFamily: '"Noto Serif JP", "Noto Sans JP", serif' }}
              >
                採用の前に、高専生と出会いませんか。
              </h2>
              <p className="mt-4 text-sm text-[#f6f1e7]/80">
                聞かれたことに答えるだけでも、学生にとっては貴重な判断材料になります。
              </p>
            </div>
            <div className="flex items-center justify-center">
              <a
                href={ctaHref}
                className="inline-flex w-full items-center justify-center rounded-full border-2 border-[#f6f1e7] bg-[#f2b880] px-6 py-4 text-sm font-semibold text-[#1b1f2a] shadow-[6px_6px_0_0_#f6f1e7] transition hover:-translate-y-1"
              >
                ▶ 高専生との交流会に参加する
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
