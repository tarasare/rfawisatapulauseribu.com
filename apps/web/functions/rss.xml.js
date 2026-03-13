import { destinations } from "../src/data/destinations.js";
import { articles } from "../src/data/articles.js";

/**
 * Cloudflare Pages Function: rss.xml
 * Generates an RSS feed combining destinations and articles.
 *
 * Exports:
 *  - onRequest: handler for Pages Functions
 *
 * Behavior:
 *  - Escapes XML characters
 *  - Uses article.date for pubDate when available
 *  - Uses current date for destinations
 *  - Returns application/rss+xml response
 */

const xmlEscape = (value = "") => {
  if (value === null || value === undefined) return "";
  const s = String(value);
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

const formatRFC822 = (date) => {
  try {
    return new Date(date).toUTCString();
  } catch {
    return new Date().toUTCString();
  }
};

export const onRequest = async ({ request }) => {
  try {
    const origin = new URL(request.url).origin;
    const now = new Date();
    const lastBuildDate = now.toUTCString();
    const todayISO = now.toISOString().split("T")[0];

    // Build destination RSS items
    const destItems =
      Array.isArray(destinations) && destinations.length
        ? destinations
            .filter((d) => d && d.slug && d.name)
            .map((dest) => {
              const link = `${origin}/destinations/${dest.slug}`;
              const title = xmlEscape(dest.name);
              const description = xmlEscape(dest.description || dest.excerpt || "");
              // Use today's date for destinations (no date field available)
              const pubDate = formatRFC822(todayISO);
              return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
            })
            .join("\n")
        : "";

    // Build article RSS items (use article.date when present)
    const articleItems =
      Array.isArray(articles) && articles.length
        ? articles
            .filter((a) => a && a.slug && a.title)
            .map((article) => {
              const link = `${origin}/articles/${article.slug}`;
              const title = xmlEscape(article.title);
              const description = xmlEscape(article.description || article.excerpt || "");
              const pubDate = article.date ? formatRFC822(article.date) : lastBuildDate;
              return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
            })
            .join("\n")
        : "";

    // Combine items; keep articles first (newer content more prominent)
    const combinedItems = [articleItems, destItems].filter(Boolean).join("\n");

    const itemsSection =
      combinedItems && combinedItems.trim().length
        ? `${combinedItems}\n`
        : "    <!-- no items available -->\n";

    const channelTitle = xmlEscape("RFA Wisata Pulau Seribu");
    const channelDescription = xmlEscape(
      "Explore the breathtaking beauty of Pulau Seribu with RFA Wisata. Book island adventures, read travel guides, and find tips for Pulau Seribu."
    );

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${channelTitle}</title>
    <link>${origin}</link>
    <description>${channelDescription}</description>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${itemsSection}  </channel>
</rss>
`;

    return new Response(xml, {
      headers: {
        "content-type": "application/rss+xml; charset=utf-8",
        "cache-control": "public, max-age=3600",
      },
    });
  } catch (err) {
    // Return a minimal RSS with an error comment for debugging
    const errorXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>RFA Wisata Pulau Seribu</title>
    <link>/</link>
    <description>RSS feed temporarily unavailable</description>
    <!-- error: ${xmlEscape(err && err.message ? err.message : String(err))} -->
  </channel>
</rss>
`;
    return new Response(errorXml, {
      status: 500,
      headers: {
        "content-type": "application/rss+xml; charset=utf-8",
        "cache-control": "public, max-age=60",
      },
    });
  }
};
