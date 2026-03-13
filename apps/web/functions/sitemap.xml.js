import { destinations } from "../src/data/destinations.js";
import { articles } from "../src/data/articles.js";

const buildUrlEntry = (loc, lastmod, changefreq, priority) => {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
};

export const onRequest = async ({ request }) => {
  const origin = new URL(request.url).origin;
  const todayISO = new Date().toISOString().split("T")[0];

  const urls = [
    { path: "/", changefreq: "daily", priority: 1.0 },
    { path: "/destinations", changefreq: "weekly", priority: 0.8 },
    { path: "/articles", changefreq: "weekly", priority: 0.7 },
    ...destinations.map((dest) => ({
      path: `/destinations/${dest.slug}`,
      changefreq: "weekly",
      priority: 0.6,
    })),
    ...articles.map((article) => ({
      path: `/articles/${article.slug}`,
      changefreq: "monthly",
      priority: 0.6,
    })),
  ];

  const urlEntries = urls
    .map((entry) =>
      buildUrlEntry(
        `${origin}${entry.path}`,
        todayISO,
        entry.changefreq,
        entry.priority,
      ),
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
};
