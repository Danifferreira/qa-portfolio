import { test } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createPanelServer } from './server.mjs';

const FLOWS = [
  { id: 'login-ui', name: 'Login pela tela', description: 'Cliente entra na conta', file: 'tests/e2e/auth.spec.ts', project: 'e2e', title: 'x' },
  { id: 'cart-api', name: 'Carrinho pela API', description: 'Cria carrinho e adiciona produto', file: 'tests/api/cart.spec.ts', project: 'api', title: 'y' },
];

async function start(runFlow) {
  const server = createPanelServer({ flows: FLOWS, runFlow });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`;
  return { server, base };
}

test('lists flows without exposing how they run', async () => {
  const { server, base } = await start(async () => ({ status: 'passed', durationMs: 1 }));
  try {
    const flows = await (await fetch(`${base}/api/flows`)).json();
    assert.deepEqual(flows, [
      { id: 'login-ui', name: 'Login pela tela', description: 'Cliente entra na conta' },
      { id: 'cart-api', name: 'Carrinho pela API', description: 'Cria carrinho e adiciona produto' },
    ]);
  } finally {
    server.close();
  }
});

test('unknown flow returns 404 and runs nothing', async () => {
  let calls = 0;
  const { server, base } = await start(async () => {
    calls++;
    return { status: 'passed', durationMs: 1 };
  });
  try {
    const response = await fetch(`${base}/api/run/rm -rf`, { method: 'POST' });
    assert.equal(response.status, 404);
    assert.equal(calls, 0);
  } finally {
    server.close();
  }
});

test('returns the run result of a known flow', async () => {
  const { server, base } = await start(async (flow) => ({ status: 'failed', durationMs: 42, error: `broke ${flow.id}` }));
  try {
    const response = await fetch(`${base}/api/run/cart-api`, { method: 'POST' });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: 'failed', durationMs: 42, error: 'broke cart-api' });
  } finally {
    server.close();
  }
});

test('a second run while one is in progress returns 409', async () => {
  let release;
  const { server, base } = await start(() => new Promise((resolve) => { release = () => resolve({ status: 'passed', durationMs: 5 }); }));
  try {
    const first = fetch(`${base}/api/run/login-ui`, { method: 'POST' });
    await new Promise((resolve) => setTimeout(resolve, 50));
    const second = await fetch(`${base}/api/run/cart-api`, { method: 'POST' });
    assert.equal(second.status, 409);
    release();
    assert.equal((await first).status, 200);
  } finally {
    server.close();
  }
});

test('screenshots outside test-results are refused', async () => {
  const { server, base } = await start(async () => ({ status: 'passed', durationMs: 1 }));
  try {
    const response = await fetch(`${base}/screenshots?path=${encodeURIComponent('C:/Windows/win.ini')}`);
    assert.equal(response.status, 400);
  } finally {
    server.close();
  }
});

test('the home page is served', async () => {
  const { server, base } = await start(async () => ({ status: 'passed', durationMs: 1 }));
  try {
    const response = await fetch(`${base}/`);
    assert.equal(response.status, 200);
    assert.match(await response.text(), /Painel de testes/);
  } finally {
    server.close();
  }
});
