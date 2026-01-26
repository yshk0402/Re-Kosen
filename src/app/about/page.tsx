export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-6 px-4 py-10">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
          About
        </p>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          高専ジョブについて
        </h1>
      </header>
      <div className="space-y-10">
        <section className="space-y-2">
          <h2 className="font-display text-lg font-semibold text-ink">
            運営概要
          </h2>
          <p className="mt-2 text-sm text-muted">
            高専生が進路選択に必要な情報を、読みやすい構成で届けるキャリアメディアです。
            多様化する時代の中で、高専生一人ひとりが自分に合った進路を見つけられるようなメディア運営を心がけています。
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-semibold text-ink">
            編集方針
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>
              高専生が比較・検討できるよう、事実と意見を区別して整理します。
            </li>
            <li>一次情報や公式発表を優先して参照し、出典を明記します。</li>
            <li>
              特定の企業・サービスに偏らないよう、複数の視点を提示します。
            </li>
            <li>誤解を招く表現や過度な煽りを避け、読者の安心を優先します。</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-semibold text-ink">
            正確性と更新
          </h2>
          <p className="mt-2 text-sm text-muted">
            公開前に編集チェックを行い、誤りが判明した場合は速やかに修正します。
            重要な変更は記事内で注記し、更新日を明示する方針です。
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-semibold text-ink">
            広告・タイアップ
          </h2>
          <p className="mt-2 text-sm text-muted">
            広告・タイアップ・アフィリエイトの実施有無は
            有りです。実施する場合は記事内に明記し、編集内容は
            運営方針に基づき独立して判断します。
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-semibold text-ink">
            運営者情報
          </h2>
          <dl className="mt-3 grid gap-3 text-sm text-muted">
            <div className="grid gap-1 sm:grid-cols-[120px_1fr]">
              <dt className="font-semibold text-ink">運営者</dt>
              <dd>佐藤善彦</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[120px_1fr]">
              <dt className="font-semibold text-ink">所在地</dt>
              <dd>請求をいただければ遅滞なく開示いたします。</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[120px_1fr]">
              <dt className="font-semibold text-ink">連絡先</dt>
              <dd>
                メール（y.sugar0402@gmail.com）電話（請求をいただければ遅滞なく開示いたします。）
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}
