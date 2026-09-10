import { Router, type IRouter } from "express";
import type express from "express";
import { db, leadsTable } from "@workspace/db";
import { and, desc, eq, gte, ilike, lt, or, sql } from "drizzle-orm";
import crypto from "node:crypto";
import { getLeadById } from "../lib/leads";
import {
  downloadLeadPhoto,
  createLeadPhotoReadStream,
} from "../lib/lead-photos";
import { ZipArchive } from "archiver";

const router: IRouter = Router();

function timingSafeEqualStr(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) {
    // constant-time path even on length mismatch
    crypto.timingSafeEqual(ab, ab);
    return false;
  }
  return crypto.timingSafeEqual(ab, bb);
}

/**
 * HTTP Basic auth against the ADMIN_PASSWORD secret. Protects the whole
 * leads preview (list, photos). Username is ignored.
 */
export const requireAdmin: express.RequestHandler = (req, res, next) => {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    res.status(503).json({ ok: false, error: "admin_not_configured" });
    return;
  }
  const header = req.headers.authorization || "";
  if (header.startsWith("Basic ")) {
    try {
      const decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
      const password = decoded.slice(decoded.indexOf(":") + 1);
      if (
        password.length === adminPassword.length &&
        timingSafeEqualStr(password, adminPassword)
      ) {
        next();
        return;
      }
    } catch {
      // fall through to 401
    }
  }
  res.setHeader("WWW-Authenticate", 'Basic realm="Leady STEKRO", charset="UTF-8"');
  res.status(401).send("Wymagane logowanie");
};

/** Serves a stored trade-in photo for a lead, by index in the photos array. */
router.get("/leads/:id/photos/:index", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const index = Number(req.params.index);
  if (
    !Number.isInteger(id) ||
    id <= 0 ||
    !Number.isInteger(index) ||
    index < 0
  ) {
    res.status(400).json({ ok: false, error: "bad_request" });
    return;
  }
  const lead = await getLeadById(id);
  const photo = lead?.photos?.[index];
  if (!photo) {
    res.status(404).json({ ok: false, error: "not_found" });
    return;
  }
  try {
    const buffer = await downloadLeadPhoto(photo);
    res.setHeader("Content-Type", photo.contentType || "image/jpeg");
    res.setHeader("Cache-Control", "private, max-age=3600");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${photo.filename.replace(/[^\w.\- ]/g, "_")}"`,
    );
    res.send(buffer);
  } catch (err) {
    req.log.error({ err, leadId: id, index }, "lead photo download failed");
    res.status(502).json({ ok: false, error: "storage_error" });
  }
});

