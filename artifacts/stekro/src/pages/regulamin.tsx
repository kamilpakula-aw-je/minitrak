import { Breadcrumbs } from "@/components/breadcrumbs";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { CONTACT_INFO } from "@/data";

export default function Regulamin() {
  return (
    <div className="min-h-screen bg-[#0e110d] text-white">
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Powrót na stronę główną</span>
          </Link>
          <span className="text-xs uppercase tracking-[0.2em] text-white/45">Dokumenty prawne</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">Dokument</p>
        <Breadcrumbs tone="dark" current="Regulamin serwisu" />
        <h1 className="font-display font-bold text-4xl md:text-5xl mb-3">Regulamin serwisu</h1>
        <p className="text-white/55 text-sm mb-12">Obowiązuje od: 7 maja 2026 r.</p>

        <div className="space-y-10 text-white/75 leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">§1. Postanowienia ogólne</h2>
            <p>
              Niniejszy regulamin określa zasady korzystania ze&nbsp;strony internetowej prowadzonej pod&nbsp;marką
              <strong className="text-white"> {CONTACT_INFO.companyName}</strong> oraz&nbsp;warunki kontaktu z&nbsp;Operatorem
              w&nbsp;sprawach ofertowych, sprzedażowych i&nbsp;serwisowych.
            </p>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm">
              <p className="text-white/55 uppercase text-[11px] tracking-[0.2em] mb-2">Operator serwisu</p>
              <p className="font-semibold text-white">{CONTACT_INFO.legalName}</p>
              <p>{CONTACT_INFO.registeredAddress}</p>
              <p>NIP: {CONTACT_INFO.nip}</p>
              <p className="mt-3">
                Kontakt: <a href={`mailto:${CONTACT_INFO.emailMain}`} className="text-primary hover:underline">{CONTACT_INFO.emailMain}</a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">§2. Definicje</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">Operator</strong> — {CONTACT_INFO.legalName}, {CONTACT_INFO.registeredAddress}, NIP {CONTACT_INFO.nip}.</li>
              <li><strong className="text-white">Serwis</strong> — strona internetowa prowadzona przez Operatora pod&nbsp;marką {CONTACT_INFO.companyName}.</li>
              <li><strong className="text-white">Użytkownik</strong> — każda osoba korzystająca z&nbsp;Serwisu.</li>
              <li><strong className="text-white">Zapytanie</strong> — wiadomość przesłana przez Użytkownika za pośrednictwem formularza kontaktowego, e-maila lub&nbsp;telefonu.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">§3. Zakres usług</h2>
            <p>Serwis ma charakter informacyjno-ofertowy. Za jego pośrednictwem Operator:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>prezentuje katalog ciągników, maszyn zielonkowych, części i&nbsp;osprzętu marek Solis, LS Tractor, Aupax oraz&nbsp;Krone,</li>
              <li>umożliwia kontakt w&nbsp;celu uzyskania oferty handlowej, finansowania lub&nbsp;serwisu,</li>
              <li>publikuje informacje o&nbsp;promocjach, finansowaniu i&nbsp;wydarzeniach branżowych.</li>
            </ul>
            <p className="mt-3">
              Serwis nie prowadzi sprzedaży online. Wszystkie umowy zawierane są bezpośrednio z&nbsp;Operatorem
              po&nbsp;indywidualnych ustaleniach.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">§4. Warunki korzystania</h2>
            <p>
              Użytkownik zobowiązuje się do korzystania z&nbsp;Serwisu w&nbsp;sposób zgodny z&nbsp;prawem, dobrymi obyczajami oraz&nbsp;postanowieniami
              niniejszego regulaminu. Zabronione jest dostarczanie treści o&nbsp;charakterze bezprawnym
              oraz&nbsp;podejmowanie działań mogących zakłócić funkcjonowanie Serwisu.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">§5. Zapytania i oferty</h2>
            <p>
              Złożenie Zapytania nie jest równoznaczne z&nbsp;zawarciem umowy. Wszystkie informacje o&nbsp;produktach i&nbsp;cenach
              prezentowane w&nbsp;Serwisie mają charakter informacyjny i&nbsp;nie stanowią oferty handlowej w&nbsp;rozumieniu art. 66 §1
              Kodeksu cywilnego. Wiążącą ofertę Operator przedstawia w&nbsp;formie indywidualnej propozycji handlowej.
            </p>
            <p className="mt-3">
              Czas odpowiedzi na&nbsp;Zapytanie wynosi zwykle do 2 dni roboczych.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">§6. Własność intelektualna</h2>
            <p>
              Wszystkie treści opublikowane w&nbsp;Serwisie (teksty, zdjęcia, grafiki, logo, układ strony) są chronione prawem
              autorskim i&nbsp;stanowią własność Operatora lub&nbsp;jego partnerów. Kopiowanie i&nbsp;wykorzystywanie ich bez pisemnej
              zgody Operatora jest zabronione.
            </p>
            <p className="mt-3">
              Logo i&nbsp;znaki towarowe Solis, LS Tractor, Aupax oraz&nbsp;Krone są własnością ich producentów i&nbsp;są
              używane na&nbsp;podstawie umów dystrybucyjnych.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">§7. Reklamacje dotyczące serwisu</h2>
            <p>
              Reklamacje dotyczące funkcjonowania Serwisu należy zgłaszać na&nbsp;adres{" "}
              <a href={`mailto:${CONTACT_INFO.emailMain}`} className="text-primary hover:underline">{CONTACT_INFO.emailMain}</a>.
              Operator rozpatrzy reklamację w&nbsp;terminie 14 dni od daty otrzymania.
            </p>
            <p className="mt-3">
              Reklamacje produktowe (ciągniki, maszyny, części) realizowane są zgodnie z&nbsp;warunkami gwarancji producenta
              oraz&nbsp;indywidualnymi umowami sprzedaży.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">§8. Dane osobowe</h2>
            <p>
              Zasady przetwarzania danych osobowych zostały szczegółowo opisane w{" "}
              <Link href="/polityka-prywatnosci" className="text-primary hover:underline">Polityce prywatności</Link>.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">§9. Postanowienia końcowe</h2>
            <p>
              Operator zastrzega sobie prawo do zmiany niniejszego regulaminu. O&nbsp;istotnych zmianach Użytkownicy zostaną
              poinformowani w&nbsp;widoczny sposób na&nbsp;stronie głównej. W&nbsp;sprawach nieuregulowanych regulaminem zastosowanie
              mają przepisy prawa polskiego, w&nbsp;szczególności Kodeksu cywilnego oraz&nbsp;ustawy o&nbsp;świadczeniu usług drogą
              elektroniczną.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
