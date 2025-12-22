#!/bin/bash
# Script to publish embed packages to npm
set -e

for pkg in packages/embeds/embed-core packages/embeds/embed-snippet packages/embeds/embed-react; do
  echo "Publishing $pkg..."
  (cd "$pkg" && bun publish --access=public)
done

echo "All embed packages published successfully!"
