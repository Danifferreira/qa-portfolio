const NO_RESULTS = { status: 'error', durationMs: 0, error: 'No results returned by the test run' };

function stripColors(text) {
  return text.replace(/\u001b\[[0-9;]*m/g, '');
}

function collectResults(suites, found = []) {
  for (const suite of suites ?? []) {
    for (const spec of suite.specs ?? []) {
      for (const test of spec.tests ?? []) {
        // The last result is the final attempt when retries happen.
        const last = (test.results ?? []).at(-1);
        if (last) found.push(last);
      }
    }
    collectResults(suite.suites, found);
  }
  return found;
}

export function parseResults(json) {
  const results = collectResults(json?.suites);
  if (results.length === 0) return NO_RESULTS;

  const durationMs = results.reduce((total, result) => total + (result.duration ?? 0), 0);
  const failed = results.find((result) => result.status !== 'passed' && result.status !== 'skipped');
  if (!failed) return { status: 'passed', durationMs };

  const parsed = { status: 'failed', durationMs };
  const message = failed.errors?.[0]?.message ?? failed.error?.message;
  if (message) parsed.error = stripColors(message).split('\n')[0].trim();
  const screenshot = failed.attachments?.find((attachment) => attachment.contentType === 'image/png' && attachment.path);
  if (screenshot) parsed.screenshot = screenshot.path;
  return parsed;
}
