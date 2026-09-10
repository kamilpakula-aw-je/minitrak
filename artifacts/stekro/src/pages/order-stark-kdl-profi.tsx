import { ProductOrderPage } from "@/components/product-order-form";

export default function OrderStarkKdlProfi() {
  return (
    <ProductOrderPage
      productSlug="stark-kdl-profi"
      productName="Kosiarka bijakowa STARK KDL PROFI"
      productImage="/products/stark-kdl-profi/kosiarka-bijakowa-stark-kdl-profi-1-900.webp"
      productImageWidth={900}
      productImageHeight={675}
      productImageAlt="Zielona kosiarka bijakowa STARK KDL Profi z ramieniem hydraulicznym."
      catalogHref="/maszyny/kosiarki-bijakowe/stark-kdl-profi"
      formId="zamowienie-stark-kdl-profi-form"
      successId="zamowienie-stark-kdl-profi-success"
      modelOptions={["KDL 160 Profi", "KDL 180 Profi", "KDL 200 Profi", "KDL 220 Profi"]}
    />
  );
}
