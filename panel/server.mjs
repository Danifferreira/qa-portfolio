import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(here, '..');
const RESULTS_DIR = resolve(REPO_ROOT, 'test-results');
const PORT = 4321;

function send(response, status, body, type = 'application/json; charset=utf-8') {
  response.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  response.end(type.startsWith('application/json') ? JSON.stringify(body) : body);
}

export function createPanelServer({ flows, runFlow }) {
  let busy = false;
  const page = readFileSync(join(here, 'public', 'index.html'), 'utf8');

  return createServer(async (request, response) => {
    const url = new URL(request.url, 'http://localhost');

    if (request.method === 'GET' && url.pathname === '/') {
      return send(response, 200, page, 'text/html; charset=utf-8');
    }

    if (request.method === 'GET' && url.pathname === '/api/flows') {
      return send(response, 200, flows.map(({ id, name, description }) => ({ id, name, description })));
    }

    if (request.method === 'POST' && url.pathname.startsWith('/api/run/')) {
      const id = decodeURIComponent(url.pathname.slice('/api/run/'.length));
      const flow = flows.find((candidate) => candidate.id === id);
      if (!flow) return send(response, 404, { error: 'Fluxo não encontrado' });
      if (busy) return send(response, 409, { error: 'Já existe um fluxo rodando. Espere ele terminar.' });

      busy = true;
      try {
        return send(response, 200, await runFlow(flow));
      } catch (error) {
        return send(response, 200, { status: 'error', durationMs: 0, error: String(error?.message ?? error) });
      } finally {
        busy = false;
      }
    }

    if (request.method === 'GET' && url.pathname === '/screenshots') {
      const requested = resolve(url.searchParams.get('path') ?? '');
      if (!requested.startsWith(RESULTS_DIR + sep) || !requested.endsWith('.png') || !existsSync(requested)) {
        return send(response, 400, { error: 'Print inválido' });
      }
      response.writeHead(200, { 'Content-Type': 'image/png', 'Cache-Control': 'no-store' });
      return response.end(readFileSync(requested));
    }

    return send(response, 404, { error: 'Não encontrado' });
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { runFlow } = await import('./run-flow.mjs');
  const flows = JSON.parse(readFileSync(join(here, 'flows.json'), 'utf8'));
  createPanelServer({ flows, runFlow }).listen(PORT, '127.0.0.1', () => {
    console.log(`Painel de testes rodando em http://localhost:${PORT}`);
  });
}
