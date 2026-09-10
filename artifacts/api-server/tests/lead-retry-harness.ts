// Harness testowy pętli ponowień (bundlowany esbuildem przez
// tests/lead-retry.test.mjs). Wywołuje retryFailedLeads() z atrapowym
// mailerem (bez prawdziwego SMTP) i zapytaniem zawężonym do leadów
// testowych (marker w nazwie) — dzięki temu nie dotyka prawdziwych
// leadów "failed" w bazie deweloperskiej.
//
// Env:
//   RETRY_TEST_MARKER — prefiks nazw leadów testowych (wymagany)
//   RETRY_TEST_MODE   — "success" (mailer wysyła) | "fail" (mailer rzuca)
//
// Wynik: linia "RESULT:<json>" na stdout z listą "wysłanych" maili.
import { retryFailedLeads } from "../src/lib/lead-retry";
import { getFailedLeads } from "../src/lib/leads";
import type { LeadMail } from "../src/lib/mailer";

const marker = process.env.RETRY_TEST_MARKER;
const mode = process.env.RETRY_TEST_MODE;
if (!marker) throw new Error("RETRY_TEST_MARKER not set");
if (mode !== "success" && mode !== "fail")
  throw new Error("RETRY_TEST_MODE must be 'success' or 'fail'");

const sent: Array<{
  subject: string;
  replyTo?: string;
  attachments: string[];
  textHasPhotoNote: boolean;
}> = [];

await retryFailedLeads({
  isMailerConfigured: () => true,
  // Prawdziwe zapytanie getFailedLeads (testujemy je!), zawężone do markera.
  getFailedLeads: async () =>
    (await getFailedLeads()).filter((l) => l.name.startsWith(marker)),
  sendLeadMail: async (mail: LeadMail) => {
    if (mode === "fail") throw new Error("SMTP down (test)");
    sent.push({
      subject: mail.subject,
      replyTo: mail.replyTo,
      attachments: (mail.attachments ?? []).map((a) => a.filename),
      textHasPhotoNote: mail.text.includes("nie mogły zostać ponownie załączone"),
    });
  },
  downloadLeadPhoto: async (photo) =>
    Buffer.from(`fake-photo:${photo.filename}`),
});

console.log("RESULT:" + JSON.stringify(sent));
process.exit(0);
