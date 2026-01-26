export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-6 px-4 py-10">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
          Privacy
        </p>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          プライバシーポリシー
        </h1>
      </header>
      <div className="space-y-10">
        <section className="space-y-2">
          <h2 className="font-display text-lg font-semibold text-ink">
            基本方針
          </h2>
          <p className="mt-2 text-sm text-muted">
            高専ジョブ（以下「当サイト」）は、個人情報の保護を重要な責務と認識し、
            適切な取得・利用・管理に努めます。本ポリシーは当サイト上で提供する
            サービスに適用されます。
          </p>
          <dl className="mt-4 grid gap-3 text-sm text-muted">
            <div className="grid gap-1 sm:grid-cols-[120px_1fr]">
              <dt className="font-semibold text-ink">制定日</dt>
              <dd>2026/01/25</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[120px_1fr]">
              <dt className="font-semibold text-ink">最終改定日</dt>
              <dd>2026/01/21</dd>
            </div>
          </dl>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-semibold text-ink">
            取得する情報
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>
              お問い合わせフォーム等で入力された情報（所属（法人名・学校名）・氏名・お問い合わせ内容）
            </li>
            <li>
              LINE公式アカウント等を通じて取得する情報（在籍校・学年・氏名）
            </li>
            <li>
              アクセス解析やセキュリティ目的で取得するアクセスログ（IPアドレス、
              ユーザーエージェント、閲覧履歴、Cookie等）
            </li>
            <li>その他、ユーザーが任意に提供する情報</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-semibold text-ink">
            利用目的
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>お問い合わせへの対応、必要な連絡</li>
            <li>記事やサービスの改善、品質向上のための分析</li>
            <li>重要なお知らせの通知</li>
            <li>不正行為やスパム対応、セキュリティ確保</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-semibold text-ink">
            第三者提供・委託
          </h2>
          <p className="mt-2 text-sm text-muted">
            法令に基づく場合等を除き、ご本人の同意なく第三者に提供しません。
            サービス提供のために業務委託先へ取り扱いを委託する場合は、適切に
            監督します。
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>ホスティング：Vercel</li>
            <li>CMS/メディア管理：佐藤善彦</li>
            <li>アクセス解析：GA4</li>
            <li>お問い合わせフォーム：Google Form</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-semibold text-ink">
            Cookie等の利用
          </h2>
          <p className="mt-2 text-sm text-muted">
            当サイトはCookie等を利用する場合があります。ブラウザ設定で無効化
            できますが、機能に影響が出る場合があります。
            （同意取得は行っていません）
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-semibold text-ink">
            安全管理
          </h2>
          <p className="mt-2 text-sm text-muted">
            個人情報への不正アクセス、漏えい、改ざん等を防止するため、合理的な
            安全管理措置を講じます。
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-semibold text-ink">
            開示・訂正・削除等
          </h2>
          <p className="mt-2 text-sm text-muted">
            ご本人からの開示・訂正・削除・利用停止等のご請求は、
            contactページにて受け付けます。
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-semibold text-ink">
            お問い合わせ窓口
          </h2>
          <dl className="mt-3 grid gap-3 text-sm text-muted">
            <div className="grid gap-1 sm:grid-cols-[120px_1fr]">
              <dt className="font-semibold text-ink">運営者</dt>
              <dd>佐藤善彦</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[120px_1fr]">
              <dt className="font-semibold text-ink">連絡先</dt>
              <dd>
                メール（y.sugar0402@gmail.com）電話（請求をいただければ遅滞なく開示いたします。）
              </dd>
            </div>
          </dl>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-semibold text-ink">改定</h2>
          <p className="mt-2 text-sm text-muted">
            本ポリシーの内容は適宜見直し、重要な変更がある場合は当サイト上で
            告知します。
          </p>
        </section>
      </div>
    </div>
  );
}
