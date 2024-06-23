#!/usr/bin/env sh

concurrently "next dev" "bun run generate:watch"