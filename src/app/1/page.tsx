import type { CSSProperties } from "react";
import Link from "next/link";

const CONTACT_URL = "/contact";
const GOOGLE_FORMS_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeL5ZofENAObjrv10U7QBzFnRZzD829_iWpu_81sENt6s71RA/viewform";

const styleVars: CSSProperties = {
  "--lp-ink": "#1b1c1a",
  "--lp-ink-soft": "#3a3c39",
  "--lp-cream": "#f7f0e5",
  "--lp-sand": "#ead8b8",
  "--lp-sage": "#9bb29b",
  "--lp-teal": "#0d4c5c",
  "--lp-ember": "#e08b63",
  "--lp-brick": "#b4573b",
  "--lp-border": "#e1d2b9",
  "--lp-body": '"M PLUS 1p", "Noto Sans JP", sans-serif',
  "--lp-display": '"Noto Serif JP", "Noto Sans JP", serif',
} as CSSProperties;

const highlights = [
  {
    title: "全国の高専生に一度で会える",
    description:
      "学科や専攻を越えて、就活前の優秀層と会話できる交流会を設計します。",
  },
  {
    title: "事前ヒアリングでマッチ度を最適化",
    description:
      "貴社の募集要件や技術テーマをヒアリングし、参加学生を丁寧にアサイン。",
  },
  {
    title: "採用広報と技術広報を同時に",
    description:
      "単なる説明会ではなく、プロジェクトや開発文化が伝わる場を演出。",
  },
];

const packages = [
  {
    name: "交流会ライト",
    price: "50分のセッション",
    features: [
      "高専生20名前後と少人数対話",
      "事前アンケート回収",
      "運営サポート1名同席",
    ],
  },
  {
    name: "交流会スタンダード",
    price: "90分のセッション",
    features: [
      "高専生30〜40名と対話",
      "技術テーマ別のテーブル設計",
      "参加者レポートを共有",
    ],
  },
  {
    name: "交流会プレミアム",
    price: "120分 + アフターフォロー",
    features: [
      "高専生40名以上 + 面談導線",
      "会社紹介記事の制作",
      "参加後のリード管理支援",
    ],
  },
];

const flow = [
  {
    step: "01",
    title: "ヒアリング",
    description: "採用ターゲット・技術領域・期待成果を丁寧に確認します。",
  },
  {
    step: "02",
    title: "交流会設計",
    description: "参加学生像とプログラム構成を共同で設計します。",
  },
  {
    step: "03",
    title: "開催",
    description: "当日の運営とファシリテーションを高専ジョブが担当。",
  },
  {
    step: "04",
    title: "フォロー",
    description: "参加者レポートと次アクションを共有し、採用活動につなげます。",
  },
];

const faqs = [
  {
    question: "どの地域の高専生に会えますか？",
    answer:
      "全国の高専とのネットワークを活用し、テーマに合う学生の参加を調整します。",
  },
  {
    question: "オンライン開催と対面開催は選べますか？",
    answer:
      "はい。オンライン／対面／ハイブリッドの形式を目的に応じて提案します。",
  },
  {
    question: "採用直結の施策も相談できますか？",
    answer:
      "交流会後の面談・インターン導線まで含めてご相談可能です。",
  },
];

