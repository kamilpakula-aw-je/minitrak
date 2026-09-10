import type { ComponentType } from "react";

import Home from "@/pages/home-ssr";
import ModelSolisS16 from "@/pages/model-solis-s16";
import ModelSolisS20 from "@/pages/model-solis-s20";
import ModelSolisS20Plus from "@/pages/model-solis-s20-plus";
import ModelSolisS22 from "@/pages/model-solis-s22";
import ModelSolisS26 from "@/pages/model-solis-s26";
import ModelSolisS26Hst from "@/pages/model-solis-s26-hst";
import ModelSolisS40 from "@/pages/model-solis-s40";
import ModelSolisS50 from "@/pages/model-solis-s50";
import ModelSolisS60 from "@/pages/model-solis-s60";
import ModelSolisS75 from "@/pages/model-solis-s75";
import ModelSolisS90 from "@/pages/model-solis-s90";
import ModelSolisN75 from "@/pages/model-solis-n75";
import ModelLsMt125 from "@/pages/model-ls-mt125";
import ModelLsXj25Hst from "@/pages/model-ls-xj25-hst";
import ModelLsXj25Mec from "@/pages/model-ls-xj25-mec";
import ModelLsMt335 from "@/pages/model-ls-mt335";
import ModelLsMt340 from "@/pages/model-ls-mt340";
import ModelLsMt350 from "@/pages/model-ls-mt350";
import ModelLsMt360 from "@/pages/model-ls-mt360";
import ModelLsXu6168 from "@/pages/model-ls-xu6168";
import ModelLsMt573 from "@/pages/model-ls-mt573";
import ModelLsMt7101 from "@/pages/model-ls-mt7101";
import ModelAupax2025 from "@/pages/model-aupax-2025";
import ModelAupax2040 from "@/pages/model-aupax-2040";
import ModelAupax3055 from "@/pages/model-aupax-3055";
import ModelAupax3075 from "@/pages/model-aupax-3075";
import ModelAupaxM404 from "@/pages/model-aupax-m404";
import Krone from "@/pages/krone";
import Kariera from "@/pages/kariera";
import Wymiana from "@/pages/wymiana";
import PolitykaPrywatnosci from "@/pages/polityka-prywatnosci";
import Regulamin from "@/pages/regulamin";
import KosiarkiBijakowe from "@/pages/kosiarki-bijakowe";
import MachineLisickiKb from "@/pages/machine-lisicki-kb";
import MachineStarkKdlProfi from "@/pages/machine-stark-kdl-profi";
import OrderLisickiKb from "@/pages/order-lisicki-kb";
import OrderStarkKdlProfi from "@/pages/order-stark-kdl-profi";
import Glebogryzarki from "@/pages/glebogryzarki";
import MachineStarkRsProfi from "@/pages/machine-stark-rs-profi";
import OrderStarkRsProfi from "@/pages/order-stark-rs-profi";

import { ROUTE_DEFS, type AppRoute, type PageId } from "@/routes";

/**
 * Eager-owe (statyczne) komponenty stron — używane WYŁĄCZNIE przez SSR.
 * renderToString nie obsługuje React.lazy, więc serwer renderuje
 * z tej mapy, a klient hydratuje wersją lazy z routes.tsx.
 * TypeScript pilnuje, żeby mapa pokrywała wszystkie PageId.
 */
const SSR_PAGES: Record<PageId, ComponentType> = {
  "solis-s16": ModelSolisS16,
  "solis-s20": ModelSolisS20,
  "solis-s20-plus": ModelSolisS20Plus,
  "solis-s22": ModelSolisS22,
  "solis-s26": ModelSolisS26,
  "solis-s26-hst": ModelSolisS26Hst,
  "solis-s40": ModelSolisS40,
  "solis-s50": ModelSolisS50,
  "solis-s60": ModelSolisS60,
  "solis-s75": ModelSolisS75,
  "solis-s90": ModelSolisS90,
  "solis-n75": ModelSolisN75,
  "ls-mt125": ModelLsMt125,
  "ls-xj25-hst": ModelLsXj25Hst,
  "ls-xj25-mec": ModelLsXj25Mec,
  "ls-mt335": ModelLsMt335,
  "ls-mt340": ModelLsMt340,
  "ls-mt350": ModelLsMt350,
  "ls-mt360": ModelLsMt360,
  "ls-xu6168": ModelLsXu6168,
  "ls-mt573": ModelLsMt573,
  "ls-mt7101": ModelLsMt7101,
  "aupax-2025": ModelAupax2025,
  "aupax-2040": ModelAupax2040,
  "aupax-3055": ModelAupax3055,
  "aupax-3075": ModelAupax3075,
  "aupax-m404": ModelAupaxM404,
  krone: Krone,
  kariera: Kariera,
  wymiana: Wymiana,
  "polityka-prywatnosci": PolitykaPrywatnosci,
  regulamin: Regulamin,
  "kosiarki-bijakowe": KosiarkiBijakowe,
  "lisicki-kb": MachineLisickiKb,
  "stark-kdl-profi": MachineStarkKdlProfi,
  "zamowienie-lisicki-kb": OrderLisickiKb,
  "zamowienie-stark-kdl-profi": OrderStarkKdlProfi,
  glebogryzarki: Glebogryzarki,
  "stark-rs-profi": MachineStarkRsProfi,
  "zamowienie-stark-rs-profi": OrderStarkRsProfi,
};

/** Trasy z komponentami eager — do renderToString po stronie serwera. */
export const SSR_ROUTES: AppRoute[] = ROUTE_DEFS.map(({ path, page }) => ({
  path,
  component: page === "home" ? Home : SSR_PAGES[page],
}));
