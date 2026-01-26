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

const keyBullets = [
  "全国の高専から参加学生を招集",
  "技術テーマに合わせた交流会設計",
  "開催後のフォローまで一気通貫",
];

const painPoints = [
  {
    title: "忙しくて設計できない",
    description: "社内の採用担当が企画に時間を割けない。",
  },
  {
    title: "学生像が見えない",
    description: "参加学生の志向やレベルが事前に分からない。",
  },
  {
    title: "次の導線が弱い",
    description: "交流会後の接点が続かず、採用につながらない。",
  },
];

const features = [
  {
    title: "事前ヒアリング",
    description: "採用ターゲット・研究領域・期待成果を丁寧に整理。",
  },
  {
    title: "学生アサイン",
    description: "全国の高専ネットワークからテーマに合う学生を選定。",
  },
  {
    title: "当日ファシリ",
    description: "学生が話しやすい導入・対話設計を運営チームが支援。",
  },
  {
    title: "アフターフォロー",
    description: "参加レポートと次アクションを共有し、採用につなげます。",
  },
];

const metrics = [
  {
    label: "参加企業数",
    value: "70社+",
    description: "全国の採用・技術広報チームが参加。",
  },
  {
    label: "最短準備期間",
    value: "3週間",
    description: "ヒアリングから開催まで最短で実施。",
  },
  {
    label: "満足度",
    value: "98%",
    description: "参加後アンケートで高評価を維持。",
  },
];

const logos = [
  "KosenTech",
  "NeoFactory",
  "Dynamo",
  "Seabird",
  "Hikari",
  "Graphene",
  "LoopWorks",
  "Atlas",
  "Orion",
  "Horizon",
  "Spark",
  "Vertex",
];

const plans = [
  {
    name: "ライト",
    price: "¥100,000〜",
    features: [
      "参加学生20名前後",
      "50分のプログラム",
      "事前アンケート付き",
    ],
  },
  {
    name: "スタンダード",
    price: "¥150,000〜",
    features: [
      "参加学生30〜40名",
      "90分のプログラム",
      "参加レポート共有",
    ],
  },
  {
    name: "プレミアム",
    price: "¥200,000〜",
    features: [
      "参加学生40名以上",
      "120分 + 面談導線",
      "記事制作サポート",
    ],
  },
];

