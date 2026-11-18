import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

function readStats(resultsPath) {
  if (!resultsPath || !existsSync(resultsPath)) return null;
  try {
    return JSON.parse(readFileSync(resultsPath, 'utf8')).stats ?? null;
  } catch {
    return null;
  }
}

function summary(status, stats) {
  if (status === 'down') {
    return '<p class="down">Environment unavailable. The demo site did not respond, so the suite did not run today.</p>';
  }
  if (!stats) return '<p class="warn">No results found for this run.</p>';

  const failed = stats.unexpected ?? 0;
  const line = `${stats.expected ?? 0} passed · ${failed} failed · ${stats.flaky ?? 0} flaky · ${stats.skipped ?? 0} skipped`;
  return `<p class="${failed > 0 ? 'fail' : 'pass'}">${line}</p>
<p><a href="report/index.html">Open the full Playwright report</a></p>`;
}

export function buildSite({ status, resultsPath, outDir, runDate }) {
  mkdirSync(outDir, { recursive: true });
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>QA Portfolio — Daily run</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 640px; margin: 48px auto; padding: 0 16px; color: #1f2328; }
  .pass { color: #1a7f37; } .fail { color: #cf222e; } .down, .warn { color: #9a6700; }
  a { color: #0969da; }
</style>
</head>
<body>
<h1>QA Portfolio — Daily run</h1>
<p>Run date: ${runDate}</p>
${summary(status, readStats(resultsPath))}
<p><a href="https://github.com/Danifferreira/qa-portfolio">Back to the repository</a></p>
</body>
</html>
`;
  writeFileSync(join(outDir, 'index.html'), html);
}

function arg(name) {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? undefined : process.argv[index + 1];
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildSite({
    status: arg('status') === 'down' ? 'down' : 'up',
    resultsPath: arg('results'),
    outDir: arg('out') ?? 'site',
    runDate: new Date().toISOString().slice(0, 10),
  });
}
