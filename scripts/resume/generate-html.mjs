import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..', '..');

const md = readFileSync(path.join(rootDir, 'src', 'resume.md'), 'utf-8');
const lines = md.split('\n');

const CSS = `
  @page { size: A4; margin: 1cm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 10pt;
    line-height: 1.4;
    color: #111;
    background: white;
    padding: 1cm;
    width: 21cm;
  }
  h1 { font-size: 18pt; font-weight: bold; margin-bottom: 2px; }
  .subtitle { font-size: 10pt; color: #444; margin-bottom: 2px; }
  .contact { font-size: 9pt; color: #444; margin-bottom: 8px; }
  hr { border: none; border-top: 1px solid #ccc; margin: 6px 0; }
  h2 {
    font-size: 11pt;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 10px 0 4px 0;
    color: #111;
  }
  h3 { font-size: 10pt; font-weight: bold; margin: 8px 0 2px 0; }
  ul { padding-left: 14px; margin: 2px 0 4px 0; }
  li { margin-bottom: 2px; }
  p { margin-bottom: 4px; }
  .lang-list { list-style: none; padding: 0; }
  .lang-list li { display: inline; margin-right: 12px; }
`;

function escape(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inline(text) {
  return escape(text).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

const name = lines[0].replace(/^# /, '');
const subtitle = lines[2];
const contactParts = [lines[3], lines[4]]
  .filter((line) => line && line.trim())
  .join(' | ')
  .split(' | ')
  .map(escape)
  .join(' &nbsp;|&nbsp; ');

const out = [];
out.push(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escape(name)} - Resume</title>
<style>${CSS}</style>
</head>
<body>

<h1>${escape(name)}</h1>
<div class="subtitle">${escape(subtitle)}</div>
<div class="contact">${contactParts}</div>`);

let inList = false;
let inLangList = false;
let inParagraph = false;
let currentSection = '';

function closeOpenTags() {
  if (inList) {
    out.push('</ul>');
    inList = false;
  }
  if (inLangList) {
    out.push('</ul>');
    inLangList = false;
  }
  if (inParagraph) {
    out.push('</p>');
    inParagraph = false;
  }
}

for (let i = 6; i < lines.length; i += 1) {
  const line = lines[i];

  if (line.startsWith('## ')) {
    closeOpenTags();
    currentSection = line.slice(3).trim();
    out.push(`\n<hr>\n\n<h2>${escape(currentSection)}</h2>`);
  } else if (line.startsWith('### ')) {
    closeOpenTags();
    out.push(`\n<h3>${escape(line.slice(4))}</h3>`);
  } else if (line.startsWith('- ')) {
    if (inParagraph) {
      out.push('</p>');
      inParagraph = false;
    }
    if (currentSection === 'Languages') {
      if (!inLangList) {
        out.push('<ul class="lang-list">');
        inLangList = true;
      }
    } else if (!inList) {
      out.push('<ul>');
      inList = true;
    }
    out.push(`  <li>${inline(line.slice(2))}</li>`);
  } else if (line === '---') {
    closeOpenTags();
  } else if (line.trim() === '') {
    closeOpenTags();
  } else {
    if (inList || inLangList) {
      closeOpenTags();
    }
    if (!inParagraph) {
      out.push('<p>');
      inParagraph = true;
    }
    out.push(inline(line));
  }
}

closeOpenTags();
out.push('\n</body>\n</html>');

const outputPath = path.join(rootDir, 'src', 'assets', 'files', 'resume.html');
writeFileSync(outputPath, out.join('\n'));
console.log(`resume.html generated successfully: ${outputPath}`);
