import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';

// Export the current read-only routes with their complete hydration assets.
await rm('dist', { recursive: true, force: true });
await cp('.output/public', 'dist', { recursive: true });
const server = spawn(process.execPath, ['.output/server/index.mjs'], {
  env: { ...process.env, PORT: '3467' }, stdio: ['ignore', 'pipe', 'pipe'],
});
try {
  await Promise.race([
    once(server.stdout, 'data'),
    once(server, 'exit').then(() => { throw new Error('Export server exited before startup'); }),
  ]);
  for (const route of ['/', '/hometown-economy']) {
    const response = await fetch(`http://127.0.0.1:3467${route}`);
    if (!response.ok) throw new Error(`Cannot export ${route}: ${response.status}`);
    const directory = route === '/' ? 'dist' : `dist${route}`;
    await mkdir(directory, { recursive: true });
    await writeFile(`${directory}/index.html`, await response.text());
  }
  await writeFile('dist/_redirects', '/hometown-economy /hometown-economy/index.html 200\n');
  console.log('Exported both UpSports routes and their assets.');
} finally {
  server.kill();
}
