import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

const FORM_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || "#";

export const metadata: Metadata = {
  title: "高専生と採用前に出会える交流プラットフォーム",
  description:
    "採用活動で高専生と出会えない企業向けに、業界・職種を問わず交流できる場を提供します。",
};

const points = [
  {
    number: "01",
    title: "「選考が始まる前」の\n高専生に接点を持てる",
  },
  {
    number: "02",
    title: "就活用に整えられていない\n「判断軸」が見える",
  },
  {
    number: "03",
    title: "採用競争に巻き込まれず\n記憶に残る",
  },
];

const flowSteps = [
  {
    title: "お申し込み",
    body: "無料で相談するボタンからGoogle Formに必要情報をご連絡ください。",
  },
  {
    title: "お打ち合わせ",
    body: "2営業日以内にご連絡を差し上げます。\n本サービスの趣旨や当日の運営ルールなどをご説明し、貴社の参加目的・懸念点をすり合わせます。",
  },
  {
    title: "交流会参加",
    body: "すり合わせ内容を踏まえたうえで、高専生との交流会にご参加ください。",
  },
];

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute left-1/2 top-[-240px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#ffbb00]/18 blur-[160px]" />
      <div className="pointer-events-none absolute right-[-120px] top-[420px] hidden h-[520px] w-[520px] rounded-full bg-[#1a54c0]/15 blur-[180px] lg:block" />

      <div className="mx-auto w-full max-w-[1440px] px-4 pb-20 pt-8 lg:px-10">
        <header className="flex items-center justify-between rounded-2xl border border-[#E3D8CA] bg-white px-5 py-4 shadow-[0_6px_20px_rgba(20,20,20,0.06)]">
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
            無料で相談する
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-full border-2 border-black bg-[#ffbb00] px-4 py-2 text-xs font-bold text-black transition hover:-translate-y-0.5 lg:hidden"
            href={FORM_URL}
            rel="noreferrer"
            target="_blank"
          >
            無料で相談する
          </Link>
        </header>

        <div className="relative mt-12 grid gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold text-[#1a54c0]">
              高専生と企業が自然に出会うことができる
            </p>
            <h1 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-5xl">
              「採用活動で高専生と出会えない...」
              <br />
              そんなお悩みをお持ちではありませんか？？
            </h1>
            <p className="max-w-[36rem] text-base leading-relaxed text-muted sm:text-lg">
              高専ジョブは業界・職種を問わず、高専生と企業が採用前に出会える交流プラットフォームです。
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                className="inline-flex items-center justify-center rounded-full border-2 border-black bg-[#ffbb00] px-7 py-3 text-base font-bold text-black shadow-[0_6px_16px_rgba(0,0,0,0.1)] transition hover:-translate-y-0.5"
                href={FORM_URL}
                rel="noreferrer"
                target="_blank"
              >
                無料で相談する
              </Link>
              <p className="text-xs text-muted">
                ※外部のGoogle Formsへ遷移します。
              </p>
            </div>
            <p className="text-lg font-semibold text-ink">
              今まで出会えなかった
              <br />
              高専生に出会うなら
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-6 hidden h-28 w-28 rounded-full bg-[#ffbb00]/30 blur-2xl lg:block" />
            <div className="overflow-hidden rounded-[32px] border border-[#E5E7EB] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
              <Image
                alt="高専生との交流イメージ"
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
        <div className="mx-auto w-full max-w-[1200px] space-y-14 px-4 lg:px-10">
          <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">
              就職活動の前提が違い、一般の採用市場に高専生は居ない
            </h2>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-[720px] w-full border-separate border-spacing-0 text-sm">
                <thead>
                  <tr className="text-left text-muted">
                    <th className="border-b border-[#E5E7EB] px-4 py-3">応募形態</th>
                    <th className="border-b border-[#E5E7EB] px-4 py-3">企業との接点</th>
                    <th className="border-b border-[#E5E7EB] px-4 py-3">就活行動</th>
                    <th className="border-b border-[#E5E7EB] px-4 py-3">有効求人倍率</th>
                  </tr>
                </thead>
                <tbody className="text-ink">
                  <tr>
                    <td className="border-b border-[#F1F5F9] px-4 py-4 font-semibold">
                      一般的な大卒就活生
                    </td>
                    <td className="border-b border-[#F1F5F9] px-4 py-4">オープンで多数</td>
                    <td className="border-b border-[#F1F5F9] px-4 py-4">
                      自己分析・企業研究を徹底的に行う
                    </td>
                    <td className="border-b border-[#F1F5F9] px-4 py-4">1.66倍</td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#F1F5F9] px-4 py-4 font-semibold">
                      高専生
                    </td>
                    <td className="border-b border-[#F1F5F9] px-4 py-4">学内に閉ざされている</td>
                    <td className="border-b border-[#F1F5F9] px-4 py-4">
                      面接対策のみ
                    </td>
                    <td className="border-b border-[#F1F5F9] px-4 py-4">20倍以上</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted">
              ※1 2025年度の広報誌「国立高専機構 概要」より
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-ink">大きな</span>
              <span className="text-4xl font-extrabold text-[#ffbb00]">3つ</span>
              <span className="text-2xl font-bold text-ink">のポイント</span>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {points.map((point) => (
                <div
                  key={point.number}
                  className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
                >
                  <div className="text-3xl font-extrabold text-[#ffbb00]">
                    {point.number}
                  </div>
                  <p className="mt-3 whitespace-pre-line text-base font-semibold text-ink">
                    {point.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">交流会までの流れ</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {flowSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-[#E5E7EB] bg-white p-6"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1a54c0] text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 whitespace-pre-line text-sm text-muted">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-[#0B1B2B] px-8 py-10 text-white shadow-[0_20px_50px_rgba(11,27,43,0.35)]">
            <h2 className="text-2xl font-bold sm:text-3xl">
              今まで出会えなかった高専生に出会うなら
            </h2>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                className="inline-flex items-center justify-center rounded-full border-2 border-white bg-[#ffbb00] px-7 py-3 text-base font-bold text-black transition hover:-translate-y-0.5"
                href={FORM_URL}
                rel="noreferrer"
                target="_blank"
              >
                無料で相談する
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
