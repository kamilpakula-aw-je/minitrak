import { HomeShell } from "./home";
import HomeBelowFold from "./home-sections";

/**
 * Wersja Home dla SSR używa tego samego drzewa co pierwszy render klienta.
 */
export default function HomeSSR() {
  return <HomeShell BelowFold={HomeBelowFold} />;
}
