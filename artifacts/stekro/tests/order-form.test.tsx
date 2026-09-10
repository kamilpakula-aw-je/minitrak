import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductOrderPage } from "../src/components/product-order-form";

const originalFetch = global.fetch;

// Mock matchMedia and other DOM APIs not present in jsdom
beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("ProductOrderPage Component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
    global.fetch = originalFetch;
    delete (window as any).dataLayer;
  });

  const defaultProps = {
    productSlug: "lisicki-kb" as const,
    productName: "Kosiarka bijakowa LISICKI KB",
    productImage: "/test.jpg",
    productImageWidth: 1200,
    productImageHeight: 676,
    productImageAlt: "Kosiarka testowa.",
    catalogHref: "/test-href",
    formId: "test-form-id",
    successId: "test-success-id",
  };

  async function fillRequiredFields() {
    const user = userEvent.setup();
    await user.type(screen.getByTestId("input-firstName"), "Jan");
    await user.type(screen.getByTestId("input-lastName"), "Kowalski");
    await user.type(screen.getByTestId("input-email"), "jan@example.com");
    await user.type(screen.getByTestId("input-phone"), "123456789");
    await user.clear(screen.getByTestId("input-country"));
    await user.type(screen.getByTestId("input-country"), "Polska");
    await user.type(screen.getByTestId("input-city"), "Warszawa");
    await user.type(screen.getByTestId("input-postalCode"), "00-001");
    await user.type(screen.getByTestId("input-street"), "Główna 1");
    await user.click(screen.getByTestId("checkbox-rodo"));
    return user;
  }

  it("renders the form with required fields and stable identifiers", () => {
    render(<ProductOrderPage {...defaultProps} />);
    expect(screen.getByTestId("input-firstName")).toBeInTheDocument();
    expect(screen.getByTestId("input-email")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    expect(screen.getByTestId("order-form")).toHaveAttribute("id", "test-form-id");
    expect(screen.getByRole("button", { name: "Finalizuj zamówienie" })).toBeInTheDocument();
  });

  it("generates the idempotency key at submit and keeps it for a retry", async () => {
    const dataLayer: any[] = [];
    (window as any).dataLayer = dataLayer;
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ ok: false, error: "Network error" }) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ ok: true }) });

    global.fetch = fetchMock;

    render(<ProductOrderPage {...defaultProps} />);
    const user = await fillRequiredFields();

    await user.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    const firstCallBody = JSON.parse(fetchMock.mock.calls[0][1].body);
    const firstKey = firstCallBody.idempotencyKey;
    expect(firstKey).toMatch(/^[0-9a-f-]{36}$/i);

    await waitFor(() => {
      expect(screen.getByTestId("error-alert")).toBeInTheDocument();
    });
    expect(screen.getByTestId("error-alert")).toHaveFocus();
    expect(dataLayer).toHaveLength(0);

    await user.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    const secondCallBody = JSON.parse(fetchMock.mock.calls[1][1].body);
    expect(secondCallBody.idempotencyKey).toBe(firstKey);

    await waitFor(() => {
      expect(screen.getByTestId("success-alert")).toBeInTheDocument();
    });
    expect(screen.getByTestId("success-alert")).toHaveAttribute("id", "test-success-id");
    expect(screen.getByTestId("success-alert")).toHaveFocus();
    expect(dataLayer).toHaveLength(1);
  });

  it.each([
    {
      productSlug: "lisicki-kb" as const,
      productName: "Kosiarka bijakowa LISICKI KB",
    },
    {
      productSlug: "stark-kdl-profi" as const,
      productName: "Kosiarka bijakowa STARK KDL PROFI",
    },
    {
      productSlug: "stark-rs-profi" as const,
      productName: "Glebogryzarka STARK RS PROFI",
    },
  ])("sends the exact $productSlug product pair", async ({ productSlug, productName }) => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ok: true }),
    });
    global.fetch = fetchMock;
    render(<ProductOrderPage {...defaultProps} productSlug={productSlug} productName={productName} />);
    const user = await fillRequiredFields();
    await user.click(screen.getByTestId("submit-button"));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    const payload = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(payload).toMatchObject({
      productSlug,
      productName,
      firstName: "Jan",
      lastName: "Kowalski",
      email: "jan@example.com",
      phone: "123456789",
      country: "Polska",
      city: "Warszawa",
      postalCode: "00-001",
      street: "Główna 1",
      rodo: true,
    });
  });

  it("pushes form_submit_success only after success and without personal data", async () => {
    const dataLayer: any[] = [];
    (window as any).dataLayer = dataLayer;

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ok: true }),
    });
    global.fetch = fetchMock;

    render(<ProductOrderPage {...defaultProps} />);
    const user = await fillRequiredFields();
    await user.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(screen.getByTestId("success-alert")).toBeInTheDocument();
    });

    expect(dataLayer).toHaveLength(1);
    expect(dataLayer[0]).toEqual({
      event: "form_submit_success",
      form_id: "test-form-id",
      product_slug: "lisicki-kb",
    });
    expect(dataLayer[0].email).toBeUndefined();
    expect(dataLayer[0].firstName).toBeUndefined();
    expect(dataLayer[0].lastName).toBeUndefined();
    expect(dataLayer[0].phone).toBeUndefined();
  });

  it("przenosi wybrany model RS Profi z adresu do zamówienia", async () => {
    window.history.pushState({}, "", "/zamowienie/stark-rs-profi?model=RS%20115%20Profi");
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ok: true }),
    });
    global.fetch = fetchMock;

    render(
      <ProductOrderPage
        {...defaultProps}
        productSlug="stark-rs-profi"
        productName="Glebogryzarka STARK RS PROFI"
        modelOptions={["RS 95 Profi", "RS 105 Profi", "RS 115 Profi", "RS 125 Profi", "RS 135 Profi"]}
      />,
    );

    await waitFor(() => expect(screen.getByTestId("select-order-model")).toHaveValue("RS 115 Profi"));
    const user = await fillRequiredFields();
    await user.click(screen.getByTestId("submit-button"));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    const payload = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(payload.selectedModel).toBe("RS 115 Profi");
    window.history.replaceState({}, "", "/");
  });

  it("przenosi pełną konfigurację LISICKI KB z adresem, ceną i WOM do API", async () => {
    window.history.pushState({}, "", "/zamowienie/lisicki-kb?model=KB%20160&wom=WOM%2080&price=7200");
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ok: true }),
    });
    global.fetch = fetchMock;

    render(
      <ProductOrderPage
        {...defaultProps}
        modelOptions={["KB 120", "KB 140", "KB 160", "KB 180", "KB 200"]}
        addOnOptions={["WOM 75", "WOM 80", "WOM 90"]}
        modelPrices={{ "KB 120": 5950, "KB 140": 6300, "KB 160": 6900, "KB 180": 8000, "KB 200": 9000 }}
        addOnPrices={{ "WOM 75": 270, "WOM 80": 300, "WOM 90": 350 }}
      />,
    );

    await waitFor(() => {
      expect(screen.getByTestId("select-order-model")).toHaveValue("KB 160");
      expect(screen.getByTestId("select-order-addon")).toHaveValue("WOM 80");
      expect(screen.getByTestId("order-configured-price")).toHaveTextContent(/7\s?200,00|7200,00/);
      expect(screen.getByTestId("order-summary-price")).toHaveTextContent(/7\s?200,00|7200,00/);
      expect(screen.getByTestId("order-summary-price")).toHaveTextContent("KB 160 + WOM 80");
    });

    const user = await fillRequiredFields();
    await user.selectOptions(screen.getByTestId("select-order-model"), "KB 180");
    await user.selectOptions(screen.getByTestId("select-order-addon"), "WOM 75");
    await waitFor(() => {
      expect(screen.getByTestId("order-configured-price")).toHaveTextContent(/8\s?270,00|8270,00/);
      expect(screen.getByTestId("order-summary-price")).toHaveTextContent(/8\s?270,00|8270,00/);
      expect(screen.getByTestId("order-summary-price")).toHaveTextContent("KB 180 + WOM 75");
    });
    await user.click(screen.getByTestId("submit-button"));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    const payload = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(payload).toMatchObject({
      selectedModel: "KB 180",
      selectedAddOn: "WOM 75",
      configuredPrice: 8270,
    });
    window.history.replaceState({}, "", "/");
  });
});
