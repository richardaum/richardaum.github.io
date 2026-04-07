#!/usr/bin/env sh

# Generate build info for local development
./scripts/generate-build-info.sh

concurrently "next dev" "bun run generate:watch"