const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const isSafeHref = (href: string) =>
  href.startsWith("/") || /^(https?:|mailto:)/i.test(href);

type InlineNode = {
  text?: string;
  bold?: boolean;
  url?: string;
  href?: string;
  children?: unknown;
  type?: string;
};

const renderInline = (node: unknown): string => {
  if (typeof node === "string") {
    return escapeHtml(node);
  }
  if (!isRecord(node)) {
    return "";
  }

  const text = typeof node.text === "string" ? node.text : undefined;
  const rawType = typeof node.type === "string" ? node.type : undefined;
  const bold = node.bold === true;

  const rawChildren = node.children;
  const children = Array.isArray(rawChildren)
    ? rawChildren.map(renderInline).join("")
    : text
      ? escapeHtml(text)
      : "";

  if (rawType === "link") {
    const href =
      typeof (node as InlineNode).url === "string"
        ? (node as InlineNode).url
        : typeof (node as InlineNode).href === "string"
          ? (node as InlineNode).href
          : "";
    if (href && isSafeHref(href)) {
      return `<a href="${escapeHtml(href)}">${children}</a>`;
    }
    return children;
  }

  if (bold) {
    return `<strong>${children}</strong>`;
  }

  return children;
};

type BlockNode = {
  type?: string;
  format?: string;
  children?: unknown;
};

const renderBlock = (node: unknown): string => {
  if (!isRecord(node)) {
    return "";
  }

  const type = typeof (node as BlockNode).type === "string" ? node.type : "";
  const rawChildren = (node as BlockNode).children;
  const children: unknown[] = Array.isArray(rawChildren) ? rawChildren : [];

  if (type === "paragraph" || type === "heading") {
    const html = children.map(renderInline).join("");
    if (!html.trim()) {
      return "";
    }
    return `<p>${html.replace(/\n/g, "<br />")}</p>`;
  }

  if (type === "quote" || type === "blockquote") {
    const html = children.map(renderInline).join("");
    if (!html.trim()) {
      return "";
    }
    return `<blockquote>${html.replace(/\n/g, "<br />")}</blockquote>`;
  }

  if (type === "list") {
    const format =
      typeof (node as BlockNode).format === "string" ? node.format : "";
    const tag = format === "ordered" ? "ol" : "ul";
    const items = children
      .map((child: unknown) => {
        if (isRecord(child) && child.type === "list-item") {
          const itemRawChildren = child.children;
          const itemChildren: unknown[] = Array.isArray(itemRawChildren)
            ? itemRawChildren
            : [];
          const itemHtml = itemChildren.map(renderInline).join("");
          return itemHtml.trim() ? `<li>${itemHtml}</li>` : "";
        }
        const fallback = renderInline(child);
        return fallback.trim() ? `<li>${fallback}</li>` : "";
      })
      .filter(Boolean)
      .join("");

    return items ? `<${tag}>${items}</${tag}>` : "";
  }

  if (children.length) {
    const html = children.map(renderInline).join("");
    if (!html.trim()) {
      return "";
    }
    return `<p>${html.replace(/\n/g, "<br />")}</p>`;
  }

  return "";
};

export const strapiBlocksToHtml = (value: unknown): string => {
  if (typeof value === "string") {
    return value;
  }
  if (!Array.isArray(value)) {
    return "";
  }
  return value.map(renderBlock).filter(Boolean).join("");
};

const extractTextFromInline = (node: unknown): string => {
  if (typeof node === "string") {
    return node;
  }
  if (!isRecord(node)) {
    return "";
  }
  if (typeof node.text === "string") {
    return node.text;
  }
  const children = Array.isArray(node.children) ? node.children : [];
  return children.map(extractTextFromInline).join("");
};

const extractTextFromBlock = (node: unknown): string => {
  if (!isRecord(node)) {
    return "";
  }
  const children = Array.isArray(node.children) ? node.children : [];
  if (node.type === "list") {
    return children
      .map((child: unknown) => {
        if (isRecord(child) && child.type === "list-item") {
          const itemRawChildren = child.children;
          const itemChildren: unknown[] = Array.isArray(itemRawChildren)
            ? itemRawChildren
            : [];
          return itemChildren.map(extractTextFromInline).join("");
        }
        return extractTextFromInline(child);
      })
      .filter(Boolean)
      .join(" ");
  }
  return children.map(extractTextFromInline).join("");
};

export const strapiBlocksToPlainText = (value: unknown): string => {
  if (typeof value === "string") {
    return value;
  }
  if (!Array.isArray(value)) {
    return "";
  }
  return value
    .map(extractTextFromBlock)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
};
