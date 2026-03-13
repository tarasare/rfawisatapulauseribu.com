#!/usr/bin/env node
/**
 * test-rss.js
 *
 * Simple test runner for the Cloudflare Pages function `rss.xml.js`.
 * - Designed for Node 18+ (has global fetch / Request / Response).
 * - Loads the function module via dynamic import and invokes `onRequest`.
 * - Prints status, headers, and a preview of the RSS body.
 * - Optionally writes full output to `./rss-test-output.xml`.
 *
 * Usage:
 *   node scripts/test-rss.js
 *
 * Notes:
 * - This script assumes it lives at `travel/apps/web/scripts/test-rss.js`
 *   and that the function is at `travel/apps/web/functions/rss.xml.js`.
 * - If you put files elsewhere, adjust the relative import below.
 */

import fs from "node:fs/promises";

async function run() {
  try {
    // Resolve function module relative to this script
    const funcModuleUrl = new URL("../functions/rss.xml.js", import.meta.url).href;

    // Dynamically import the Cloudflare Pages function module
    const mod = await import(funcModuleUrl);

    if (!mod || typeof mod.onRequest !== "function") {
      console.error("The module does not export an `onRequest` function:", funcModuleUrl);
      process.exitCode = 2;
      return;
    }

    // Build a Request object - Cloudflare function expects an object with `request`.
    // Using the WHATWG Request available in Node 18+.
    const testUrl = "https://localhost/rss.xml"; // origin only used by the function to build absolute links
    const req = new Request(testUrl, {
      method: "GET",
      headers: {
        // Example headers (adjust if your function reads them)
        "user-agent": "node-test-rss/1.0",
        accept: "application/rss+xml,application/xml,text/xml",
      },
    });

    // Call the function like Cloudflare Pages would
    const result = await mod.onRequest({ request: req });

    // The function should return a Response-like object
    if (!result || typeof result.text !== "function") {
      console.error("Unexpected response from onRequest():", result);
      process.exitCode = 3;
      return;
    }

    // Read body and headers
    const body = await result.text();
    const status = result.status ?? 200;
    const headers = {};
    result.headers?.forEach?.((v, k) => {
      headers[k] = v;
    });

    // Print summary
    console.log("=== RSS Test Result ===");
    console.log("Status:", status);
    console.log("Content-Type:", headers["content-type"] || "(none)");
    console.log("Cache-Control:", headers["cache-control"] || "(none)");
    console.log("Body length:", Buffer.byteLength(body, "utf8"));
    console.log("");

    // Print a preview (first 2000 chars)
    const preview = body.slice(0, 2000);
    console.log("--- Body preview (first 2000 chars) ---");
    console.log(preview);
    if (body.length > preview.length) {
      console.log("\n--- (truncated) ---");
    }
    console.log("");

    // Optionally write full output for inspection
    const outPath = new URL("../public/rss-test-output.xml", import.meta.url);
    await fs.writeFile(outPath, body, "utf8");
    console.log("Full RSS written to:", outPath.pathname);

    // Exit success
    process.exitCode = 0;
  } catch (err) {
    console.error("Error while testing rss function:", err);
    process.exitCode = 1;
  }
}

run();
