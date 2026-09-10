import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Facebook, Instagram, Mail, Menu, PhoneCall } from "lucide-react";
import { CONTACT_INFO } from "@/data";
import logoWhite from "@assets/stekro_minitrak_logo_white_nobg_small.webp";

const sectionLinks = [
  { href: "/#firma", label: "O\u00A0firmie" },
  { href: "/#katalog", label: "Traktory" },
  { href: "/#osprzet", label: "Maszyny" },
  { href: "/#czesci", label: "Części" },
  { href: "/#finansowanie", label: "Finansowanie" },
  { href: "/#kontakt", label: "Kontakt" },
];

export function SiteHeader() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#0e110d]/95 backdrop-blur-lg">
      <div className="container mx-auto flex h-24 items-center justify-between gap-2 px-3 sm:px-4 md:gap-8">
        <a href="/#top" className="flex shrink-0 items-center" aria-label="Stekro MiniTrak — strona główna">
          <img
            src={logoWhite}
            alt="Logo Stekro MiniTrak — dealer maszyn rolniczych i komunalnych"
            title="Stekro MiniTrak"
            width={480}
            height={240}
            className="h-12 w-auto object-contain sm:h-16 lg:h-20"
          />
        </a>
        <div className="hidden items-center gap-x-4 text-[13px] font-medium text-white/65 md:flex lg:gap-x-5 xl:gap-x-7">
          {sectionLinks.map((item) => (
            <a key={item.href} href={item.href} className="whitespace-nowrap transition-colors hover:text-white">
              {item.label}
            </a>
          ))}
          <a href="/kariera" className="transition-colors hover:text-white">Kariera</a>
          <span className="ml-1 hidden items-center gap-1.5 border-l border-white/10 pl-1 lg:flex">
            <a href={CONTACT_INFO.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook Stekro MiniTrak" className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition hover:bg-white/5 hover:text-primary">
              <Facebook className="h-4 w-4" />
            </a>
            <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram Stekro MiniTrak" className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition hover:bg-white/5 hover:text-primary">
              <Instagram className="h-4 w-4" />
            </a>
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button className="h-9 whitespace-nowrap rounded-full px-3 text-xs font-semibold sm:px-5 sm:text-[13px]" asChild>
            <a href="/wymiana">Wymień ciągnik na&nbsp;nowy!</a>
          </Button>
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger asChild>
              <button type="button" aria-label="Otwórz menu" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white/30 hover:text-white md:hidden">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88%] max-w-sm border-white/10 bg-[#0e110d] text-white">
              <SheetHeader className="mb-8">
                <SheetTitle className="text-left font-display tracking-tight text-white">Nawigacja</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 text-base font-medium">
                {[...sectionLinks.slice(0, 5), { href: "/#opinie", label: "Opinie klientów" }, { href: "/#faq", label: "Najczęstsze pytania" }, sectionLinks[5]].map((item) => (
                  <a key={item.href} href={item.href} onClick={() => setMobileNavOpen(false)} className="rounded-xl px-4 py-3 text-white/80 transition hover:bg-white/5 hover:text-white">
                    {item.label}
                  </a>
                ))}
                <a href="/kariera" onClick={() => setMobileNavOpen(false)} className="rounded-xl px-4 py-3 text-white/80 transition hover:bg-white/5 hover:text-white">
                  Kariera
                </a>
              </nav>
              <div className="mt-10 space-y-3 border-t border-white/10 pt-6 text-sm">
                <a href={`tel:${CONTACT_INFO.salesPhone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-white/80 hover:text-primary">
                  <PhoneCall className="h-4 w-4 text-primary" /> {CONTACT_INFO.salesPhone}
                </a>
                <a href={`mailto:${CONTACT_INFO.emailMain}`} className="flex items-center gap-3 text-white/80 hover:text-primary">
                  <Mail className="h-4 w-4 text-primary" /> {CONTACT_INFO.emailMain}
                </a>
                <div className="flex items-center gap-2 pt-2">
                  <a href={CONTACT_INFO.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook Stekro MiniTrak" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-primary/40 hover:text-primary">
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram Stekro MiniTrak" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-primary/40 hover:text-primary">
                    <Instagram className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}