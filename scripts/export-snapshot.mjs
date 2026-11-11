import { readFile, writeFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

const output = process.argv[2];
if (!output?.endsWith('.html')) {
  throw new Error('Pass a new HTML filename, such as Gather_Rule_of_Thirds_v1.html.');
}

let html = await readFile('dist/index.html', 'utf8');
const script = html.match(/<script\b[^>]*src="([^"]+)"[^>]*><\/script>/);
const stylesheet = html.match(/<link\b[^>]*href="([^"]+\.css)"[^>]*>/);
if (!script || !stylesheet) throw new Error('Run the production build before exporting.');

let scriptSource = await readFile(resolve('dist', script[1].replace(/^\//, '')), 'utf8');
const imagePaths = new Set(Array.from(scriptSource.matchAll(/([\x22\x27\x60])(\/images\/[^\x22\x27\x60]+)\1/g), (match) => match[2]));
const imageTypes = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };
for (const imagePath of imagePaths) {
  const mimeType = imageTypes[extname(imagePath)];
  if (!mimeType) throw new Error(`Unsupported snapshot image type ${imagePath}`);
  const bytes = await readFile(resolve('dist', imagePath.slice(1)));
  scriptSource = scriptSource.replaceAll(imagePath, `data:${mimeType};base64,${bytes.toString('base64')}`);
}
const styles = await readFile(resolve('dist', stylesheet[1].replace(/^\//, '')), 'utf8');
html = html.replace(script[0], () => `<script type="module">${scriptSource.replace(/<\/script/gi, '<\\/script')}</script>`);
html = html.replace(stylesheet[0], () => `<style>${styles}</style>`);

await writeFile(output, html, { flag: 'wx' });
console.log(`Saved standalone snapshot to ${output}`);
