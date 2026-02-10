#!/bin/bash

# Fix heroicons syntax in markdown files
# Convert from <heroicons-X:name class="..."/> to <span class="i-heroicons-X-name ..."/>

for file in *.md; do
  if [ "$file" != "README.md" ]; then
    # Replace outline icons
    sed -i '' 's|<heroicons-outline:\([^ ]*\) class="inline-block \([^"]*\)" />|<span class="i-heroicons-outline-\1 \2"/>|g' "$file"

    # Replace solid icons
    sed -i '' 's|<heroicons-solid:\([^ ]*\) class="inline-block \([^"]*\)" />|<span class="i-heroicons-solid-\1 \2"/>|g' "$file"

    echo "Updated $file"
  fi
done

echo "Icon syntax fixed!"