/** Streams all photos of a lead as a single ZIP download. */
router.get("/leads/:id/photos.zip", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ ok: false, error: "bad_request" });
    return;
  }
  const lead = await getLeadById(id);
  const photos = lead?.photos ?? [];
  if (!lead || photos.length === 0) {
    res.status(404).json({ ok: false, error: "not_found" });
    return;
  }

  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="lead-${id}-zdjecia.zip"`,
  );

  const archive = new ZipArchive({ zlib: { level: 6 } });
  archive.on("error", (err: Error) => {
    req.log.error({ err, leadId: id }, "lead photos zip failed");
    if (!res.headersSent) {
      res.status(502).json({ ok: false, error: "storage_error" });
    } else {
      res.destroy(err);
    }
  });
  res.on("close", () => {
    archive.destroy();
  });
  archive.pipe(res);

  const usedNames = new Set<string>();
  for (const [i, photo] of photos.entries()) {
    let name = photo.filename.replace(/[^\w.\- ]/g, "_") || `zdjecie-${i + 1}`;
    if (usedNames.has(name.toLowerCase())) {
      const dot = name.lastIndexOf(".");
      name =
        dot > 0
          ? `${name.slice(0, dot)}-${i + 1}${name.slice(dot)}`
          : `${name}-${i + 1}`;
    }
    usedNames.add(name.toLowerCase());
    archive.append(
      createLeadPhotoReadStream(photo) as import("stream").Readable,
      { name },
    );
  }
  await archive.finalize();
});

const TYPES = ["contact", "trade_in"] as const;
const STATUSES = ["pending", "sent", "failed", "not_configured"] as const;

const TYPE_LABELS: Record<string, string> = {
  contact: "Kontakt",
  trade_in: "Wymiana",
};
const STATUS_LABELS: Record<string, string> = {
  pending: "oczekuje",
  sent: "wysłany",
  failed: "BŁĄD",
  not_configured: "brak konfiguracji",
};

function esc(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

router.get("/leads", requireAdmin, async (req, res) => {
  const typeParam =
    typeof req.query["type"] === "string" &&
    (TYPES as readonly string[]).includes(req.query["type"])
      ? (req.query["type"] as string)
      : null;
  const statusParam =
    typeof req.query["status"] === "string" &&
    (STATUSES as readonly string[]).includes(req.query["status"])
      ? (req.query["status"] as string)
      : null;

  const qParam =
    typeof req.query["q"] === "string" ? req.query["q"].trim().slice(0, 200) : "";
  const dateRe = /^\d{4}-\d{2}-\d{2}$/;
  const fromParam =
    typeof req.query["from"] === "string" && dateRe.test(req.query["from"])
      ? req.query["from"]
      : "";
  const toParam =
    typeof req.query["to"] === "string" && dateRe.test(req.query["to"])
      ? req.query["to"]
      : "";

  const conditions = [];
  if (typeParam) conditions.push(eq(leadsTable.type, typeParam));
  if (statusParam) conditions.push(eq(leadsTable.emailStatus, statusParam));
  if (qParam) {
    const pattern = `%${qParam.replace(/[%_\\]/g, "\\$&")}%`;
    conditions.push(
      or(
        ilike(leadsTable.name, pattern),
        ilike(leadsTable.phone, pattern),
        ilike(leadsTable.email, pattern),
        ilike(leadsTable.machineBrand, pattern),
        ilike(leadsTable.machineModel, pattern),
        ilike(
          sql`concat_ws(' ', ${leadsTable.machineBrand}, ${leadsTable.machineModel}, ${leadsTable.machineYear})`,
          pattern,
        ),
      )!,
    );
  }
  // Dates are interpreted in the Europe/Warsaw timezone (same as displayed).
  if (fromParam) {
    conditions.push(
      gte(
        leadsTable.createdAt,
        sql`(${fromParam}::date::timestamp AT TIME ZONE 'Europe/Warsaw')`,
      ),
    );
  }
  if (toParam) {
    conditions.push(
      lt(
        leadsTable.createdAt,
        sql`((${toParam}::date + 1)::timestamp AT TIME ZONE 'Europe/Warsaw')`,
      ),
    );
  }

  const PAGE_SIZE = 100;
  const pageRaw = Number(req.query["page"]);
  const page =
    Number.isInteger(pageRaw) && pageRaw >= 1 ? pageRaw : 1;

  const whereClause = conditions.length ? and(...conditions) : undefined;

  const [leads, [countRow]] = await Promise.all([
    db
      .select()
      .from(leadsTable)
      .where(whereClause)
      .orderBy(desc(leadsTable.createdAt))
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(leadsTable)
      .where(whereClause),
  ]);
  const totalCount = countRow?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const failedCount = leads.filter((l) => l.emailStatus === "failed").length;

  const filterLink = (label: string, qs: string, active: boolean) =>
    `<a href="leads${qs}" class="chip${active ? " active" : ""}">${label}</a>`;

  const qsFor = (type: string | null, status: string | null) => {
    const p = new URLSearchParams();
    if (type) p.set("type", type);
    if (status) p.set("status", status);
    if (qParam) p.set("q", qParam);
    if (fromParam) p.set("from", fromParam);
    if (toParam) p.set("to", toParam);
    const s = p.toString();
    return s ? `?${s}` : "";
  };

  /** Query string keeping all active filters, pointing at a given page. */
  const qsForPage = (targetPage: number) => {
    const p = new URLSearchParams();
    if (typeParam) p.set("type", typeParam);
    if (statusParam) p.set("status", statusParam);
    if (qParam) p.set("q", qParam);
    if (fromParam) p.set("from", fromParam);
    if (toParam) p.set("to", toParam);
    if (targetPage > 1) p.set("page", String(targetPage));
    const s = p.toString();
    return s ? `?${s}` : "";
  };

  /** Query string keeping only type/status (clears search + dates). */
  const qsForBase = () => {
    const p = new URLSearchParams();
    if (typeParam) p.set("type", typeParam);
    if (statusParam) p.set("status", statusParam);
    const s = p.toString();
    return s ? `?${s}` : "";
  };

  const rows = leads
    .map((l) => {
      const date = l.createdAt.toLocaleString("pl-PL", {
        timeZone: "Europe/Warsaw",
        dateStyle: "short",
        timeStyle: "short",
      });
      const machine =
        l.type === "trade_in"
          ? [l.machineBrand, l.machineModel, l.machineYear]
              .filter(Boolean)
              .join(" ")
          : "";
      const thumbs = (l.photos ?? [])
        .map((photo, i) => {
          const url = `leads/${l.id}/photos/${i}`;
          return `<a href="${url}" class="thumb" data-lightbox title="${esc(photo.filename)}"><img src="${url}" alt="${esc(photo.filename)}" loading="lazy" /></a>`;
        })
        .join("");
      const photosCell = thumbs
        ? `${thumbs}<br/><a class="zip-link" href="leads/${l.id}/photos.zip" download>Pobierz wszystkie (ZIP)</a>`
        : l.photosCount > 0
          ? `${l.photosCount} (niezapisane)`
          : "—";
      return `<tr class="${l.emailStatus === "failed" ? "row-failed" : ""}">
        <td>${l.id}</td>
        <td>${esc(date)}</td>
        <td>${esc(TYPE_LABELS[l.type] ?? l.type)}</td>
        <td>${esc(l.name)}</td>
        <td><a href="tel:${esc(l.phone)}">${esc(l.phone)}</a></td>
        <td>${l.email ? `<a href="mailto:${esc(l.email)}">${esc(l.email)}</a>` : "—"}</td>
        <td>${esc(machine || "—")}</td>
        <td>${esc(l.message || "—")}</td>
        <td class="thumbs">${photosCell}</td>
        <td><span class="status status-${esc(l.emailStatus)}" title="${esc(l.emailError || "")}">${esc(STATUS_LABELS[l.emailStatus] ?? l.emailStatus)}</span></td>
      </tr>`;
    })
    .join("\n");

  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  res.type("html").send(`<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Leady — STEKRO</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 16px; color: #1a1a1a; background: #fafafa; }
  h1 { font-size: 1.25rem; }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0; }
  .chip { padding: 4px 12px; border: 1px solid #ccc; border-radius: 999px; text-decoration: none; color: #333; background: #fff; font-size: 0.85rem; }
  .chip.active { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }
  table { border-collapse: collapse; width: 100%; background: #fff; font-size: 0.85rem; }
  th, td { border: 1px solid #ddd; padding: 6px 8px; text-align: left; vertical-align: top; }
  th { background: #f0f0f0; }
  .row-failed { background: #fff2f2; }
  .status { padding: 2px 8px; border-radius: 999px; font-size: 0.75rem; white-space: nowrap; }
  .status-sent { background: #e6f6e6; color: #14622a; }
  .status-failed { background: #c62828; color: #fff; font-weight: 700; }
  .status-not_configured, .status-pending { background: #fff4d6; color: #7a5900; }
  .filters { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin: 12px 0; }
  .filters input[type="search"] { flex: 1 1 260px; min-width: 200px; padding: 6px 10px; border: 1px solid #ccc; border-radius: 6px; font-size: 0.9rem; }
  .filters input[type="date"] { padding: 4px 6px; border: 1px solid #ccc; border-radius: 6px; font-size: 0.85rem; }
  .filters label { font-size: 0.85rem; color: #333; display: inline-flex; align-items: center; gap: 4px; }
  .filters button { padding: 6px 14px; border: 1px solid #1a1a1a; border-radius: 6px; background: #1a1a1a; color: #fff; font-size: 0.85rem; cursor: pointer; }
  .summary { margin: 8px 0; font-size: 0.9rem; }
  .failed-note { color: #c62828; font-weight: 600; }
  td.thumbs { min-width: 80px; }
  .zip-link { display: inline-block; margin-top: 4px; font-size: 0.8rem; color: #0a58ca; }
  .thumb img { width: 56px; height: 56px; object-fit: cover; border-radius: 4px; margin: 2px; border: 1px solid #ccc; cursor: zoom-in; }
  #lightbox { display: none; position: fixed; inset: 0; background: rgba(0,0,0,.85); align-items: center; justify-content: center; cursor: zoom-out; z-index: 10; }
  #lightbox.open { display: flex; }
  #lightbox img { max-width: 95vw; max-height: 95vh; }
</style>
</head>
<body>
<h1>Leady ze strony stekro.pl</h1>
<div class="summary">
  Pasujących leadów: ${totalCount} &middot; wyświetlono: ${leads.length}${totalPages > 1 ? ` (strona ${Math.min(page, totalPages)} z ${totalPages})` : ""}${failedCount ? ` &middot; <span class="failed-note">e-mail nie doszedł: ${failedCount} — oddzwoń!</span>` : ""}
</div>
<form class="filters" method="get" action="leads">
  ${typeParam ? `<input type="hidden" name="type" value="${esc(typeParam)}">` : ""}
  ${statusParam ? `<input type="hidden" name="status" value="${esc(statusParam)}">` : ""}
  <input type="search" name="q" value="${esc(qParam)}" placeholder="Szukaj: nazwisko, telefon, e-mail, maszyna" aria-label="Szukaj leadów">
  <label>Od <input type="date" name="from" value="${esc(fromParam)}"></label>
  <label>Do <input type="date" name="to" value="${esc(toParam)}"></label>
  <button type="submit">Filtruj</button>
  ${qParam || fromParam || toParam ? `<a class="chip" href="leads${qsForBase()}">Wyczyść</a>` : ""}
</form>
<div class="chips">
  ${filterLink("Wszystkie typy", qsFor(null, statusParam), !typeParam)}
  ${TYPES.map((t) => filterLink(TYPE_LABELS[t]!, qsFor(t, statusParam), typeParam === t)).join("\n  ")}
</div>
<div class="chips">
  ${filterLink("Wszystkie statusy", qsFor(typeParam, null), !statusParam)}
  ${STATUSES.map((s) => filterLink(`E-mail: ${STATUS_LABELS[s]!}`, qsFor(typeParam, s), statusParam === s)).join("\n  ")}
</div>
<table>
<thead>
<tr><th>ID</th><th>Data</th><th>Typ</th><th>Imię / firma</th><th>Telefon</th><th>E-mail</th><th>Maszyna</th><th>Wiadomość</th><th>Zdjęcia</th><th>Status e-maila</th></tr>
</thead>
<tbody>
${rows || `<tr><td colspan="10">Brak leadów dla wybranych filtrów.</td></tr>`}
</tbody>
</table>
${
  totalPages > 1
    ? `<div class="chips pager">
  ${page > 1 ? `<a class="chip" href="leads${qsForPage(page - 1)}">&larr; Nowsze</a>` : ""}
  <span class="chip active">Strona ${Math.min(page, totalPages)} z ${totalPages}</span>
  ${page < totalPages ? `<a class="chip" href="leads${qsForPage(page + 1)}">Pokaż starsze &rarr;</a>` : ""}
</div>`
    : ""
}
<div id="lightbox"><img alt="" /></div>
<script>
  var lb = document.getElementById('lightbox');
  var lbImg = lb.querySelector('img');
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-lightbox]');
    if (a) {
      e.preventDefault();
      lbImg.src = a.getAttribute('href');
      lbImg.alt = a.getAttribute('title') || '';
      lb.classList.add('open');
    } else if (e.target === lb || e.target === lbImg) {
      lb.classList.remove('open');
      lbImg.src = '';
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { lb.classList.remove('open'); lbImg.src = ''; }
  });
</script>
</body>
</html>`);
});

export default router;
