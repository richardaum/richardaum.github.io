#!/usr/bin/env sh

# Keep static assets in public for Next.js static export.
mkdir -p ./public
node ./scripts/resume/generate-html.mjs
node ./scripts/resume/generate-pdf.mjs
cp ./src/assets/files/resume.pdf ./public/resume.pdf
