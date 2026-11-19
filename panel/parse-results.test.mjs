import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseResults } from './parse-results.mjs';

function report(results) {
  return { suites: [{ specs: [{ tests: [{ results }] }] }] };
}

test('all passing results report passed with the summed duration', () => {
  const parsed = parseResults(report([{ status: 'passed', duration: 1200, errors: [], attachments: [] }]));
  assert.deepEqual(parsed, { status: 'passed', durationMs: 1200 });
});

test('a failed result reports the first error without color codes and the screenshot', () => {
  const parsed = parseResults(
    report([
      {
        status: 'failed',
        duration: 800,
        errors: [{ message: '\u001b[31mExpected 1\u001b[39m but got 0' }],
        attachments: [{ name: 'screenshot', contentType: 'image/png', path: 'C:/repo/test-results/x/test-failed-1.png' }],
      },
    ]),
  );
  assert.equal(parsed.status, 'failed');
  assert.equal(parsed.durationMs, 800);
  assert.equal(parsed.error, 'Expected 1 but got 0');
  assert.equal(parsed.screenshot, 'C:/repo/test-results/x/test-failed-1.png');
});

test('nested suites are read too', () => {
  const nested = { suites: [{ suites: [report([{ status: 'passed', duration: 300, errors: [], attachments: [] }]).suites[0]] }] };
  assert.equal(parseResults(nested).status, 'passed');
});

test('missing or empty output reports an error', () => {
  assert.deepEqual(parseResults(null), { status: 'error', durationMs: 0, error: 'No results returned by the test run' });
  assert.deepEqual(parseResults({ suites: [] }), { status: 'error', durationMs: 0, error: 'No results returned by the test run' });
});
