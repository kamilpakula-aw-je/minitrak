import { Breadcrumbs } from "@/components/breadcrumbs";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { CONTACT_INFO } from "@/data";

export default function PolitykaPrywatnosci() {
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
        <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">RODO</p>
        <Breadcrumbs tone="dark" current="Polityka prywatności" />
        <h1 className="font-display font-bold text-4xl md:text-5xl mb-3">Polityka prywatności</h1>
        <p className="text-white/55 text-sm mb-12">Obowiązuje od: 7 maja 2026 r. · Ostatnia aktualizacja: 11 sierpnia 2026 r.</p>

        <div className="space-y-10 text-white/75 leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">1. Administrator danych osobowych</h2>
            <p>
              Administratorem Twoich danych osobowych w&nbsp;rozumieniu Rozporządzenia Parlamentu Europejskiego i&nbsp;Rady (UE) 2016/679
              z&nbsp;dnia 27 kwietnia 2016 r. (RODO) jest:
            </p>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm">
              <p className="font-semibold text-white">{CONTACT_INFO.legalName}</p>
              <p>{CONTACT_INFO.registeredAddress}</p>
              <p>NIP: {CONTACT_INFO.nip}</p>
              <p className="mt-3">
                Kontakt: <a href={`mailto:${CONTACT_INFO.emailMain}`} className="text-primary hover:underline">{CONTACT_INFO.emailMain}</a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">2. Zakres i&nbsp;cel przetwarzania danych</h2>
            <p>Przetwarzamy Twoje dane osobowe w następujących celach:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>obsługa zapytań ofertowych i&nbsp;kontaktu z&nbsp;klientem (podstawa: art. 6 ust. 1 lit. b i&nbsp;f RODO),</li>
              <li>realizacja umów sprzedaży i&nbsp;serwisu (podstawa: art. 6 ust. 1 lit. b RODO),</li>
              <li>wystawianie i&nbsp;archiwizacja faktur oraz&nbsp;dokumentacji księgowej (art. 6 ust. 1 lit. c RODO),</li>
              <li>analiza ruchu na&nbsp;stronie i&nbsp;statystyki (Google Analytics) — wyłącznie po&nbsp;wyrażeniu zgody,</li>
              <li>marketing i&nbsp;remarketing (Google Ads, Google Merchant Center) — wyłącznie po&nbsp;wyrażeniu zgody.</li>
            </ul>
            <h3 className="font-display font-semibold text-lg text-white mt-6 mb-3">Formularz wyceny i wymiany maszyn</h3>
            <p>
              Na podstronie „Wymiana / wycena" udostępniamy formularz, za pośrednictwem którego możesz przesłać nam swoją
              maszynę do bezpłatnej i&nbsp;niezobowiązującej wyceny. W&nbsp;ramach tego formularza przetwarzamy:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>dane kontaktowe: imię i&nbsp;nazwisko, numer telefonu oraz&nbsp;opcjonalnie adres e-mail,</li>
              <li>dane dotyczące maszyny: marka, model, rok produkcji oraz&nbsp;opis stanu technicznego,</li>
              <li><strong className="text-white">zdjęcia maszyny</strong> przesłane przez Ciebie w formularzu.</li>
            </ul>
            <p className="mt-3">
              Celem przetwarzania tych danych jest przygotowanie indywidualnej wyceny maszyny oraz&nbsp;kontakt zwrotny w&nbsp;sprawie
              propozycji odkupu lub&nbsp;wymiany (podstawa: art. 6 ust. 1 lit. b i&nbsp;f RODO — podjęcie działań na&nbsp;żądanie osoby, której
              dane dotyczą, oraz&nbsp;prawnie uzasadniony interes Administratora). Przesłane zdjęcia oraz&nbsp;dane formularza
              przechowywane są w&nbsp;usłudze chmurowej naszego dostawcy IT wyłącznie przez czas niezbędny do rozpatrzenia
              zgłoszenia i&nbsp;przygotowania wyceny — nie dłużej niż 12 miesięcy od ostatniego kontaktu, o&nbsp;ile nie dojdzie do
              zawarcia umowy. Podanie danych jest dobrowolne, jednak bez danych kontaktowych i&nbsp;zdjęć nie będziemy w&nbsp;stanie
              przygotować wyceny.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">3. Odbiorcy danych</h2>
            <p>
              Twoje dane mogą być przekazywane podmiotom współpracującym z&nbsp;Administratorem w&nbsp;zakresie niezbędnym do realizacji
              powyższych celów: biuru rachunkowemu, dostawcom usług IT i&nbsp;hostingu, firmom kurierskim oraz&nbsp;operatorom narzędzi
              analitycznych i&nbsp;marketingowych (Google LLC). Dane nie są sprzedawane podmiotom trzecim.
            </p>
            <p className="mt-3">
              Dane przesyłane przez formularze na&nbsp;stronie (formularz kontaktowy oraz&nbsp;formularz wyceny/wymiany maszyn) mogą być
              przekazywane Administratorowi również za pośrednictwem <strong className="text-white">poczty elektronicznej</strong>
              {" "}(e-mail), która stanowi jeden z&nbsp;kanałów przekazywania treści zgłoszeń wraz z&nbsp;załącznikami (np. zdjęciami maszyn).
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">4. Przekazywanie danych poza EOG</h2>
            <p>
              Część narzędzi, z&nbsp;których korzystamy (w szczególności usługi Google LLC z&nbsp;siedzibą w&nbsp;USA — Google Analytics,
              Google Ads, Google Merchant Center), może wiązać się z&nbsp;przekazaniem danych osobowych poza Europejski Obszar
              Gospodarczy (EOG). Przekazywanie takie odbywa się na&nbsp;podstawie mechanizmów zgodnych z&nbsp;RODO — standardowych
              klauzul umownych (SCC) zatwierdzonych przez Komisję Europejską oraz&nbsp;w&nbsp;oparciu o&nbsp;ramy ochrony danych
              UE–USA (EU–US Data Privacy Framework), do którego przystąpił dostawca. Zapewnia to odpowiedni poziom
              ochrony przekazywanych danych.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">5. Okres przechowywania</h2>
            <p>
              Dane przetwarzamy przez okres niezbędny do realizacji celu — w&nbsp;przypadku zapytań ofertowych do 12 miesięcy od
              ostatniego kontaktu, w&nbsp;przypadku umów do upływu okresu przedawnienia roszczeń, a&nbsp;dla&nbsp;dokumentacji księgowej
              przez okres wymagany przepisami (5 lat).
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">6. Twoje prawa</h2>
            <p>W związku z przetwarzaniem danych przysługują Ci następujące prawa:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>dostępu do danych oraz&nbsp;otrzymania ich kopii,</li>
              <li>sprostowania (poprawiania) danych,</li>
              <li>usunięcia danych („prawo do bycia zapomnianym"),</li>
              <li>ograniczenia przetwarzania,</li>
              <li>przenoszenia danych,</li>
              <li>wniesienia sprzeciwu wobec przetwarzania,</li>
              <li>cofnięcia zgody w&nbsp;dowolnym momencie (bez wpływu na&nbsp;zgodność z&nbsp;prawem przetwarzania przed cofnięciem),</li>
              <li>wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">7. Pliki cookies</h2>
            <p>
              Strona wykorzystuje pliki cookies w trzech kategoriach:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong className="text-white">Niezbędne</strong> — wymagane do działania serwisu (sesja, formularz kontaktowy). Aktywne zawsze.</li>
              <li><strong className="text-white">Analityczne</strong> — anonimowe statystyki ruchu (Google Analytics, GTM). Aktywowane po&nbsp;zgodzie.</li>
              <li><strong className="text-white">Marketingowe</strong> — reklama i&nbsp;remarketing (Google Ads). Aktywowane po&nbsp;zgodzie.</li>
            </ul>
            <p className="mt-3">
              W&nbsp;każdej chwili możesz zmienić swoje preferencje, klikając przycisk „Cookies" w&nbsp;lewym dolnym rogu strony.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">8. Bezpieczeństwo danych</h2>
            <p>
              Stosujemy odpowiednie środki techniczne i&nbsp;organizacyjne zapewniające ochronę przetwarzanych danych osobowych —
              w&nbsp;szczególności szyfrowanie połączeń (HTTPS/TLS), kontrolę dostępu oraz&nbsp;regularne kopie zapasowe.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">9. Inspektor Ochrony Danych</h2>
            <p>
              Administrator nie wyznaczył Inspektora Ochrony Danych (IOD). We&nbsp;wszystkich sprawach dotyczących przetwarzania
              danych osobowych oraz&nbsp;realizacji przysługujących Ci praw możesz kontaktować się bezpośrednio z&nbsp;Administratorem
              pod&nbsp;adresem: <a href={`mailto:${CONTACT_INFO.emailMain}`} className="text-primary hover:underline">{CONTACT_INFO.emailMain}</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">10. Zmiany polityki</h2>
            <p>
              Administrator zastrzega sobie prawo do wprowadzania zmian w&nbsp;niniejszej polityce. O&nbsp;istotnych zmianach
              poinformujemy w&nbsp;widoczny sposób na&nbsp;stronie głównej.
            </p>
          </section>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
