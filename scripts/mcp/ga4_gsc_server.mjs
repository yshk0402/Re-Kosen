import fs from "fs";
import dotenv from "dotenv";
import { google } from "googleapis";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

dotenv.config({ path: ".env.local" });

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID || "520303035";
const GSC_SITE_URL = process.env.GSC_SITE_URL || "https://www.kosen-job.com/";
const KEY_PATH =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  process.env.GCP_SA_KEY_PATH ||
  "";

function requireKeyFile() {
  if (!KEY_PATH || !fs.existsSync(KEY_PATH)) {
    throw new Error(
      "Service account key not found. Set GOOGLE_APPLICATION_CREDENTIALS or GCP_SA_KEY_PATH."
    );
  }
}

async function getAuth() {
  requireKeyFile();
  return new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: [
      "https://www.googleapis.com/auth/analytics.readonly",
      "https://www.googleapis.com/auth/webmasters.readonly",
    ],
  });
}

async function handleGA4Query(args) {
  const auth = await getAuth();
  const analyticsdata = google.analyticsdata({ version: "v1beta", auth });
  const propertyId = args.propertyId || GA4_PROPERTY_ID;
  const dateRanges = args.dateRanges || [];
  const dimensions = (args.dimensions || []).map((name) => ({ name }));
  const metrics = (args.metrics || []).map((name) => ({ name }));
  const limit = args.limit || 10000;

  const res = await analyticsdata.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: {
      dateRanges,
      dimensions,
      metrics,
      limit,
    },
  });

  return {
    rows: res.data.rows || [],
    metadata: res.data.metadata || {},
  };
}

async function handleGSCQuery(args) {
  const auth = await getAuth();
  const searchconsole = google.searchconsole({ version: "v1", auth });
  const siteUrl = args.siteUrl || GSC_SITE_URL;
  const startDate = args.startDate;
  const endDate = args.endDate;
  const dimensions = args.dimensions || ["page", "query"];
  const rowLimit = args.rowLimit || 25000;

  const res = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions,
      rowLimit,
    },
  });

  return {
    rows: res.data.rows || [],
    responseAggregationType: res.data.responseAggregationType || "",
  };
}

const server = new Server(
  { name: "ga4-gsc-mcp", version: "0.1.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "ga4.query",
      description: "Run a GA4 report (Data API) and return rows.",
      inputSchema: {
        type: "object",
        properties: {
          propertyId: { type: "string" },
          dateRanges: {
            type: "array",
            items: {
              type: "object",
              properties: {
                startDate: { type: "string" },
                endDate: { type: "string" },
              },
              required: ["startDate", "endDate"],
            },
          },
          dimensions: { type: "array", items: { type: "string" } },
          metrics: { type: "array", items: { type: "string" } },
          limit: { type: "number" },
        },
        required: ["dateRanges", "dimensions", "metrics"],
      },
    },
    {
      name: "gsc.query",
      description: "Run a GSC Search Analytics query and return rows.",
      inputSchema: {
        type: "object",
        properties: {
          siteUrl: { type: "string" },
          startDate: { type: "string" },
          endDate: { type: "string" },
          dimensions: { type: "array", items: { type: "string" } },
          rowLimit: { type: "number" },
        },
        required: ["startDate", "endDate", "dimensions"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args } = req.params;

  if (name === "ga4.query") {
    const data = await handleGA4Query(args || {});
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  }

  if (name === "gsc.query") {
    const data = await handleGSCQuery(args || {});
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

const transport = new StdioServerTransport();
await server.connect(transport);
