/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID || "520303035";
const GSC_SITE_URL = process.env.GSC_SITE_URL || "https://www.kosen-job.com/";
const KEY_PATH =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  process.env.GCP_SA_KEY_PATH ||
  "";
const TIMEZONE = process.env.REPORT_TIMEZONE || "Asia/Tokyo";
const REPORTS_DIR = process.env.REPORTS_DIR || "reports";
const CV_EVENT_NAMES = (process.env.CV_EVENT_NAMES || "cta_clicked,form_submitted")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

function formatDate(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function normalizePathFromUrl(url) {
  try {
    const u = new URL(url);
    return u.pathname.replace(/\/$/, "") || "/";
  } catch {
    return url.replace(/https?:\/\/[^/]+/i, "").replace(/\/$/, "") || "/";
  }
}

function safeNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function scorePage({ clicks, ctr, position, engagementRate }) {
  const ctrPct = ctr * 100;
  const posScore = position > 0 ? (1 / position) * 100 : 0;
  const engagementPct = engagementRate * 100;
  return (
    clicks * 1.0 + ctrPct * 0.5 + posScore * 0.3 + engagementPct * 0.2
  );
}

async function ensureAuth() {
  if (!KEY_PATH || !fs.existsSync(KEY_PATH)) {
    throw new Error(
      "Service account key not found. Set GOOGLE_APPLICATION_CREDENTIALS or GCP_SA_KEY_PATH."
    );
  }
  return new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: [
      "https://www.googleapis.com/auth/analytics.readonly",
      "https://www.googleapis.com/auth/webmasters.readonly",
    ],
  });
}

async function fetchGA4(auth, date) {
  const analyticsdata = google.analyticsdata({ version: "v1beta", auth });

  const [pages, events] = await Promise.all([
    analyticsdata.properties.runReport({
      property: `properties/${GA4_PROPERTY_ID}`,
      requestBody: {
        dateRanges: [{ startDate: date, endDate: date }],
        dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
        metrics: [
          { name: "sessions" },
          { name: "engagementRate" },
          { name: "averageSessionDuration" },
        ],
        limit: 10000,
      },
    }),
    analyticsdata.properties.runReport({
      property: `properties/${GA4_PROPERTY_ID}`,
      requestBody: {
        dateRanges: [{ startDate: date, endDate: date }],
        dimensions: [{ name: "eventName" }],
        metrics: [{ name: "eventCount" }],
        limit: 1000,
      },
    }),
  ]);

  const pageRows = pages.data.rows || [];
  const eventRows = events.data.rows || [];

  const pageMap = new Map();
  for (const row of pageRows) {
    const pagePath = row.dimensionValues?.[0]?.value || "/";
    const pageTitle = row.dimensionValues?.[1]?.value || "";
    const sessions = safeNumber(row.metricValues?.[0]?.value);
    const engagementRate = safeNumber(row.metricValues?.[1]?.value);
    const avgSessionDuration = safeNumber(row.metricValues?.[2]?.value);
    pageMap.set(pagePath, {
      pagePath,
      pageTitle,
      sessions,
      engagementRate,
      avgSessionDuration,
    });
  }

  const cvEvents = [];
  for (const row of eventRows) {
    const eventName = row.dimensionValues?.[0]?.value || "";
    const eventCount = safeNumber(row.metricValues?.[0]?.value);
    if (CV_EVENT_NAMES.includes(eventName)) {
      cvEvents.push({ eventName, eventCount });
    }
  }

  return { pageMap, cvEvents };
}

async function fetchGSC(auth, date) {
  const searchconsole = google.searchconsole({ version: "v1", auth });
  const res = await searchconsole.searchanalytics.query({
    siteUrl: GSC_SITE_URL,
    requestBody: {
      startDate: date,
      endDate: date,
      dimensions: ["page", "query"],
      rowLimit: 25000,
    },
  });
  const rows = res.data.rows || [];
  return rows.map((r) => ({
    page: r.keys?.[0] || "",
    query: r.keys?.[1] || "",
    clicks: safeNumber(r.clicks),
    impressions: safeNumber(r.impressions),
    ctr: safeNumber(r.ctr),
    position: safeNumber(r.position),
  }));
}

