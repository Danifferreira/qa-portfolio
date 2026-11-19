import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildArgs, runCommand } from './run-flow.mjs';

test('builds Playwright arguments from a flow, matching the exact title', () => {
  const args = buildArgs({ file: 'tests/api/cart.spec.ts', project: 'api', title: '@smoke visitor can (add) a product' });
  assert.ok(args.includes('tests/api/cart.spec.ts'));
  assert.deepEqual(args.slice(args.indexOf('--project'), args.indexOf('--project') + 2), ['--project', 'api']);
  assert.ok(args.includes('--reporter=json'));
  const grep = args[args.indexOf('-g') + 1];
  assert.ok(new RegExp(grep).test('Cart API @smoke visitor can (add) a product'));
  assert.ok(!new RegExp(grep).test('@smoke visitor can add a product'));
});

test('parses JSON printed by the command', async () => {
  const json = JSON.stringify({ suites: [{ specs: [{ tests: [{ results: [{ status: 'passed', duration: 10, errors: [], attachments: [] }] }] }] }] });
  const result = await runCommand({ command: process.execPath, args: ['-e', `console.log(${JSON.stringify(json)})`], timeoutMs: 5_000 });
  assert.deepEqual(result, { status: 'passed', durationMs: 10 });
});

test('a command that runs too long is stopped and reported', async () => {
  const result = await runCommand({ command: process.execPath, args: ['-e', 'setTimeout(() => {}, 10000)'], timeoutMs: 300 });
  assert.equal(result.status, 'error');
  assert.match(result.error, /Tempo esgotado/);
});

test('output that is not JSON is reported as an error', async () => {
  const result = await runCommand({ command: process.execPath, args: ['-e', 'console.log("not json")'], timeoutMs: 5_000 });
  assert.equal(result.status, 'error');
});
