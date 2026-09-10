import { Link } from "wouter";

interface BreadcrumbsProps {
  current: string;
  tone?: "dark" | "light";
  className?: string;
  parents?: { label: string; href: string }[];
}

/**
 * Widoczna nawigacja okruszkowa (breadcrumbs) — mały, stonowany pasek
 * nad nagłówkiem H1. Odpowiadający jej schemat BreadcrumbList (JSON-LD)
 * jest generowany centralnie w lib/schema.ts.
 */
export function Breadcrumbs({ current, tone = "light", className = "", parents }: BreadcrumbsProps) {
  const muted = tone === "dark" ? "text-white/55" : "text-muted-foreground";
  const link =
    tone === "dark"
      ? "text-white/70 transition-colors hover:text-white"
      : "text-muted-foreground transition-colors hover:text-foreground";
  return (
    <nav
      aria-label="breadcrumb"
      className={`mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-medium ${muted} ${className}`}
    >
      <Link href="/" className={link}>
        Strona główna
      </Link>
      <span aria-hidden="true">›</span>
      {parents?.map((parent, idx) => (
        <span key={idx} className="flex items-center gap-2">
          <Link href={parent.href} className={link}>
            {parent.label}
          </Link>
          <span aria-hidden="true">›</span>
        </span>
      ))}
      <span aria-current="page" className="min-w-0 break-words">
        {current}
      </span>
    </nav>
  );
}
