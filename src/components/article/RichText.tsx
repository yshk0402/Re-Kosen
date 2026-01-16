import sanitizeHtml from "sanitize-html";

const allowedTags = [
  "p",
  "br",
  "strong",
  "b",
  "a",
  "ul",
  "ol",
  "li",
  "blockquote",
];

const allowedAttributes = {
  a: ["href", "target", "rel"],
};

const sanitize = (html: string) =>
  sanitizeHtml(html, {
    allowedTags,
    allowedAttributes,
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href ?? "";
        const isExternal = /^https?:\/\//i.test(href);
        return {
          tagName,
          attribs: {
            ...attribs,
            ...(isExternal
              ? { rel: "noopener noreferrer", target: "_blank" }
              : {}),
          },
        };
      },
    },
  });

const escapeText = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

type RichTextProps = {
  content: string | string[];
  className?: string;
};

export default function RichText({ content, className }: RichTextProps) {
  if (Array.isArray(content)) {
    return (
      <div className={`space-y-4 ${className ?? ""}`.trim()}>
        {content.map((paragraph, index) => (
          <p
            key={`${index}-${paragraph}`}
            className="text-sm leading-relaxed text-ink sm:text-base"
          >
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  const sanitized = sanitize(content);
  const normalized = sanitized.includes("<")
    ? sanitized
    : `<p>${escapeText(sanitized)}</p>`;

  return (
    <div
      className={`space-y-4 text-sm leading-relaxed text-ink sm:text-base [&_a]:font-semibold [&_a]:text-brand [&_a]:underline-offset-4 hover:[&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-brand/40 [&_blockquote]:pl-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 ${
        className ?? ""
      }`.trim()}
      dangerouslySetInnerHTML={{ __html: normalized }}
    />
  );
}
