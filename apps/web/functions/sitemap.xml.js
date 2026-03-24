/**
 * Cloudflare Pages Function: Dynamic sitemap.xml
 *
 * - Uses dynamic imports to load data modules if available.
 * - Is robust to runtime import errors and falls back to a minimal sitemap.
 * - Escapes XML values and deduplicates URLs.
 * - Returns XML with appropriate headers and caching.
 */

const DEFAULT_BASE = "https://rfawisatapulauseribu.com";

const xmlEscape = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const buildUrlEntry = (loc, lastmod) => {
  return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    ${lastmod ? `<lastmod>${xmlEscape(lastmod)}</lastmod>` : ""}
  </url>`;
};

const ensureLeadingSlash = (p) => (p && p.startsWith("/") ? p : `/${p || ""}`);

/**
 * Read data modules dynamically and return arrays of paths.
 * Returns { routes: string[], errors: string[] }
 */
const gatherRoutes = async () => {
  const routes = new Set();
  const errors = [];

  // always include core routes
  routes.add("/");
  routes.add("/destinations");
  routes.add("/articles");

  // Try to load destinations
  try {
    const mod = await import("../src/data/destinations.js");
    const dests = mod?.destinations || mod?.default || [];
    if (Array.isArray(dests)) {
      for (const d of dests) {
        // accept item.slug or generate a safe slug using name
        const slug = d?.slug || (d?.name && String(d.name).toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-"));
        if (slug) routes.add(ensureLeadingSlash(`destinations/${slug}`));
      }
    }
  } catch (err) {
    errors.push(`destinations import failed: ${err?.message || err}`);
    // don't rethrow; fallback to core routes
  }

  // Try to load articles (optional)
  try {
    const mod = await import("../src/data/articles.js");
    const arts = mod?.articles || mod?.default || [];
    if (Array.isArray(arts)) {
      for (const a of arts) {
        const slug = a?.slug || (a?.title && String(a.title).toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-"));
        if (slug) routes.add(ensureLeadingSlash(`articles/${slug}`));
      }
    }
  } catch (err) {
    errors.push(`articles import failed: ${err?.message || err}`);
  }

  return { routes: Array.from(routes), errors };
};

export async function onRequest(context) {
  // context has: request, env, params, next
  const { request, env } = context;
  const originFromReq = (() => {
    try {
      return new URL(request.url).origin;
    } catch {
      return null;
    }
  })();
  const BASE =
    originFromReq || (env && env.BASE_URL) || DEFAULT_BASE;

  const todayISO = new Date().toISOString().split("T")[0];

  let urlList = [];
  const errors = [];

  try {
    const { routes, errors: gatherErrors } = await gatherRoutes();
    if (gatherErrors && gatherErrors.length) errors.push(...gatherErrors);

    // convert to absolute URLs and dedupe
    const absoluteUrls = routes
      .map((p) => {
        // ensure starts with /
        const path = ensureLeadingSlash(p);
        // join with base without double slashes
        return `${BASE.replace(/\/+$/, "")}${path}`;
      })
      // uniq again just in case
      .filter((v, i, a) => a.indexOf(v) === i);

    urlList = absoluteUrls;
  } catch (err) {
    errors.push(`gathering routes failed: ${err?.message || err}`);
    // fallback to minimal sitemap
    urlList = [`${BASE}/`];
  }

  // Build XML entries; lastmod: try to include today's date.
  const urlEntries = urlList
    .map((loc) => buildUrlEntry(loc, todayISO))
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

  // If there were import errors, log them to stdout (Cloudflare Pages logs).
  if (errors.length) {
    // console.error so they appear in logs; don't expose to clients
    console.error("[sitemap.xml] warnings:", errors.join(" | "));
  }

  return new Response(xml, {
    status: 200,
    headers: {
      "content-type": "application/xml; charset=utf-8",
      // Cache for a short time; adjust as needed.
      "cache-control": "public, max-age=3600, s-maxage=3600",
      // security headers are optional
    },
  });
}
