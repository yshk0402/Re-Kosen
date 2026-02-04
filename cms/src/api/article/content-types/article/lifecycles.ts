import { errors } from "@strapi/utils";

const { ValidationError } = errors;
const ARTICLE_UID = "api::article.article";

const normalizeBlocks = (blocks: unknown) =>
  Array.isArray(blocks) ? blocks : [];

type UnknownRecord = Record<string, unknown>;

const getComponent = (block: unknown) => {
  if (!block || typeof block !== "object") {
    return null;
  }
  const component = (block as UnknownRecord).__component;
  return typeof component === "string" ? component : null;
};

const getImageAlt = (block: unknown) => {
  if (!block || typeof block !== "object") {
    return "";
  }
  const record = block as UnknownRecord;
  const alt =
    typeof record.alt === "string"
      ? record.alt
      : typeof record.alt_text === "string"
        ? record.alt_text
        : "";
  return alt.trim();
};

const hasSummaryCard = (blocks: unknown[]) =>
  blocks.some((block) => getComponent(block) === "article.summary-card");

const hasMissingImageAlt = (blocks: unknown[]) =>
  blocks.some((block) => {
    if (getComponent(block) !== "article.image") {
      return false;
    }
    return !getImageAlt(block);
  });

const resolveTagCount = (value: unknown, fallback: number) => {
  if (value === undefined) {
    return fallback;
  }
  if (value === null) {
    return 0;
  }
  if (Array.isArray(value)) {
    return value.length;
  }
  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (Array.isArray(record.set)) {
      return record.set.length;
    }
    if (Array.isArray(record.connect)) {
      return record.connect.length;
    }
    if (Array.isArray(record.data)) {
      return record.data.length;
    }
  }
  return fallback;
};

const resolveText = (value: unknown, fallback: string) =>
  typeof value === "string" ? value : fallback;

const resolveSeo = (value: unknown, fallback: Record<string, unknown>) =>
  value && typeof value === "object" ? (value as UnknownRecord) : fallback;

const resolveMedia = (value: unknown, fallback: unknown) =>
  value !== undefined ? value : fallback;

const ensureArticleValidation = async (data: Record<string, unknown>, id?: number) => {
  const existing = id
    ? await strapi.entityService.findOne(ARTICLE_UID, id, {
        populate: ["tags", "seo", "blocks", "coverImage"],
      })
    : null;

  const existingAttrs = (existing as { [key: string]: unknown }) || {};
  const excerpt = resolveText(data.excerpt, (existingAttrs.excerpt as string) ?? "");
  const title = resolveText(data.title, (existingAttrs.title as string) ?? "");
  const blocks = normalizeBlocks(
    data.blocks ?? (existingAttrs.blocks as unknown),
  );
  const seo = resolveSeo(
    data.seo,
    (existingAttrs.seo as Record<string, unknown>) ?? {},
  );
  const coverImage = resolveMedia(data.coverImage, existingAttrs.coverImage);

  const tagCount = resolveTagCount(
    data.tags,
    resolveTagCount(existingAttrs.tags, 0),
  );

  if (!excerpt.trim()) {
    throw new ValidationError("excerpt は必須です。30〜120字を入力してください。");
  }
  if (excerpt.trim().length < 30 || excerpt.trim().length > 120) {
    throw new ValidationError("excerpt は30〜120字で入力してください。");
  }
  if (tagCount < 1) {
    throw new ValidationError("tags は1つ以上必須です。");
  }
  if (!blocks.length) {
    throw new ValidationError("blocks は必須です。");
  }
  if (!hasSummaryCard(blocks)) {
    throw new ValidationError("Summary Card ブロックを最低1つ追加してください。");
  }
  if (hasMissingImageAlt(blocks)) {
    throw new ValidationError("Image ブロックの alt は必須です。");
  }

  let metaTitle = typeof seo.metaTitle === "string" ? seo.metaTitle.trim() : "";
  let metaDescription =
    typeof seo.metaDescription === "string" ? seo.metaDescription.trim() : "";
  if (!metaTitle || !metaDescription) {
    const fallbackTitle = metaTitle || title.trim();
    const fallbackDescription = metaDescription || excerpt.trim();
    if (fallbackTitle && fallbackDescription) {
      metaTitle = fallbackTitle;
      metaDescription = fallbackDescription;
      data.seo = {
        ...(seo as Record<string, unknown>),
        metaTitle,
        metaDescription,
      };
    } else {
      throw new ValidationError("SEO の metaTitle と metaDescription は必須です。");
    }
  }

  const ogImage = (seo as { ogImage?: unknown }).ogImage;
  if (!ogImage && !coverImage) {
    throw new ValidationError("OGP画像を設定してください（seo.ogImage または coverImage）。");
  }
};

export default {
  async beforeCreate(event) {
    await ensureArticleValidation(event.params.data);
  },
  async beforeUpdate(event) {
    const id = event.params?.where?.id;
    await ensureArticleValidation(event.params.data, typeof id === "number" ? id : undefined);
  },
};
