#!/usr/bin/env bash
# generate-image-variants.sh
#
# Generuje brakujące warianty -400 i -800 dla zdjęć w artifacts/stekro/public/.
# Skrypt jest idempotentny — pomija pliki, które już istnieją.
#
# Użycie:
#   bash scripts/generate-image-variants.sh
#   pnpm run images          # alias w głównym package.json
#
# Wymagania:
#   ImageMagick 7  (magick)  — dostępny w środowisku Replit
#
# Co jest przetwarzane:
#   - Wszystkie *.webp, *.jpg, *.jpeg w public/ i podkatalogach
#   - Z WYJĄTKIEM plików, których nazwa kończy się na -400.ext / -800.ext
#     (czyli same warianty nie są źródłem kolejnych wariantów)
#   - Z WYJĄTKIEM plików logotypów, favikon i OG-image (lista poniżej),
#     które nie są używane w srcset.
#
# Wzorzec nazewnictwa (spójny z src/lib/img-utils.ts → imgVariant):
#   imgVariant() wstawia sufiks PRZED rozszerzeniem, zachowując oryginalne
#   rozszerzenie, więc warianty muszą mieć to samo rozszerzenie co źródło:
#   foo.webp  →  foo-400.webp  i  foo-800.webp
#   bar.jpeg  →  bar-400.jpeg  i  bar-800.jpeg
#   baz.jpg   →  baz-400.jpg   i  baz-800.jpg
#
# Oryginały NIE są nadpisywane.

set -euo pipefail

PUBLIC_DIR="$(cd "$(dirname "$0")/../artifacts/stekro/public" && pwd)"
WIDTHS=(400 800)

# Pliki wykluczone z generowania wariantów (nie trafiają do srcset)
EXCLUDE_PATTERN='(aw-logo|aw-logo-small|favicon|apple-touch-icon|icon-192|icon-512|og-image|opengraph|site\.webmanifest|hero-tractor-640|hero-tractor-960|hero-tractor\.webp|dealership|kariera-siedziba|solis-s22-hero|model-ls-mt2\.jpg|model-aupax-3055\.png)'

generated=0
skipped=0
errors=0

echo "==> Katalog źródłowy: $PUBLIC_DIR"
echo ""

# Zbierz pliki źródłowe (bez wariantów i bez wykluczeń)
while IFS= read -r -d '' src; do
  # Basename bez ścieżki — do sprawdzenia wykluczeń
  base="$(basename "$src")"
  # Rozszerzenie pliku (z kropką), np. .webp .jpeg .jpg
  ext="${base##*.}"
  ext_lower="${ext,,}"

  # Pomiń pliki, których nazwa to już wariant (-400.ext lub -800.ext)
  if [[ "$base" =~ -400\.(webp|jpg|jpeg)$ ]] || [[ "$base" =~ -800\.(webp|jpg|jpeg)$ ]]; then
    continue
  fi

  # Pomiń wykluczone pliki
  if [[ "$base" =~ $EXCLUDE_PATTERN ]]; then
    continue
  fi

  # Wyznacz rdzeń nazwy i katalog (ten sam co źródło)
  dir="$(dirname "$src")"
  stem="${base%.*}"   # np. model-foo lub aupax_2025_1

  for width in "${WIDTHS[@]}"; do
    # Wariant ma to samo rozszerzenie co źródło — zgodnie z imgVariant()
    dest="${dir}/${stem}-${width}.${ext_lower}"

    if [[ -f "$dest" ]]; then
      skipped=$((skipped + 1))
      continue
    fi

    echo "  Generuję: $(realpath --relative-to="$PUBLIC_DIR" "$dest")"
    if magick "$src" -resize "${width}x>" -quality 85 "$dest" 2>/dev/null; then
      generated=$((generated + 1))
    else
      echo "  BŁĄD przy: $src → $dest" >&2
      errors=$((errors + 1))
    fi
  done
done < <(find "$PUBLIC_DIR" \( -name "*.webp" -o -name "*.jpg" -o -name "*.jpeg" \) -print0 | sort -z)

echo ""
echo "==> Gotowe. Wygenerowano: ${generated}, pominięto (istniały): ${skipped}, błędów: ${errors}."
if [[ $errors -gt 0 ]]; then
  exit 1
fi
