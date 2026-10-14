import { readFile, mkdir, copyFile } from 'node:fs/promises';
const source = await readFile('src/App.tsx', 'utf8');
const routes = [...source.matchAll(/<Route path="([^"]+)"/g)].map(match => match[1]).filter(route => route !== '/' && !route.includes(':') && !route.includes('*'));
for (const route of routes) {
  await mkdir('dist' + route, { recursive: true });
  await copyFile('dist/index.html', 'dist' + route + '/index.html');
}
console.log('Prepared ' + routes.length + ' routes for GitHub Pages');

