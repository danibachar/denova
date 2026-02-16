#!/usr/bin/env bash
# Migrate existing images to Git LFS
# Run from repo root after installing: brew install git-lfs

set -e

if ! command -v git-lfs &>/dev/null; then
  echo "Git LFS is not installed. Install with: brew install git-lfs"
  exit 1
fi

echo "Installing Git LFS hooks..."
git lfs install

# Option: rewrite history (clean migration, requires force-push)
# Use this for a full cleanup of existing image blobs in history
if [[ "${1:-}" == "--rewrite-history" ]]; then
  echo "Migrating existing images to LFS (rewriting history)..."
  git lfs migrate import --include="*.jpg,*.jpeg,*.png,*.gif,*.webp,*.svg" --everything
  echo "Done. History was rewritten. Force-push if needed: git push --force-with-lease"
else
  # Option: convert current files only (no history rewrite)
  # Simpler; old commits keep full blobs, new commits use LFS
  echo "Converting tracked images to LFS (current state only)..."
  git add --renormalize .
  echo "Done. Stage and commit the changes. No history rewrite."
fi
