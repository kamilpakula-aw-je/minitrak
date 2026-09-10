import { MapPin, MapPinned, Facebook, Instagram } from "lucide-react";
import { Link } from "wouter";
import { CONTACT_INFO, TEAM } from "@/data";
import logoWhite from "@assets/stekro_minitrak_logo_white_nobg_small.webp";

export function SiteFooter() {
  return (
    <footer className="bg-black text-white/70 px-4 pt-16 pb-10">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <img
              src={logoWhite}
              alt="Logo Stekro MiniTrak w stopce"
              title="Stekro MiniTrak"
              width={480}
              height={240}
              loading="lazy"
              decoding="async"
              className="h-12 w-auto object-contain"
            />
            <p className="text-sm mt-5 leading-relaxed">
              {CONTACT_INFO.companyName}. Małe traktory, wielkie możliwości —
              centrum nowoczesnego rolnictwa i&nbsp;techniki komunalnej.
            </p>
            <div className="flex items-center gap-2 mt-5">
              <a
                href={CONTACT_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Stekro MiniTrak"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white/60 hover:text-primary hover:border-primary/40 transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={CONTACT_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Stekro MiniTrak"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white/60 hover:text-primary hover:border-primary/40 transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div>
            <p className="font-display font-bold text-white text-sm uppercase tracking-[0.2em] mb-4">
              Siedziba
            </p>
            <p className="text-sm flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
              <span>{CONTACT_INFO.address}</span>
            </p>
            <p className="text-sm flex items-start gap-2 mt-3">
              <MapPinned className="w-4 h-4 mt-0.5 shrink-0 text-primary/70" />
              <span className="text-white/55">
                {CONTACT_INFO.temporaryPoint}
              </span>
            </p>
          </div>
          <div>
            <p className="font-display font-bold text-white text-sm uppercase tracking-[0.2em] mb-4">
              Kontakt
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.emailMain}`}
                  className="hover:text-primary"
                >
                  {CONTACT_INFO.emailMain}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.emailParts}`}
                  className="hover:text-primary"
                >
                  {CONTACT_INFO.emailParts}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-display font-bold text-white text-sm uppercase tracking-[0.2em] mb-4">
              Telefony
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                Centrala:{" "}
                <span className="text-white">{CONTACT_INFO.mainPhone}</span>
              </li>
              <li>
                {TEAM[0].name} (sprzedaż):{" "}
                <span className="text-white">{TEAM[0].phone}</span>
              </li>
              <li>
                Sklep części:{" "}
                <span className="text-white">{CONTACT_INFO.partsPhone}</span>
              </li>
              <li className="text-white/55 pt-1">
                {CONTACT_INFO.hoursWeekday} · {CONTACT_INFO.hoursSaturday}
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 space-y-4 text-xs">
          <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
            <span className="text-white/55">
              {CONTACT_INFO.legalName} · {CONTACT_INFO.registeredAddress} · NIP {CONTACT_INFO.nip}
            </span>
            <span>
              Autoryzowany dealer Solis · LS Tractor · Aupax · Krone
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
            <span>
              © {new Date().getFullYear()} {CONTACT_INFO.companyName}. Wszelkie prawa zastrzeżone.
            </span>
            <span className="flex items-center gap-4">
              <Link href="/polityka-prywatnosci" className="hover:text-primary transition-colors">
                Polityka prywatności
              </Link>
              <Link href="/regulamin" className="hover:text-primary transition-colors">
                Regulamin
              </Link>
            </span>
          </div>
          <div className="pt-4 mt-2 border-t border-white/5 flex justify-center">
            <a
              href="https://aw.je/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[11px] text-white/35 hover:text-white/80 transition-colors"
              aria-label="WWW by aw.je"
            >
              <span>www by</span>
              <img
                src="/aw-logo-small.webp"
                alt="Logo studia aw.je — twórcy strony"
                title="aw.je"
                width={320}
                height={171}
                loading="lazy"
                decoding="async"
                className="h-7 w-auto opacity-75 transition-opacity duration-200 group-hover:opacity-100"
              />
              <span className="font-mono">aw.je</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
