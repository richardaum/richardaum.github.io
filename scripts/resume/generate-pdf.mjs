import puppeteer from 'puppeteer-core';
import { createHash } from 'crypto';
import { fileURLToPath } from 'url';
import path from 'path';
import { existsSync } from 'fs';
import fs from 'fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..', '..');

const DEFAULT_INPUT_HTML = path.join(rootDir, 'src', 'assets', 'files', 'resume.html');
const DEFAULT_OUTPUT_PDF = path.join(rootDir, 'src', 'assets', 'files', 'resume.pdf');

function printUsage() {
  console.log(
    'Usage:\n' +
      '  node scripts/resume/generate-pdf.mjs [inputHtmlPath] [outputPdfPath]\n' +
      '  node scripts/resume/generate-pdf.mjs --html <inputHtmlPath> --output <outputPdfPath>\n' +
      '  node scripts/resume/generate-pdf.mjs --text "Some text" --output <outputPdfPath>\n' +
      '  node scripts/resume/generate-pdf.mjs --text-file <inputTextPath> --output <outputPdfPath>\n' +
      '  echo "Some text" | node scripts/resume/generate-pdf.mjs --stdin --output <outputPdfPath>\n' +
      '  node scripts/resume/generate-pdf.mjs --force  (always regenerate, ignore SHA cache)\n',
  );
}

function sha256Hex(content) {
  return createHash('sha256').update(content, 'utf8').digest('hex');
}

function sourceHashSidecarPath(pdfPath) {
  return `${pdfPath}.source.sha256`;
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function textToHtmlDocument(text) {
  const paragraphs = text
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replaceAll('\n', '<br />')}</p>`)
    .join('\n');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        font-family: "Times New Roman", Times, serif;
        font-size: 12pt;
        line-height: 1.5;
        color: #111;
        margin: 0;
        background: #fff;
      }
      .page {
        width: 210mm;
        min-height: 297mm;
        padding: 25mm 20mm;
        box-sizing: border-box;
      }
      p {
        margin: 0 0 14pt 0;
      }
      p:last-child {
        margin-bottom: 0;
      }
    </style>
  </head>
  <body>
    <main class="page">
      ${paragraphs || '<p></p>'}
    </main>
  </body>
</html>`;
}

function resolvePathFromCwd(inputPath) {
  return path.resolve(process.cwd(), inputPath);
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf-8');
}

const args = process.argv.slice(2);
let inputHtmlPath = null;
let outputPdfPath = DEFAULT_OUTPUT_PDF;
let textInput = null;
let useStdin = false;
let forceRegenerate = false;
const positional = [];

for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];
  if (arg === '--help' || arg === '-h') {
    printUsage();
    process.exit(0);
  }
  if (arg === '--html') {
    inputHtmlPath = resolvePathFromCwd(args[i + 1] || '');
    i += 1;
    continue;
  }
  if (arg === '--output' || arg === '-o') {
    outputPdfPath = resolvePathFromCwd(args[i + 1] || '');
    i += 1;
    continue;
  }
  if (arg === '--text') {
    textInput = args[i + 1] ?? '';
    i += 1;
    continue;
  }
  if (arg === '--text-file') {
    const textFilePath = resolvePathFromCwd(args[i + 1] || '');
    i += 1;
    if (!existsSync(textFilePath)) {
      console.error(`Input text file not found: ${textFilePath}`);
      process.exit(1);
    }
    textInput = await fs.readFile(textFilePath, 'utf-8');
    continue;
  }
  if (arg === '--stdin') {
    useStdin = true;
    continue;
  }
  if (arg === '--force') {
    forceRegenerate = true;
    continue;
  }
  positional.push(arg);
}

if (!inputHtmlPath && textInput == null && !useStdin && positional.length > 0) {
  inputHtmlPath = resolvePathFromCwd(positional[0]);
}
if (positional.length > 1) {
  outputPdfPath = resolvePathFromCwd(positional[1]);
}
if (!inputHtmlPath && textInput == null && !useStdin) {
  inputHtmlPath = DEFAULT_INPUT_HTML;
}

let pageContentHtml = null;
if (useStdin) {
  textInput = await readStdin();
}
if (textInput != null) {
  pageContentHtml = textToHtmlDocument(textInput.trim());
}

if (!pageContentHtml && !inputHtmlPath) {
  console.error('No input provided.');
  printUsage();
  process.exit(1);
}
if (inputHtmlPath && !existsSync(inputHtmlPath)) {
  console.error(`Input HTML not found: ${inputHtmlPath}`);
  printUsage();
  process.exit(1);
}

let sourceForHash = pageContentHtml;
if (!sourceForHash && inputHtmlPath) {
  sourceForHash = await fs.readFile(inputHtmlPath, 'utf-8');
}
const contentDigest = sha256Hex(sourceForHash);
const sidecarPath = sourceHashSidecarPath(outputPdfPath);

if (!forceRegenerate && existsSync(outputPdfPath)) {
  try {
    const previous = (await fs.readFile(sidecarPath, 'utf8')).trim();
    if (previous === contentDigest) {
      console.log(`PDF up to date (SHA-256 of input unchanged), skipping: ${outputPdfPath}`);
      process.exit(0);
    }
  } catch {
    // Missing or unreadable sidecar — regenerate
  }
}

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
if (pageContentHtml) {
  await page.setContent(pageContentHtml, { waitUntil: 'networkidle0' });
} else {
  await page.goto(`file://${inputHtmlPath}`, { waitUntil: 'networkidle0' });
}

await page.pdf({
  path: outputPdfPath,
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: false,
  margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
});

await browser.close();

await fs.writeFile(sidecarPath, `${contentDigest}\n`, 'utf8');
console.log(`PDF generated successfully: ${outputPdfPath}`);
