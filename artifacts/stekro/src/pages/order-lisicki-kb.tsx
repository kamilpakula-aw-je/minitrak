import { ProductOrderPage } from "@/components/product-order-form";

export default function OrderLisickiKb() {
  return (
    <ProductOrderPage
      productSlug="lisicki-kb"
      productName="Kosiarka bijakowa LISICKI KB"
      productImage="/products/lisicki-kb/kosiarka-bijakowa-lisicki-kb-1-1200.webp"
      productImageWidth={1200}
      productImageHeight={676}
      productImageAlt="Czerwona kosiarka bijakowa LISICKI KB zamontowana za ciągnikiem."
      catalogHref="/maszyny/kosiarki-bijakowe/lisicki-kb"
      formId="zamowienie-lisicki-kb-form"
      successId="zamowienie-lisicki-kb-success"
      modelOptions={["KB 120", "KB 140", "KB 160", "KB 180", "KB 200"]}
      addOnOptions={["WOM 75", "WOM 80", "WOM 90"]}
      modelPrices={{
        "KB 120": 5950,
        "KB 140": 6300,
        "KB 160": 6900,
        "KB 180": 8000,
        "KB 200": 9000,
      }}
      addOnPrices={{
        "WOM 75": 270,
        "WOM 80": 300,
        "WOM 90": 350,
      }}
    />
  );
}
