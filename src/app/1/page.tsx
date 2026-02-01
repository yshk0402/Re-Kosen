import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

const FORM_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || "#";

export const metadata: Metadata = {
  title: "高専生との少人数交流会 参加企業募集",
  description:
    "採用前提なし。業界・職種不問の少人数交流会。高専生の仕事観・意思決定を知るための場です。",
};

const benefits = [
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
];

const fitList = [
  "業界・職種を問わず仕事の話ができる",
  "若手社員に裁量がある、または育てたい",
  "採用を短期成果だけで考えていない",
  "思考プロセスや価値観を大切にしている",
];

const notFitList = [
  "会社説明や募集告知をしたい",
  "学生を囲い込みたい",
  "即時の採用成果だけを求めている",
];

const overviewItems = [
  { label: "対象", value: "全国の高専生（学年不問）" },
  { label: "形式", value: "少人数制・業界混合交流会" },
  { label: "開催方法", value: "オンライン／オフライン" },
  { label: "所要時間", value: "約90分" },
  { label: "募集企業数", value: "◯社（先着）" },
  { label: "参加条件", value: "勧誘・選考誘導を行わないこと" },
  { label: "準備物", value: "なし（スライド不要）" },
];

const steps = [
  {
    title: "フォームより参加希望を送信",
    body: "まずはフォームに必要事項をご記入ください。",
  },
  {
    title: "運営より簡単な確認のご連絡",
    body: "目的や当日の進行について簡単にご案内します。",
  },
  {
    title: "交流会に参加",
    body: "高専生と少人数で対話し、率直な意思決定を共有します。",
  },
];

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute left-1/2 top-[-240px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#ffbb00]/15 blur-[160px]" />
      <div className="pointer-events-none absolute right-[-120px] top-[420px] hidden h-[520px] w-[520px] rounded-full bg-[#1a54c0]/15 blur-[180px] lg:block" />

      <div className="mx-auto w-full max-w-[1440px] px-4 pb-20 pt-8 lg:px-10">
        <header className="flex items-center justify-between rounded-2xl border border-[#E3D8CA] bg-[#F5F1EB] px-5 py-4 shadow-[0_6px_20px_rgba(20,20,20,0.06)]">
          <div className="flex items-center gap-3">
            <Image
              alt="高専ジョブ"
              className="h-8 w-auto"
              height={32}
              priority
              src="/lp/brand-mark.png"
              width={118}
            />
          </div>
          <Link
            className="hidden items-center justify-center rounded-full border-2 border-black bg-[#ffbb00] px-6 py-3 text-sm font-bold text-black transition hover:-translate-y-0.5 lg:inline-flex"
            href={FORM_URL}
            rel="noreferrer"
            target="_blank"
          >
            ▶ 交流会に参加する
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-full border-2 border-black bg-[#ffbb00] px-4 py-2 text-xs font-bold text-black transition hover:-translate-y-0.5 lg:hidden"
            href={FORM_URL}
            rel="noreferrer"
            target="_blank"
          >
            ▶ 参加する
          </Link>
        </header>

        <div className="relative mt-10 grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold text-[#1a54c0]">
              採用前提なし・業界職種不問の少人数交流会
            </p>
            <h1 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-5xl">
              高専生との少人数交流会
              <br />
              参加企業を募集しています
            </h1>
            <p className="max-w-[36rem] text-base leading-relaxed text-muted sm:text-lg">
              採用前提なし。業界・職種不問。<br className="hidden sm:block" />
              <span className="font-semibold text-ink">
                仕事観・意思決定について対話する交流会
              </span>
              です。
            </p>
            <ul className="space-y-2 text-sm text-ink sm:text-base">
              {[
                "説明会・選考ではありません",
                "スライド・資料は不要です",
                "若手社員の参加も歓迎します",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-[#ffbb00]" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                className="inline-flex items-center justify-center rounded-full border-2 border-black bg-[#ffbb00] px-7 py-3 text-base font-bold text-black shadow-[0_6px_16px_rgba(0,0,0,0.1)] transition hover:-translate-y-0.5"
                href={FORM_URL}
                rel="noreferrer"
                target="_blank"
              >
                ▶ 交流会に参加する
              </Link>
              <p className="text-xs text-muted">
                ※外部のGoogle Formsへ遷移します。
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-6 hidden h-28 w-28 rounded-full bg-[#ffbb00]/30 blur-2xl lg:block" />
            <div className="overflow-hidden rounded-[32px] border border-[#E5E7EB] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
              <Image
                alt="交流会のイメージ"
                className="h-full w-full object-cover"
                height={520}
                priority
                src="/lp/hero.png"
                width={520}
              />
            </div>
          </div>

          <div className="absolute right-[-8px] top-10 hidden h-[220px] w-[68px] items-center justify-center rounded-l-xl border-4 border-black bg-[#ffbb00] text-sm font-bold text-black lg:flex">
            学<br />生<br />の<br />方<br />へ
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-b from-[#f4f7ff] via-white to-[#f4f7ff] py-16">
        <div className="mx-auto w-full max-w-[1200px] space-y-12 px-4 lg:px-10">
          <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">この交流会で行うこと</h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              本交流会は、高専生が進路を決める前に「社会人はどんな考え方で仕事を選び、続けているのか」を知るための場です。
              企業にとっては、学生に会社を売り込む場ではなく、仕事・キャリア・意思決定の実例を共有する場になります。
              履歴書の提出や、選考への誘導は一切ありません。
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
            <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8">
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">当日の内容（予定）</h2>
              <ul className="mt-4 space-y-2 text-base text-muted">
                <li>・業界・職種混合での少人数交流</li>
                <li>・1テーブルあたり数名の学生と社会人で対話</li>
                <li>・企業紹介は自己紹介レベルのみ</li>
              </ul>
              <p className="mt-4 text-sm text-muted">
                ※ 技術的な話題が出ても構いませんが、必須ではありません。
              </p>
            </div>
            <div className="rounded-3xl border border-[#E5E7EB] bg-[#0F172A] p-8 text-white">
              <h3 className="text-lg font-semibold">話題の例</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                {[
                  "なぜ今の仕事を選んだのか",
                  "若手のうちに考えておいてよかったこと",
                  "仕事で一番悩んだ意思決定",
                  "「この会社、合わないな」と感じる瞬間",
                  "働く中で価値観が変わった経験",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#ffbb00]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">なぜ高専生が対象なのか</h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              高専生は、大学生よりも早い段階で専門分野を持ち、年上や社会人と話す機会が多い環境にいます。
              そのため「何を学ぶか」だけでなく、「どんな仕事を選ぶか」「どんな環境で働くか」を早くから考え始める傾向があります。
              進路はメーカーやITに限らず、コンサル、企画、ビジネス職など多岐にわたります。
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">企業にとってのメリット</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
                >
                  <div className="mb-3 inline-flex rounded-full bg-[#ffbb00]/20 px-3 py-1 text-xs font-semibold text-[#1a54c0]">
                    Merit
                  </div>
                  <h3 className="text-lg font-bold text-ink">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {benefit.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8">
              <h2 className="text-2xl font-bold text-ink">この交流会に向いている企業</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {fitList.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#1a54c0]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-[#E5E7EB] bg-[#FFF7E0] p-8">
              <h2 className="text-2xl font-bold text-ink">向いていない企業</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {notFitList.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#ffbb00]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">実施概要</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {overviewItems.map((item) => (
                <div key={item.label} className="rounded-2xl border border-[#F1F5F9] bg-[#F8FAFC] p-4">
                  <p className="text-xs font-semibold text-muted">{item.label}</p>
                  <p className="mt-2 text-sm font-semibold text-ink">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">参加までの流れ</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-[#E5E7EB] bg-white p-6"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1a54c0] text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted">{step.body}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted">
              ※ 無理な営業や継続契約の勧誘は行いません。
            </p>
          </div>

          <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">運営について</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              本交流会は、高専生向けキャリア支援を行う「高専ジョブ」が運営しています。
              学生が安心して参加できるよう、企業・学生双方にルールを設けた上で運営しています。
            </p>
          </div>

          <div className="rounded-[28px] bg-[#0B1B2B] px-8 py-10 text-white shadow-[0_20px_50px_rgba(11,27,43,0.35)]">
            <p className="text-sm text-white/70">最終CTA</p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              採用の前に、高専生と出会いませんか。
            </h2>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                className="inline-flex items-center justify-center rounded-full border-2 border-white bg-[#ffbb00] px-7 py-3 text-base font-bold text-black transition hover:-translate-y-0.5"
                href={FORM_URL}
                rel="noreferrer"
                target="_blank"
              >
                ▶ 高専生との交流会に参加する
              </Link>
              <span className="text-xs text-white/60">
                ※外部のGoogle Formsへ遷移します。
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
