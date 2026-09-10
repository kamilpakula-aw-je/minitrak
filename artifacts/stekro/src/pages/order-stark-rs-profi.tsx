import { ProductOrderPage } from "@/components/product-order-form";

export default function OrderStarkRsProfi() {
  return (
    <ProductOrderPage
      productSlug="stark-rs-profi"
      productName="Glebogryzarka STARK RS PROFI"
      productImage="/products/stark-rs-profi/glebogryzarka-stark-rs-profi-3-1200.webp"
      productImageWidth={1200}
      productImageHeight={675}
      productImageAlt="Zielona glebogryzarka STARK RS Profi ustawiona na polu."
      catalogHref="/maszyny/glebogryzarki/stark-rs-profi"
      formId="zamowienie-stark-rs-profi-form"
      successId="zamowienie-stark-rs-profi-success"
      modelOptions={["RS 95 Profi", "RS 105 Profi", "RS 115 Profi", "RS 125 Profi", "RS 135 Profi"]}
    />
  );
}