const team = [
  {
    name: "佐藤 善彦",
    role: "プログラムディレクター",
    bio: "高専キャリア支援の企画・運営を担当。学生と企業双方の目的設計に強み。",
  },
  {
    name: "平川 浩介",
    role: "リレーション担当",
    bio: "企業ヒアリングから学生のアサインまでを担当。技術広報の文脈も整理。",
  },
  {
    name: "早川 大介",
    role: "ファシリテーター",
    bio: "交流会当日の進行と場づくりを担当。対話が生まれる空気を設計。",
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

      <div className="mx-auto flex w-full max-w-[980px] flex-col gap-16 px-5 pb-20 pt-14 font-[var(--lp-body)] sm:px-8">
        <header className="rounded-[28px] border border-[var(--lp-border)] bg-white/70 p-8 text-center shadow-[0_25px_80px_rgba(32,29,24,0.12)] backdrop-blur sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--lp-teal)]">
            交流会プログラム
          </p>
          <div className="mt-4 flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[var(--lp-brick)] text-sm font-semibold text-white">
                KJ
              </span>
              <h1 className="text-3xl font-semibold sm:text-4xl">
                <span className="font-[var(--lp-display)]">Kosen Job</span>
                <span className="block text-base font-medium text-[var(--lp-ink-soft)]">
                  企業向け交流会
                </span>
              </h1>
            </div>
            <p className="mt-3 text-sm text-[var(--lp-ink-soft)] sm:text-base">
              高専生との対話を、採用に直結する出会いへ。企画から運営まで一括支援します。
            </p>
          </div>
          <div className="mt-6 grid gap-3 text-sm text-[var(--lp-ink-soft)] sm:grid-cols-3">
            {keyBullets.map((item) => (
              <div
                key={item}
                className="rounded-full border border-[var(--lp-border)] bg-white/80 px-4 py-2"
              >
                {item}
              </div>
            ))}
          </div>
        </header>

        <section className="text-center">
          <p className="text-sm font-semibold text-[var(--lp-ember)]">
            交流会でよくある課題
          </p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
            交流会レビューの悩みを解決します
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {painPoints.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-[var(--lp-border)] bg-white/80 px-4 py-6 text-sm shadow-[0_20px_50px_rgba(32,29,24,0.08)]"
              >
                <div className="mx-auto mb-4 h-12 w-12 rounded-full border border-[var(--lp-border)] bg-[rgba(155,178,155,0.25)]" />
                <p className="font-semibold text-[var(--lp-ink)]">
                  {item.title}
                </p>
                <p className="mt-2 text-[var(--lp-ink-soft)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-[var(--lp-border)] bg-white/70 p-8 shadow-[0_25px_70px_rgba(32,29,24,0.1)]">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--lp-teal)]">
              Features
            </p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              高専ジョブの特徴
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {features.map((item) => (
              <div
                key={item.title}
                className="rounded-[22px] border border-[var(--lp-border)] bg-white/90 p-6 shadow-[0_18px_40px_rgba(32,29,24,0.08)]"
              >
                <p className="text-base font-semibold text-[var(--lp-ink)]">
                  {item.title}
                </p>
                <p className="mt-2 text-sm text-[var(--lp-ink-soft)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--lp-ember)]">
            Results
          </p>
          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
            実績とスピード
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {metrics.map((item) => (
              <div
                key={item.label}
                className="rounded-[20px] border border-[var(--lp-border)] bg-white/90 p-5"
              >
                <p className="text-xs text-[var(--lp-ink-soft)]">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-[var(--lp-ink)]">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-[var(--lp-ink-soft)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-[var(--lp-border)] bg-white/70 p-8 text-center shadow-[0_25px_70px_rgba(32,29,24,0.1)]">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--lp-teal)]">
            Clients
          </p>
          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
            クライアント企業の皆様
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-3 text-xs text-[var(--lp-ink-soft)] sm:grid-cols-4">
            {logos.map((logo) => (
              <div
                key={logo}
                className="rounded-full border border-[var(--lp-border)] bg-white/90 px-4 py-2"
              >
                {logo}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-[var(--lp-border)] bg-white/70 p-8 shadow-[0_25px_70px_rgba(32,29,24,0.1)]">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--lp-ember)]">
              Pricing
            </p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              プラン・料金
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`rounded-[22px] border border-[var(--lp-border)] p-6 shadow-[0_18px_40px_rgba(32,29,24,0.08)] ${
                  index === 1
                    ? "bg-[var(--lp-teal)] text-white"
                    : "bg-white/90 text-[var(--lp-ink)]"
                }`}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.3em]">
                  {plan.name}
                </p>
                <p className="mt-3 text-lg font-semibold">
                  {plan.price}
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  {plan.features.map((feature) => (
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

        <section>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--lp-teal)]">
              Team
            </p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              企画を支えるチーム
            </h2>
          </div>
          <div className="mt-8 space-y-8">
            {team.map((member, index) => {
              const isReversed = index % 2 === 1;
              return (
                <div
                  key={member.name}
                  className="grid items-center gap-6 rounded-[26px] border border-[var(--lp-border)] bg-white/80 p-6 shadow-[0_20px_50px_rgba(32,29,24,0.08)] sm:grid-cols-[1.2fr_0.8fr]"
                >
                  <div className={isReversed ? "sm:order-2" : ""}>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--lp-ember)]">
                    {member.role}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-[var(--lp-ink)]">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--lp-ink-soft)]">
                    {member.bio}
                  </p>
                </div>
                <div
                  className={`h-44 w-full rounded-[20px] border border-[var(--lp-border)] bg-[linear-gradient(135deg,rgba(155,178,155,0.35),rgba(224,139,99,0.35))] ${
                    isReversed ? "sm:order-1" : ""
                  }`}
                />
              </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-[28px] border border-[var(--lp-border)] bg-white/80 p-8 shadow-[0_25px_70px_rgba(32,29,24,0.12)]">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--lp-ember)]">
              Contact
            </p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              お問い合わせ
            </h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4 text-sm text-[var(--lp-ink-soft)]">
              <p>
                交流会の目的・開催時期・参加対象などを簡単にお知らせください。
              </p>
              <p>
                詳細ヒアリングは担当者より改めてご連絡します。
              </p>
            </div>
            <div className="space-y-4">
              {[
                "会社名",
                "ご担当者名",
                "メールアドレス",
                "想定の開催時期",
              ].map((label) => (
                <label key={label} className="block text-xs text-[var(--lp-ink-soft)]">
                  {label}
                  <input
                    className="mt-2 w-full rounded-full border border-[var(--lp-border)] bg-white/90 px-4 py-2 text-sm text-[var(--lp-ink)]"
                    placeholder={label}
                  />
                </label>
              ))}
              <label className="block text-xs text-[var(--lp-ink-soft)]">
                相談内容
                <textarea
                  className="mt-2 min-h-[120px] w-full rounded-[18px] border border-[var(--lp-border)] bg-white/90 px-4 py-3 text-sm text-[var(--lp-ink)]"
                  placeholder="採用課題や交流会の目的など"
                />
              </label>
              <Link
                className="block rounded-full bg-[var(--lp-teal)] px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_12px_30px_rgba(13,76,92,0.35)] transition hover:-translate-y-0.5 hover:bg-[#0a3d4a]"
                href={GOOGLE_FORMS_URL}
                rel="noreferrer"
                target="_blank"
              >
                Googleフォームで送信する
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-[var(--lp-border)] bg-[var(--lp-teal)] px-8 py-10 text-white shadow-[0_30px_80px_rgba(13,76,92,0.35)]">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
              Get in Touch
            </p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              交流会の企画相談を
              <br />
              いまから始めませんか？
            </h2>
            <p className="mt-3 text-sm text-white/80">
              目的・採用課題・開催時期を伺いながら、最適な交流会をご提案します。
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
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
        </section>
      </div>
    </div>
  );
}
