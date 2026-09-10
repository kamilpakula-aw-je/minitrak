/**
 * Returns a path with a width suffix injected before the extension.
 * e.g. imgVariant("/model-foo.webp", 400) → "/model-foo-400.webp"
 *      imgVariant("/gallery/img_1.webp", 800) → "/gallery/img_1-800.webp"
 */
export function imgVariant(src: string, width: number): string {
  const lastDot = src.lastIndexOf(".");
  if (lastDot === -1) return src;

  // If the src already ends with -600 or -1200 before the extension, strip it
  const base = src.replace(/-(400|599|600|800|900|1000|1200)(?=\.\w+$)/, "");
  const baseLastDot = base.lastIndexOf(".");
  return base.slice(0, baseLastDot) + `-${width}` + base.slice(baseLastDot);
}

/**
 * Returns a srcset string for catalog card thumbnails.
 * Assumes 400w and 800w pre-generated variants exist.
 */
export function catalogSrcSet(src: string): string {
  return `${imgVariant(src, 400)} 400w, ${imgVariant(src, 800)} 800w`;
}

/**
 * Returns a srcset string for gallery and product images.
 * Product assets use a 600 px variant plus their real maximum width.
 */
export function gallerySrcSet(src: string, intrinsicWidth = 1200): string {
  if (/-(599|600|900|1000|1200)\./.test(src)) {
    const largeWidth = intrinsicWidth >= 1200 ? 1200 : intrinsicWidth;
    if (largeWidth <= 600) return `${imgVariant(src, largeWidth)} ${largeWidth}w`;
    return `${imgVariant(src, 600)} 600w, ${imgVariant(src, largeWidth)} ${largeWidth}w`;
  }
  return `${imgVariant(src, 400)} 400w, ${imgVariant(src, 800)} 800w`;
}
