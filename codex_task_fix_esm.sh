#!/usr/bin/env bash
# codex_task_fix_esm.sh — standardize project to ESM for Next.js 16 / Turbopack
# Usage: chmod +x codex_task_fix_esm.sh && ./codex_task_fix_esm.sh

echo "🧠 [Codex] Initiating ESM standardization for swl-site-dev..."

cd "$(dirname "$0")" || exit 1

# 1. ensure package.json has "type": "module"
echo "→ Updating package.json..."
tmpfile=$(mktemp)
jq '.type = "module"' package.json > "$tmpfile" && mv "$tmpfile" package.json

# 2. rename legacy configs if they exist
rename_if_exists() {
  local old=$1
  local new=$2
  if [ -f "$old" ]; then
    echo "→ Renaming $old → $new"
    mv "$old" "$new"
  fi
}

rename_if_exists "next.config.js" "next.config.mjs"
rename_if_exists "tailwind.config.js" "tailwind.config.ts"
rename_if_exists "postcss.config.js" "postcss.config.mjs"

# 3. replace CommonJS exports with ESM syntax
echo "→ Converting CommonJS exports to ESM..."
find . -type f \( -name "*.mjs" -o -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's/module\.exports\s*=\s*/export default /g' {} +

# 4. nuke old build artifacts
echo "→ Cleaning build directories..."
rm -rf .next node_modules package-lock.json

# 5. reinstall and rebuild
echo "→ Reinstalling dependencies..."
npm install

echo "→ Running build..."
npm run build

# 6. verify
if [ $? -eq 0 ]; then
  echo "✅ Build successful — project now fully ESM."
else
  echo "❌ Build failed — check logs for specific modules still using CommonJS."
fi