function aggregateByPage(gscRows) {
  const map = new Map();
  for (const r of gscRows) {
    const path = normalizePathFromUrl(r.page);
    if (!map.has(path)) {
      map.set(path, {
        path,
        clicks: 0,
        impressions: 0,
        ctr: 0,
        position: 0,
        queries: 0,
      });
    }
    const cur = map.get(path);
    cur.clicks += r.clicks;
    cur.impressions += r.impressions;
    cur.queries += 1;
    cur.ctr += r.ctr;
    cur.position += r.position;
  }

  for (const cur of map.values()) {
    if (cur.queries > 0) {
      cur.ctr = cur.ctr / cur.queries;
      cur.position = cur.position / cur.queries;
    }
  }

  return map;
}

function delta(a, b) {
  return a - b;
}

function formatDelta(n) {
  const s = n >= 0 ? "+" : "";
  return `${s}${n.toFixed(2)}`;
}

function loadMetadata() {
  const metaPath = path.join(process.cwd(), "data", "page-metadata.json");
  if (!fs.existsSync(metaPath)) return null;
  const raw = fs.readFileSync(metaPath, "utf8");
  return JSON.parse(raw);
}

async function main() {
  const now = new Date();
  const yesterday = formatDate(new Date(now.getTime() - 24 * 60 * 60 * 1000));
  const dayBefore = formatDate(new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000));

  const auth = await ensureAuth();

  const [ga4Y, ga4B, gscY, gscB] = await Promise.all([
    fetchGA4(auth, yesterday),
    fetchGA4(auth, dayBefore),
    fetchGSC(auth, yesterday),
    fetchGSC(auth, dayBefore),
  ]);

  const gscMapY = aggregateByPage(gscY);
  const gscMapB = aggregateByPage(gscB);

  const pages = [];
  for (const [pathKey, gsc] of gscMapY.entries()) {
    const ga4 = ga4Y.pageMap.get(pathKey) || {
      sessions: 0,
      engagementRate: 0,
      avgSessionDuration: 0,
      pageTitle: "",
    };
    const gscPrev = gscMapB.get(pathKey) || {
      clicks: 0,
      ctr: 0,
      position: 0,
      impressions: 0,
    };
    const score = scorePage({
      clicks: gsc.clicks,
      ctr: gsc.ctr,
      position: gsc.position,
      engagementRate: ga4.engagementRate,
    });
    pages.push({
      path: pathKey,
      title: ga4.pageTitle || "",
      score,
      clicks: gsc.clicks,
      ctr: gsc.ctr,
      position: gsc.position,
      engagementRate: ga4.engagementRate,
      clicksDelta: delta(gsc.clicks, gscPrev.clicks),
      ctrDelta: delta(gsc.ctr, gscPrev.ctr),
      positionDelta: delta(gsc.position, gscPrev.position),
      engagementDelta: delta(ga4.engagementRate, ga4B.pageMap.get(pathKey)?.engagementRate || 0),
    });
  }

  pages.sort((a, b) => b.score - a.score);

  const metadata = loadMetadata();
  const tagAgg = new Map();
  const catAgg = new Map();

  if (metadata) {
    for (const p of pages) {
      const meta = metadata[p.path];
      if (!meta) continue;
      const tags = meta.tags || [];
      const category = meta.category;
      for (const t of tags) {
        if (!tagAgg.has(t)) tagAgg.set(t, { tag: t, score: 0, pages: 0 });
        const cur = tagAgg.get(t);
        cur.score += p.score;
        cur.pages += 1;
      }
      if (category) {
        if (!catAgg.has(category)) {
          catAgg.set(category, { category, score: 0, pages: 0 });
        }
        const cur = catAgg.get(category);
        cur.score += p.score;
        cur.pages += 1;
      }
    }
  }

  const topTags = [...tagAgg.values()].sort((a, b) => b.score - a.score).slice(0, 5);
  const topCats = [...catAgg.values()].sort((a, b) => b.score - a.score).slice(0, 5);

  const cvEvents = ga4Y.cvEvents;

  const reportLines = [];
  reportLines.push(`# Daily Analytics Report - ${yesterday}`);
  reportLines.push("");
  reportLines.push("## Summary");
  reportLines.push(`- 伸ばすべき記事: ${pages.slice(0, 3).map((p) => p.path).join(", ") || "N/A"}`);
  if (metadata) {
    reportLines.push(`- 増やすべきタグ: ${topTags.map((t) => t.tag).join(", ") || "N/A"}`);
    reportLines.push(`- 増やすべきカテゴリ: ${topCats.map((c) => c.category).join(", ") || "N/A"}`);
  } else {
    reportLines.push("- 増やすべきタグ/カテゴリ: {{TODO: data/page-metadata.json が未設定}}");
  }
  reportLines.push(`- CV導線の改善点: ${cvEvents.map((e) => e.eventName).join(", ") || "N/A"}`);
  reportLines.push("");

  reportLines.push("## Articles To Grow (Top 10)");
  reportLines.push("| Rank | URL | Score | Clicks Δ | CTR Δ | Position Δ | Engagement Δ |");
  reportLines.push("| --- | --- | --- | --- | --- | --- | --- |");
  pages.slice(0, 10).forEach((p, i) => {
    reportLines.push(
      `| ${i + 1} | ${p.path} | ${p.score.toFixed(2)} | ${formatDelta(p.clicksDelta)} | ${formatDelta(p.ctrDelta)} | ${formatDelta(p.positionDelta)} | ${formatDelta(p.engagementDelta)} |`
    );
  });
  reportLines.push("");

  reportLines.push("## Tags / Categories To Expand");
  if (metadata) {
    reportLines.push("| Rank | Tag | Score | 対象記事数 |");
    reportLines.push("| --- | --- | --- | --- |");
    topTags.forEach((t, i) => {
      reportLines.push(`| ${i + 1} | ${t.tag} | ${t.score.toFixed(2)} | ${t.pages} |`);
    });
    reportLines.push("");
    reportLines.push("| Rank | Category | Score | 対象記事数 |");
    reportLines.push("| --- | --- | --- | --- |");
    topCats.forEach((c, i) => {
      reportLines.push(`| ${i + 1} | ${c.category} | ${c.score.toFixed(2)} | ${c.pages} |`);
    });
  } else {
    reportLines.push("- {{TODO: data/page-metadata.json を用意してください}}");
  }
  reportLines.push("");

  reportLines.push("## CV Funnel Watch");
  if (cvEvents.length) {
    reportLines.push("| Event | Count |");
    reportLines.push("| --- | --- |");
    cvEvents.forEach((e) => {
      reportLines.push(`| ${e.eventName} | ${e.eventCount} |`);
    });
  } else {
    reportLines.push("- CVイベントが取得できませんでした。CV_EVENT_NAMES を確認してください。");
  }
  reportLines.push("");

  reportLines.push("## Recommended Actions");
  reportLines.push("1. {{TODO: 上位記事の内容改善 or 内部リンク追加}}");
  reportLines.push("2. {{TODO: 成長タグ/カテゴリに対する新規記事企画}}");
  reportLines.push("3. {{TODO: CVイベントの離脱箇所の仮説立て}}");
  reportLines.push("");

  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  const outPath = path.join(REPORTS_DIR, `daily-${yesterday}.md`);
  fs.writeFileSync(outPath, reportLines.join("\n"), "utf8");

  console.log(`Report generated: ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
