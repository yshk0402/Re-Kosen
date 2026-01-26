import Image from "next/image";

import logo from "../../../LandingPage/ロゴ_LP用.png";

const ctaHref = "#"; // {{TODO: 参加フォームURL}}

const marker = "relative inline-block px-1 text-[#1A54C0] font-semibold";
const markerAfter =
  "after:absolute after:left-0 after:bottom-0 after:h-[0.42em] after:w-full after:bg-[#FFD54F] after:opacity-70 after:content-['']";

export default function CompanyMeetupLandingPage() {
  return (
    <main className="min-h-screen bg-white text-[#1A2B4C]">
      <div className="mx-auto max-w-5xl px-6 pb-20 pt-10 sm:px-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={logo}
              alt="高専ジョブ ロゴ"
              className="h-9 w-auto"
              priority
            />
            <span className="rounded-full border border-dashed border-[#1A54C0] px-3 py-1 text-xs font-semibold text-[#1A54C0]">
              高専生向け交流会
            </span>
          </div>
          <a
            href={ctaHref}
            className="rounded-full bg-[#1A54C0] px-6 py-3 text-sm font-semibold text-white"
          >
            ▶ 交流会に参加する
          </a>
        </header>

        <section className="mt-10 space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1A54C0]">
              Company Meetup
            </p>
            <h1 className="text-3xl font-bold leading-tight text-[#1A2B4C] sm:text-5xl">
              高専生との少人数交流会
              <br />
              参加企業を募集しています
            </h1>
            <p className="text-base text-[#3B4A68] sm:text-lg">
              採用前提なし。業界・職種不問。
              <span className={`${marker} ${markerAfter}`}>
                仕事観・意思決定について対話する交流会
              </span>
              です。
            </p>
          </div>
          <a
            href={ctaHref}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#1A54C0] px-6 py-3 text-sm font-semibold text-white sm:w-auto"
          >
            ▶ 交流会に参加する
          </a>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              "説明会・選考ではありません",
              "スライド・資料は不要です",
              "若手社員の参加も歓迎します",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-dashed border-[#1A54C0] px-4 py-3 text-sm font-semibold text-[#1A2B4C]"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-dashed border-[#1A54C0] bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1A54C0]">
              交流会の概要
            </p>
            <ul className="mt-4 space-y-3 text-sm text-[#3B4A68]">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 border border-[#1A54C0]" />
                高専生が進路判断の材料を得るための対話
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 border border-[#1A54C0]" />
                企業紹介は自己紹介レベルのみ
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 border border-[#1A54C0]" />
                履歴書提出・選考誘導は一切なし
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-dashed border-[#1A54C0] bg-[#F3F7FF] p-6 text-sm text-[#1A2B4C]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1A54C0]">
              話題例（自由）
            </p>
            <p className="mt-3 font-semibold">なぜ今の仕事を選んだのか</p>
            <p className="mt-2 text-[#3B4A68]">
              働く中で価値観が変わった経験 など
            </p>
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-0 w-0 border-b-[8px] border-l-[12px] border-b-transparent border-l-[#1A54C0]" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1A54C0]">
                Why Kosen
              </p>
            </div>
            <h2 className="text-2xl font-bold sm:text-3xl">なぜ高専生が対象なのか</h2>
            <p className="text-sm leading-relaxed text-[#3B4A68]">
              高専生は早い段階で専門分野を持ち、年上や社会人と話す機会が多い環境にいます。
              <span className={`${marker} ${markerAfter}`}>
                「どんな仕事を選ぶか」「どんな環境で働くか」
              </span>
              を考え始める傾向があります。
            </p>
          </div>
          <div className="rounded-3xl border border-dashed border-[#1A54C0] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1A54C0]">
              参加対象
            </p>
            <div className="mt-4 grid gap-3 text-sm text-[#3B4A68]">
              {[
                "全国の高専生（学年不問）",
                "オンライン／オフライン両対応",
                "業界・職種の制限なし",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-[#F3F7FF] px-4 py-3">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="flex items-center gap-2">
            <span className="h-0 w-0 border-b-[8px] border-l-[12px] border-b-transparent border-l-[#1A54C0]" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1A54C0]">
              Benefits
            </p>
          </div>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">企業にとってのメリット</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "思考力・前提整理力の高い学生と出会える",
                body: "構造的に考える訓練を受けた学生と対話できます。",
              },
              {
                title: "就活モードではない、素の反応が見える",
                body: "志望動機を作っていないため、率直な反応が見えます。",
              },
              {
                title: "将来の選択肢として認知に残る",
                body: "すぐに採用につながらなくても印象に残る接点を作れます。",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-dashed border-[#1A54C0] p-5"
              >
                <h3 className="text-base font-bold text-[#1A2B4C]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#3B4A68]">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-dashed border-[#1A54C0] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1A54C0]">
              向いている企業
            </p>
            <ul className="mt-4 space-y-3 text-sm text-[#3B4A68]">
              {[
                "業界・職種を問わず仕事の話ができる",
                "若手社員に裁量がある、または育てたい",
                "採用を短期成果だけで考えていない",
                "思考プロセスや価値観を大切にしている",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 border border-[#1A54C0]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-dashed border-[#1A54C0] bg-[#F9FBFF] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1A54C0]">
              向いていない企業
            </p>
            <ul className="mt-4 space-y-3 text-sm text-[#3B4A68]">
              {[
                "会社説明や募集告知をしたい",
                "学生を囲い込みたい",
                "即時の採用成果だけを求めている",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 border border-[#1A54C0]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-0 w-0 border-b-[8px] border-l-[12px] border-b-transparent border-l-[#1A54C0]" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1A54C0]">
                Outline
              </p>
            </div>
            <h2 className="text-2xl font-bold sm:text-3xl">実施概要</h2>
            <p className="text-sm text-[#3B4A68]">
              判断材料として最低限の情報をまとめています。詳細や日程はお問い合わせください。
            </p>
          </div>
          <div className="rounded-3xl border border-dashed border-[#1A54C0] p-6">
            <dl className="space-y-4 text-sm text-[#3B4A68]">
              {[
                ["対象", "全国の高専生（学年不問）"],
                ["形式", "少人数制・業界混合交流会"],
                ["開催方法", "オンライン／オフライン"],
                ["所要時間", "約90分"],
                ["募集企業数", "◯社（先着）"],
                ["参加条件", "勧誘・選考誘導を行わないこと"],
                ["準備物", "なし（スライド不要）"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-wrap justify-between gap-2 border-b border-dashed border-[#1A54C0]/40 pb-3 last:border-none last:pb-0"
                >
                  <dt className="font-semibold text-[#1A2B4C]">{label}</dt>
                  <dd className="text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-0 w-0 border-b-[8px] border-l-[12px] border-b-transparent border-l-[#1A54C0]" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1A54C0]">
                Flow
              </p>
            </div>
            <h2 className="text-2xl font-bold sm:text-3xl">参加までの流れ</h2>
          </div>
          <div className="rounded-3xl border border-dashed border-[#1A54C0] bg-[#F3F7FF] p-6">
            <ol className="space-y-4 text-sm text-[#1A2B4C]">
              {[
                "フォームより参加希望を送信",
                "運営より簡単な確認のご連絡",
                "交流会に参加",
              ].map((item, index) => (
                <li key={item} className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1A54C0] text-xs font-semibold">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-[#3B4A68]">
              ※ 無理な営業や継続契約の勧誘は行いません。
            </p>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-dashed border-[#1A54C0] bg-[#1A54C0] px-8 py-10 text-white">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFD700]">
                Final CTA
              </p>
              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                採用の前に、高専生と出会いませんか。
              </h2>
              <p className="mt-4 text-sm text-white/80">
                聞かれたことに答えるだけでも、学生にとっては貴重な判断材料になります。
              </p>
            </div>
            <div className="flex items-center justify-center">
              <a
                href={ctaHref}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#FFD700] px-6 py-3 text-sm font-semibold text-[#1A2B4C]"
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
