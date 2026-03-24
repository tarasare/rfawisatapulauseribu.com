import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { destinations } from "../src/data/destinations.js";
import { articles } from "../src/data/articles.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://rfawisatapulauseribu.com";
const publicDir = path.resolve(__dirname, "../public");

const todayISO = new Date().toISOString().split("T")[0];
const lastBuildDate = new Date().toUTCString();

const xmlEscape = (value = "") =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const buildSitemap = () => {
  const urls = [
    "/",
    "/destinations",
    "/articles",
    ...destinations.map((dest) => `/destinations/${dest.slug}`),
    ...articles.map((article) => `/articles/${article.slug}`),
  ];

  const urlEntries = urls
    .map(
      (url) =>
        `  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${todayISO}</lastmod>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
};

const buildRss = () => {
  const items = destinations
    .map((dest) => {
      const link = `${BASE_URL}/destinations/${dest.slug}`;
      return `    <item>
      <title>${xmlEscape(dest.name)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <description>${xmlEscape(dest.description)}</description>
      <pubDate>${lastBuildDate}</pubDate>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>RFA Wisata Pulau Seribu</title>
    <link>${BASE_URL}</link>
    <description>${xmlEscape(
      "Explore the breathtaking beauty of Pulau Seribu with RFA Wisata. Book your island adventure today and experience crystal clear waters, pristine beaches, and unforgettable memories. Best island tour packages in Indonesia.",
    )}</description>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`;
};

const main = async () => {
  const sitemapXml = buildSitemap();
  const rssXml = buildRss();

  await writeFile(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
  await writeFile(path.join(publicDir, "rss.xml"), rssXml, "utf8");

  console.log("✅ Generated sitemap.xml and rss.xml");
};

main().catch((error) => {
  console.error("Failed to generate sitemap/RSS:", error);
  process.exit(1);
});
