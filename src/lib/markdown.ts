import { marked } from "marked";
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
  "h2",
  "h3",
  "h4",
];

const allowedAttributes: sanitizeHtml.IOptions["allowedAttributes"] = {
  a: ["href", "target", "rel"],
  h2: ["id"],
  h3: ["id"],
  h4: ["id"],
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

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, "");

const normalizeHeadingLevel = (level: number): 2 | 3 | 4 => {
  if (level <= 2) {
    return 2;
  }
  if (level === 3) {
    return 3;
  }
  return 4;
};

const normalizeHeadingText = (value: string) => {
  const parsed = marked.parseInline(value, {
    gfm: true,
    mangle: false,
    headerIds: false,
  });
  const html = typeof parsed === "string" ? parsed : value;
  return stripHtml(html).replace(/\s+/g, " ").trim();
};

export type MarkdownHeading = {
  id: string;
  text: string;
  level: 2 | 3 | 4;
};

export type MarkdownRenderResult = {
  html: string;
  headings: MarkdownHeading[];
};

export const renderMarkdown = (
  markdown: string,
  createAnchor: (text: string, fallback: string) => string,
): MarkdownRenderResult => {
  if (!markdown.trim()) {
    return { html: "", headings: [] };
  }

  const tokens = marked.lexer(markdown);
  const headingTokens = tokens.filter(
    (token): token is marked.Tokens.Heading => token.type === "heading",
  );

  const headingIds: string[] = [];
  const headings: MarkdownHeading[] = headingTokens.map((token, index) => {
    const text = normalizeHeadingText(token.text ?? "");
    const id = createAnchor(text, `md-section-${index + 1}`);
    headingIds.push(id);
    return {
      id,
      text: text || `Section ${index + 1}`,
      level: normalizeHeadingLevel(token.depth ?? 2),
    };
  });

  let headingIndex = 0;
  const renderer = new marked.Renderer();
  renderer.heading = (text, level) => {
    const normalized = normalizeHeadingLevel(level);
    const id =
      headingIds[headingIndex] ??
      createAnchor(normalizeHeadingText(text), `md-section-${headingIndex + 1}`);
    headingIndex += 1;
    return `<h${normalized} id="${id}">${text}</h${normalized}>`;
  };

  const rawHtml = marked.parse(markdown, {
    renderer,
    gfm: true,
    breaks: true,
    mangle: false,
    headerIds: false,
  });

  const html = typeof rawHtml === "string" ? sanitize(rawHtml) : "";

  return { html, headings };
};
