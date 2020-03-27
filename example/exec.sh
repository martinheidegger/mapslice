#/bin/bash

FOLDER=$(dirname $0)

# ↓ Replace the next line with:
# ↓ npx mapslice
npx mapslice \
  -f "$FOLDER/japan.jpg" \
  --tileSize 128 \
  --skipEmptyTiles \
  --background "#00000000"

npx mapslice \
  -f "$FOLDER/tibet.svg" \
  --output "$FOLDER/tibet/{z}_{y}_{x}.png" \
  --tileSize 256 \
  --parallelLimit 20 \
  --background "white"
