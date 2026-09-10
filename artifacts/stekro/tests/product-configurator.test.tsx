import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MachineLisickiKb from "../src/pages/machine-lisicki-kb";

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: () => ({
      matches: false,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent() { return false; },
    }),
  });
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

afterEach(cleanup);

describe("Konfigurator produktu LISICKI KB", () => {
  it("wylicza cenę i aktywuje poprawny link zakupu po wyborze modelu oraz WOM", async () => {
    const user = userEvent.setup();
    render(<MachineLisickiKb />);

    const buyButton = screen.getByRole("button", { name: /Kup produkt/i });
    expect(buyButton).toBeDisabled();
    expect(screen.getByTestId("configured-price")).toHaveTextContent("Wybierz wszystkie opcje");

    await user.selectOptions(screen.getByTestId("select-product-model"), "KB 160");
    await user.selectOptions(screen.getByTestId("select-product-addon"), "WOM 80");

    expect(screen.getByTestId("configured-price")).toHaveTextContent(/7\s?200,00|7200,00/);
    const buyLink = screen.getByRole("link", { name: /Kup produkt/i });
    expect(buyLink).toHaveAttribute(
      "href",
      "/zamowienie/lisicki-kb?model=KB+160&wom=WOM+80&price=7200",
    );
  });

  it("link specyfikacji prowadzi do sekcji umieszczonej przed skrótem parametrów", () => {
    render(<MachineLisickiKb />);
    expect(screen.getByRole("link", { name: "Zobacz specyfikację" })).toHaveAttribute("href", "#specyfikacja");

    const specification = document.querySelector("#specyfikacja");
    const stats = screen.getByTestId("product-quick-stats");
    expect(specification).not.toBeNull();
    expect(specification?.compareDocumentPosition(stats as Node) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("synchronizuje wybór przywrócony przez przeglądarkę po powrocie na stronę", async () => {
    render(<MachineLisickiKb />);
    const modelSelect = screen.getByTestId("select-product-model") as HTMLSelectElement;
    const addOnSelect = screen.getByTestId("select-product-addon") as HTMLSelectElement;

    modelSelect.value = "KB 180";
    addOnSelect.value = "WOM 75";
    window.dispatchEvent(new Event("pageshow"));

    expect(await screen.findByText(/8\s?270,00|8270,00/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Kup produkt/i })).toHaveAttribute(
      "href",
      "/zamowienie/lisicki-kb?model=KB+180&wom=WOM+75&price=8270",
    );
  });

  it("aktualizuje konfigurację także po natywnym zdarzeniu input", async () => {
    render(<MachineLisickiKb />);
    const modelSelect = screen.getByTestId("select-product-model") as HTMLSelectElement;
    const addOnSelect = screen.getByTestId("select-product-addon") as HTMLSelectElement;

    modelSelect.value = "KB 160";
    fireEvent.input(modelSelect);
    addOnSelect.value = "WOM 80";
    fireEvent.input(addOnSelect);

    expect(await screen.findByText(/7\s?200,00|7200,00/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Kup produkt/i })).toHaveAttribute(
      "href",
      "/zamowienie/lisicki-kb?model=KB+160&wom=WOM+80&price=7200",
    );
  });
});