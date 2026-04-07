#!/usr/bin/env sh

# Keep static assets in public for Next.js static export.
mkdir -p ./public
cp ./src/assets/files/resume.pdf ./public/resume.pdf
