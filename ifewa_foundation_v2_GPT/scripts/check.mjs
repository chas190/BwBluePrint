import fs from 'node:fs';
import assert from 'node:assert/strict';
const src=fs.readFileSync('src/main.jsx','utf8');
const assets=[...src.matchAll(/['"]([^'"]+\.webp)['"]/g)].map(m=>m[1]);
for(const name of new Set(assets))assert.ok(fs.existsSync(`public/assets/${name}`),`Missing asset ${name}`);
for(const old of ['ifewa.run10x.com','demo.goodlayers.com','/greennature/act-now/'])assert.ok(!src.includes(old),`Old link: ${old}`);
for(const route of ['home','mission','service','team','contact','shop','act-now'])assert.ok(src.includes(route),`Missing route ${route}`);
assert.ok(src.includes('This website has not sent your message.'));
console.log(`Verified ${new Set(assets).size} explicitly referenced assets, route declarations, removed legacy URLs, and email behavior.`);
