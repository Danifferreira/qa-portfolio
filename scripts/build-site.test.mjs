import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildSite } from './build-site.mjs';

function render(options) {
  const outDir = mkdtempSync(join(tmpdir(), 'site-'));
  buildSite({ runDate: '2026-11-18', outDir, ...options });
  return readFileSync(join(outDir, 'index.html'), 'utf8');
}

test('down status shows environment unavailable and no report link', () => {
  const html = render({ status: 'down' });
  assert.match(html, /Environment unavailable/);
  assert.doesNotMatch(html, /report\/index\.html/);
});

test('the page also speaks Portuguese', () => {
  const html = render({ status: 'down' });
  assert.match(html, /Ambiente indisponível/);
  assert.match(html, /lang="pt-BR"/);
});

test('up status shows totals and the report link', () => {
  const dir = mkdtempSync(join(tmpdir(), 'results-'));
  const resultsPath = join(dir, 'results.json');
  writeFileSync(resultsPath, JSON.stringify({ stats: { expected: 10, unexpected: 1, flaky: 0, skipped: 0 } }));

  const html = render({ status: 'up', resultsPath });
  assert.match(html, /10 passed/);
  assert.match(html, /1 failed/);
  assert.match(html, /report\/index\.html/);
});

test('incomplete status says the run did not finish and does not blame the site', () => {
  const html = render({ status: 'incomplete' });
  assert.match(html, /Run did not complete/);
  assert.doesNotMatch(html, /Environment unavailable/);
});

test('up status with a missing results file says no results found', () => {
  const html = render({ status: 'up', resultsPath: join(tmpdir(), 'does-not-exist.json') });
  assert.match(html, /No results found/);
});
