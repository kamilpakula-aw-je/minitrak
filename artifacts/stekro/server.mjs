// Serwer SSR dla strony Stekro Mini Trak.
// Dev:  NODE_ENV != production → Vite w trybie middleware (SSR na żywo, HMR).
// Prod: NODE_ENV == production → zbudowane bundle (dist/public + dist/server).
// Formularze (POST /api/*) obsługuje osobny, istniejący serwer API — nieruszany.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import compression from "compression";

const isProd = process.env.NODE_ENV === "production";
const rawPort = process.env.PORT;
if (!rawPort) throw new Error("PORT environment variable is required.");
const port = Number(rawPort);
if (Number.isNaN(port) || port <= 0) throw new Error(`Invalid PORT: "${rawPort}"`);
const base = process.env.BASE_PATH || "/";

const root = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.disable("x-powered-by");
app.use(compression());

// Domena z "www." → 301 na domenę bez "www." (kanoniczna, SEO).
// Host bierzemy z nagłówka proxy (x-forwarded-host) lub bezpośrednio z żądania.
app.use((req, res, next) => {
  const fwdHost = req.headers["x-forwarded-host"];
  const host = (Array.isArray(fwdHost) ? fwdHost[0] : fwdHost)?.split(",")[0].trim() || req.headers.host;
  if (host && /^www\./i.test(host)) {
    res.redirect(301, `https://${host.replace(/^www\./i, "")}${req.originalUrl}`);
    return;
  }
  next();
});

/** @type {import("vite").ViteDevServer | undefined} */
let vite;

if (!isProd) {
  const { createServer } = await import("vite");
  vite = await createServer({
    configFile: path.join(root, "vite.config.ts"),
    root,
    base,
    server: { middlewareMode: true },
    appType: "custom",
  });
  app.use(vite.middlewares);
} else {
  app.use(
    base,
    express.static(path.join(root, "dist/public"), {
      index: false,
      // Bez przekierowań /katalog -> /katalog/ (np. public/krone to katalog,
      // a /krone jest trasą SSR; redirect robiłby pętlę 301 z naszym
      // usuwaniem końcowego "/").
      redirect: false,
      setHeaders(res, filePath) {
        // Fingerprintowane assety — cache "na zawsze"; reszta krótko z rewalidacją.
        if (filePath.includes(`${path.sep}assets${path.sep}`)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else {
          res.setHeader("Cache-Control", "public, max-age=3600, must-revalidate");
        }
      },
    }),
  );
}

// Publiczna domena produkcyjna — kanoniczne URL-e w sitemap/robots.
const SITE_ORIGIN = "https://minitrak.pl";

async function loadServerEntry() {
  if (!isProd) {
    return vite.ssrLoadModule("/src/entry-server.tsx");
  }
  return import("./dist/server/entry-server.js");
}

function xmlEscape(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

app.use(async (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.status(405).end();
    return;
  }
  try {
    const reqUrl = new URL(req.originalUrl, "http://localhost");
    const pathname = reqUrl.pathname;

    // robots.txt — wskazuje sitemapę pod domeną produkcyjną.
    if (pathname === "/robots.txt") {
      res
        .status(200)
        .set({ "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" })
        .send(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`);
      return;
    }

    // sitemap.xml — generowany z kanonicznych tras (bez aliasów).
    if (pathname === "/sitemap.xml") {
      const { getSitemapPaths } = await loadServerEntry();
      const urls = getSitemapPaths()
        .map((p) => `  <url><loc>${xmlEscape(SITE_ORIGIN + (p === "/" ? "/" : p))}</loc></url>`)
        .join("\n");
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
      res
        .status(200)
        .set({ "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" })
        .send(xml);
      return;
    }

    // Kanoniczne adresy bez końcowego "/" — przekierowanie 301 (SEO).
    if (pathname.length > 1 && pathname.endsWith("/")) {
      res.redirect(301, pathname.replace(/\/+$/, "") + reqUrl.search);
      return;
    }

    let template;
    let render;
    if (!isProd) {
      template = fs.readFileSync(path.join(root, "index.html"), "utf-8");
      template = await vite.transformIndexHtml(req.originalUrl, template);
      ({ render } = await vite.ssrLoadModule("/src/entry-server.tsx"));
    } else {
      template = fs.readFileSync(path.join(root, "dist/public/index.html"), "utf-8");
      ({ render } = await import("./dist/server/entry-server.js"));
    }

    const { html, head, status } = render(pathname);
    const out = template
      .replace("<!--app-head-->", head)
      .replace("<!--app-html-->", html);

    res
      .status(status)
      .set({ "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" })
      .send(out);
  } catch (e) {
    vite?.ssrFixStacktrace?.(e);
    console.error("[ssr] render error:", e);
    res.status(500).end("Internal Server Error");
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`[ssr] Stekro server listening on :${port} (${isProd ? "production" : "development"})`);
});
