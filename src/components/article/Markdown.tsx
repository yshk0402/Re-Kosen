type MarkdownProps = {
  html: string;
  className?: string;
};

export default function Markdown({ html, className }: MarkdownProps) {
  if (!html.trim()) {
    return null;
  }

  return (
    <div
      className={`space-y-4 text-sm leading-relaxed text-ink sm:text-base [&_a]:font-semibold [&_a]:text-brand [&_a]:underline-offset-4 hover:[&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-brand/40 [&_blockquote]:pl-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_h2]:scroll-mt-24 [&_h2]:border-b [&_h2]:border-border/80 [&_h2]:pb-3 [&_h2]:font-display [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h3]:scroll-mt-24 [&_h3]:font-display [&_h3]:text-xl [&_h4]:scroll-mt-24 [&_h4]:text-lg [&_h4]:font-semibold ${
        className ?? ""
      }`.trim()}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
