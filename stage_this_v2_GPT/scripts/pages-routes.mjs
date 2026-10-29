import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

// Restore client-only dynamic routes after GitHub Pages' shared 404 redirect.
const base = '/BwBluePrint/stage_this_v2_GPT/';
const bootstrap = `<script>const r=new URLSearchParams(location.search).get('__route');if(r&&!r.startsWith('/')&&!r.includes('://'))history.replaceState(null,'',${JSON.stringify(base)}+r);</script>`;
const html = readFileSync('dist/index.html', 'utf8').replace('<head>', '<head>'+bootstrap);
writeFileSync('dist/index.html', html);
for (const route of ['properties', 'tasks', 'more', 'property/new', 'property/maple', 'property/oak', 'property/pine']) {
  const target = `dist/${route}/index.html`;
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html);
}
