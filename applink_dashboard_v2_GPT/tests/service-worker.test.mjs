import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';

const source = await readFile(new URL('../public/sw.js', import.meta.url), 'utf8');

function worker() {
  const listeners = {};
  const entries = new Map();
  const fetched = [];
  let online = true;
  const scope = 'https://applink.test/dashboard/';
  const html = '<html data-applink-shell><script type="module" src="/dashboard/assets/app-abc.js"></script><link rel="stylesheet" href="./assets/app-abc.css"><link href="https://fonts.example/font.css">';
  let documentHtml = html;
  let documentStatus = 200;
  const key = (request) => typeof request === 'string' ? request : request.url;
  const fetch = async (request) => {
    if (!online) throw new Error('Offline');
    fetched.push(key(request));
    return new Response(key(request).split('?')[0] === scope ? documentHtml : 'asset', { status: key(request).split('?')[0] === scope ? documentStatus : 200 });
  };
  const cache = {
    addAll: async (urls) => {
      for (const url of urls) entries.set(url, await fetch(url));
    },
    put: async (url, response) => entries.set(key(url), response.clone()),
  };
  const context = {
    URL, Response, fetch,
    caches: {
      open: async () => cache,
      match: async (request) => entries.get(key(request))?.clone(),
      keys: async () => ['applink-shell-v3'],
      delete: async () => true,
    },
    self: {
      registration: { scope },
      location: { origin: 'https://applink.test' },
      clients: { claim: async () => undefined },
      skipWaiting: async () => undefined,
      addEventListener: (name, callback) => { listeners[name] = callback; },
    },
  };
  vm.runInNewContext(source, context);
  return {
    listeners, entries, fetched, scope,
    offline: () => { online = false; },
    setDocument: (content, status = 200) => { documentHtml = content; documentStatus = status; },
  };
}

test('first install precaches built code, CSS, images and icons under the artifact base path', async () => {
  const app = worker();
  let install;
  app.listeners.install({ waitUntil: (promise) => { install = promise; } });
  await install;
  assert.ok(app.entries.has(app.scope));
  assert.ok(app.entries.has(`${app.scope}assets/app-abc.js`));
  assert.ok(app.entries.has(`${app.scope}assets/app-abc.css`));
  assert.ok(app.entries.has(`${app.scope}town-grid.webp`));
  assert.ok(app.entries.has(`${app.scope}app-icon-192.png`));
  assert.equal(app.fetched.some((url) => url.startsWith('https://fonts.example')), false);
});

test('offline navigation uses the installed shell after the first online visit', async () => {
  const app = worker();
  let install;
  app.listeners.install({ waitUntil: (promise) => { install = promise; } });
  await install;
  app.offline();
  let response;
  let background;
  app.listeners.fetch({
    request: { url: `${app.scope}?view=favorites`, method: 'GET', mode: 'navigate' },
    respondWith: (promise) => { response = promise; },
    waitUntil: (promise) => { background = promise; },
  });
  assert.match(await (await response).text(), /app-abc.js/);
  await background;
});

test('unrelated navigation cannot replace the dashboard fallback', async () => {
  const app = worker();
  let install;
  app.listeners.install({ waitUntil: (promise) => { install = promise; } });
  await install;
  let intercepted = false;
  app.listeners.fetch({
    request: { url: `${app.scope}__mockup`, method: 'GET', mode: 'navigate' },
    respondWith: () => { intercepted = true; },
  });
  assert.equal(intercepted, false);
  app.setDocument('<html><h1>Another app</h1></html>');
  let background;
  app.listeners.fetch({
    request: { url: app.scope, method: 'GET', mode: 'navigate' },
    respondWith: () => undefined,
    waitUntil: (promise) => { background = promise; },
  });
  await background;
  assert.match(await app.entries.get(app.scope).clone().text(), /app-abc.js/);
});

test('HTTP failures fall back to the cached dashboard rather than replacing it', async () => {
  const app = worker();
  let install;
  app.listeners.install({ waitUntil: (promise) => { install = promise; } });
  await install;
  app.setDocument('Server error', 503);
  let response;
  let background;
  app.listeners.fetch({
    request: { url: app.scope, method: 'GET', mode: 'navigate' },
    respondWith: (promise) => { response = promise; },
    waitUntil: (promise) => { background = promise; },
  });
  assert.match(await (await response).text(), /app-abc.js/);
  await background;
});

test('API, external and out-of-scope requests are not treated as cached app data', () => {
  const app = worker();
  for (const url of [
    `${app.scope}api/dashboard`,
    'https://applink.test/another-app/image.png',
    'https://external.test/image.png',
  ]) {
    let intercepted = false;
    app.listeners.fetch({
      request: { url, method: 'GET', mode: 'cors', destination: 'image' },
      respondWith: () => { intercepted = true; },
    });
    assert.equal(intercepted, false, url);
  }
});