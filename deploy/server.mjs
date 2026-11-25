#!/usr/bin/env node
/*
 * Trackio — tiny production server for the built site (no dependencies).
 *   node server.mjs [distDir]      (default: ./dist next to this file)
 *   PORT=3001 HOST=127.0.0.1 node server.mjs
 *
 * - Serves the files in dist/.
 * - Any page URL without a file extension (/fr, /ar/products/ml920g, …)
 *   gets index.html, so React Router handles it — refreshes and shared links work.
 * - Hashed files in /assets/ are cached for a year; index.html is never cached,
 *   so a new deploy is picked up immediately.
 */
import http from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(process.argv[2] || path.join(HERE, "dist"));
const INDEX = path.join(ROOT, "index.html");
const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || "127.0.0.1";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".pdf": "application/pdf",
};

async function fileStat(p) {
  try {
    const s = await stat(p);
    return s.isFile() ? s : null;
  } catch {
    return null;
  }
}

function send(req, res, status, filePath, size, cache) {
  res.writeHead(status, {
    "Content-Type": TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream",
    "Content-Length": size,
    "Cache-Control": cache,
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  });
  if (req.method === "HEAD") return res.end();
  createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }

  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
  } catch {
    res.writeHead(400).end("Bad request");
    return;
  }

  // Resolve inside ROOT only (blocks ../ path traversal).
  const filePath = path.resolve(ROOT, "." + urlPath);
  const inside = filePath === ROOT || filePath.startsWith(ROOT + path.sep);

  const s = inside ? await fileStat(filePath) : null;
  if (s) {
    const cache = urlPath.startsWith("/assets/")
      ? "public, max-age=31536000, immutable"
      : filePath === INDEX
        ? "no-cache"
        : "public, max-age=3600";
    return send(req, res, 200, filePath, s.size, cache);
  }

  // A missing file (has an extension) is a real 404; anything else is a page → index.html.
  if (path.extname(urlPath)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
    return;
  }
  const idx = await fileStat(INDEX);
  if (!idx) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" }).end("index.html missing — run the build");
    return;
  }
  send(req, res, 200, INDEX, idx.size, "no-cache");
});

server.listen(PORT, HOST, () => {
  console.log(`Trackio serving ${ROOT} on http://${HOST}:${PORT}`);
});

// pm2 reload / stop: finish in-flight requests, then exit.
for (const sig of ["SIGINT", "SIGTERM"]) {
  process.on(sig, () => server.close(() => process.exit(0)));
}