export default function CompanyMeetupLandingPage() {
  return (
    <div
      className="relative overflow-hidden bg-[var(--lp-cream)] text-[var(--lp-ink)]"
      style={styleVars}
    >
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full">
        <div
          className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(155,178,155,0.6),transparent_70%)] blur-3xl"
          style={{ animation: "floatSlow 12s ease-in-out infinite" }}
        />
        <div
          className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(224,139,99,0.5),transparent_65%)] blur-3xl"
          style={{ animation: "floatSlow 14s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(13,76,92,0.35),transparent_70%)] blur-3xl"
          style={{ animation: "floatSlow 16s ease-in-out infinite" }}
        />
      </div>

      <div
        className="mx-auto flex w-full max-w-[1180px] flex-col gap-16 px-5 pb-16 pt-14 font-[var(--lp-body)] sm:px-8 lg:px-10"
      >
        <header className="relative overflow-hidden rounded-[32px] border border-[var(--lp-border)] bg-white/70 p-8 shadow-[0_25px_80px_rgba(32,29,24,0.12)] backdrop-blur sm:p-12">
          <div className="absolute right-6 top-6 hidden items-center gap-2 rounded-full border border-[var(--lp-border)] bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--lp-ink-soft)] lg:flex">
            Meetups for Companies
          </div>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--lp-teal)]">
                高専ジョブ 交流会プログラム
              </p>
              <h1 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                <span className="block font-[var(--lp-display)]">
                  高専生との出会いを、
                </span>
                <span className="block font-[var(--lp-display)]">
                  採用につながる対話へ。
                </span>
              </h1>
              <p className="text-sm leading-relaxed text-[var(--lp-ink-soft)] sm:text-base">
                高専ジョブは「未来のエンジニアと企業が、肩書きではなく技術で話せる場」を設計します。
                交流会の目的設計から当日の運営、参加者フォローまで一気通貫で支援します。
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  className="rounded-full bg-[var(--lp-teal)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(13,76,92,0.35)] transition hover:-translate-y-0.5 hover:bg-[#0a3d4a]"
                  href={CONTACT_URL}
                >
                  交流会参加を相談する
                </Link>
                <Link
                  className="rounded-full border border-[var(--lp-teal)] px-6 py-3 text-sm font-semibold text-[var(--lp-teal)] transition hover:-translate-y-0.5 hover:bg-[rgba(13,76,92,0.08)]"
                  href={GOOGLE_FORMS_URL}
                  rel="noreferrer"
                  target="_blank"
                >
                  Googleフォームで相談する
                </Link>
              </div>
              <div className="grid gap-4 rounded-2xl border border-[var(--lp-border)] bg-white/80 p-5 text-xs text-[var(--lp-ink-soft)] sm:grid-cols-3">
                <div>
                  <p className="text-lg font-semibold text-[var(--lp-ink)]">全国</p>
                  <p>高専ネットワークに基づく参加者募集</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-[var(--lp-ink)]">共同設計</p>
                  <p>採用テーマに合わせたプログラム</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-[var(--lp-ink)]">運営支援</p>
                  <p>当日進行・レポート共有まで伴走</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -right-4 -top-6 hidden h-36 w-36 rounded-2xl border border-[var(--lp-border)] bg-white/80 p-4 text-xs text-[var(--lp-ink-soft)] shadow-[0_20px_40px_rgba(32,29,24,0.12)] lg:block">
                <p className="font-semibold text-[var(--lp-ink)]">交流会の目的</p>
                <p className="mt-2">学生との対話を通じ、相互理解と採用導線をつくること。</p>
              </div>
              <div className="relative overflow-hidden rounded-[28px] border border-[var(--lp-border)] bg-[linear-gradient(135deg,#ffffff,rgba(247,240,229,0.85))] p-8 shadow-[0_25px_60px_rgba(32,29,24,0.12)]">
                <div className="space-y-5">
                  <div className="rounded-2xl border border-[var(--lp-border)] bg-white/90 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--lp-ember)]">
                      curated matching
                    </p>
                    <p className="mt-3 text-sm text-[var(--lp-ink-soft)]">
                      事前ヒアリング内容をもとに、高専ジョブが参加学生を丁寧に設計します。
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[var(--lp-border)] bg-[var(--lp-teal)] p-5 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                      event experience
                    </p>
                    <p className="mt-3 text-sm text-white/90">
                      技術テーマ別の対話やミニワークで、自然なコミュニケーションを促進します。
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[var(--lp-border)] bg-white/90 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--lp-ember)]">
                      after follow
                    </p>
                    <p className="mt-3 text-sm text-[var(--lp-ink-soft)]">
                      参加後のレポート共有と次アクションまで設計し、採用へつなげます。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.5fr_1fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--lp-ember)]">
              Why Kosen Job
            </p>
            <h2 className="text-2xl font-semibold leading-snug sm:text-3xl">
              <span className="block font-[var(--lp-display)]">高専生の</span>
              <span className="block font-[var(--lp-display)]">
                “伸びしろ”に出会う
              </span>
            </h2>
            <p className="text-sm text-[var(--lp-ink-soft)]">
              学校内で完結しがちな就職活動に、リアルなプロダクトの話題と企業文化を届ける。
              交流会は「採用」と「広報」を同時に叶える場です。
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="group rounded-[24px] border border-[var(--lp-border)] bg-white/80 p-5 shadow-[0_20px_50px_rgba(32,29,24,0.08)] transition hover:-translate-y-1"
              >
                <div className="mb-4 h-10 w-10 rounded-full border border-[var(--lp-border)] bg-[rgba(155,178,155,0.25)]" />
                <h3 className="text-base font-semibold text-[var(--lp-ink)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--lp-ink-soft)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-[var(--lp-border)] bg-white/70 p-7 shadow-[0_25px_70px_rgba(32,29,24,0.1)] sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--lp-teal)]">
                Programs
              </p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                交流会パッケージ
              </h2>
            </div>
            <p className="text-sm text-[var(--lp-ink-soft)]">
              目的や採用規模に合わせて、柔軟にプログラムを設計します。
            </p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {packages.map((pack, index) => (
              <div
                key={pack.name}
                className={`rounded-[22px] border border-[var(--lp-border)] p-6 shadow-[0_20px_50px_rgba(32,29,24,0.08)] ${
                  index === 1
                    ? "bg-[var(--lp-teal)] text-white"
                    : "bg-white/90 text-[var(--lp-ink)]"
                }`}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.3em]">
                  {pack.name}
                </p>
                <p className="mt-3 text-lg font-semibold">
                  {pack.price}
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  {pack.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-current" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--lp-ember)]">
              Event Timeline
            </p>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              交流会の流れ
            </h2>
            <p className="text-sm text-[var(--lp-ink-soft)]">
              ヒアリングから開催後のフォローまで、最短3週間で開催可能です。
            </p>
            <div className="mt-6 space-y-4">
              {flow.map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 rounded-[20px] border border-[var(--lp-border)] bg-white/80 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--lp-teal)] text-sm font-semibold text-white">
                    {item.step}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-[var(--lp-ink)]">
                      {item.title}
                    </p>
                    <p className="text-sm text-[var(--lp-ink-soft)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6 rounded-[26px] border border-[var(--lp-border)] bg-[var(--lp-sand)]/70 p-6 shadow-[0_20px_60px_rgba(32,29,24,0.12)] sm:p-8">
            <h3 className="text-lg font-semibold text-[var(--lp-ink)]">
              交流会で扱うテーマ例
            </h3>
            <div className="grid gap-3 text-sm text-[var(--lp-ink-soft)] sm:grid-cols-2">
              {[
                "制御・ロボティクス",
                "AI・画像処理",
                "エネルギー・インフラ",
                "IoT・組み込み",
                "モビリティ",
                "サイバーセキュリティ",
              ].map((topic) => (
                <div
                  key={topic}
                  className="rounded-2xl border border-[var(--lp-border)] bg-white/80 px-4 py-3"
                >
                  {topic}
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-[var(--lp-border)] bg-white/80 p-4 text-sm">
              <p className="font-semibold text-[var(--lp-ink)]">参加学生像</p>
              <p className="mt-2 text-[var(--lp-ink-soft)]">
                ものづくり志向・技術探究志向の学生が中心。学校での研究内容や制作物を共有しながら対話します。
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-[var(--lp-border)] bg-white/80 p-8 shadow-[0_25px_70px_rgba(32,29,24,0.12)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--lp-teal)]">
                FAQ
              </p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                よくある質問
              </h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-[20px] border border-[var(--lp-border)] bg-white/90 p-5"
              >
                <p className="text-base font-semibold text-[var(--lp-ink)]">
                  {faq.question}
                </p>
                <p className="mt-3 text-sm text-[var(--lp-ink-soft)]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[32px] border border-[var(--lp-border)] bg-[var(--lp-teal)] px-8 py-10 text-white shadow-[0_30px_80px_rgba(13,76,92,0.35)] sm:px-12">
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-[rgba(255,255,255,0.12)] blur-3xl" />
          <div className="relative z-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
                Get in Touch
              </p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                交流会の企画相談、
                <br />
                いまから始めませんか？
              </h2>
              <p className="mt-3 text-sm text-white/80">
                目的・採用課題・開催時期を伺いながら、最適な交流会をご提案します。
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-[var(--lp-teal)] transition hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.9)]"
                href={CONTACT_URL}
              >
                相談を申し込む
              </Link>
              <Link
                className="rounded-full border border-white/60 px-6 py-3 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                href={GOOGLE_FORMS_URL}
                rel="noreferrer"
                target="_blank"
              >
                Googleフォームで質問
              </Link>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
