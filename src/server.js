import { createServer } from '@hattip/adapter-node';
import { createNomen } from 'nomen-js';
import { preact } from 'nomen-js/preact';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { readFileSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const nomen = createNomen({
  root: __dirname,
  routes: {
    '/': () => import('./pages/index.js'),
    '/devices': () => import('./pages/devices.js'),
    '/submit': () => import('./pages/submit-rom.js'),
  },
  template: {
    entry: readFileSync(join(__dirname, 'index.html'), 'utf8'),
  },
  client: {
    esbuildOptions: {
      external: ['knex', 'preact'],
    },
  },
  modules: [preact],
});

await nomen.boot();

const PORT = process.env.PORT || 3000;

createServer(nomen.handler).listen(PORT, 'localhost', () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
