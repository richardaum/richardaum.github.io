#!/usr/bin/env sh

# Generate build info before building
./scripts/generate-build-info.sh

next build && bunx next-export-optimize-images