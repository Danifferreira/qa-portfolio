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

function pt(text) {
  return `<p lang="pt-BR" class="pt">${text}</p>`;
}

function summary(status, stats) {
  if (status === 'down') {
    return `<p class="down">Environment unavailable. The demo site did not respond, so the suite did not run today.</p>
${pt('Ambiente indisponível. O site de demonstração não respondeu, então a suíte não rodou hoje.')}`;
  }
  if (status === 'incomplete') {
    return `<p class="warn">Run did not complete because of a problem in the pipeline itself, not in the demo site. See the run in GitHub Actions.</p>
${pt('A execução não terminou por um problema na própria rotina, e não no site de demonstração. Veja a execução no GitHub Actions.')}`;
  }
  if (!stats) {
    return `<p class="warn">No results found for this run.</p>
${pt('Nenhum resultado encontrado para esta execução.')}`;
  }

  const failed = stats.unexpected ?? 0;
  const passed = stats.expected ?? 0;
  const flaky = stats.flaky ?? 0;
  const skipped = stats.skipped ?? 0;
  return `<p class="${failed > 0 ? 'fail' : 'pass'}">${passed} passed · ${failed} failed · ${flaky} flaky · ${skipped} skipped</p>
${pt(`${passed} passaram · ${failed} falharam · ${flaky} instáveis · ${skipped} pulados`)}
<p><a href="report/index.html">Open the full Playwright report</a> · <span lang="pt-BR">Abrir o relatório completo</span></p>`;
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
  .pt { color: #59636e; margin-top: -8px; }
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
    status: ['down', 'incomplete'].includes(arg('status')) ? arg('status') : 'up',
    resultsPath: arg('results'),
    outDir: arg('out') ?? 'site',
    runDate: new Date().toISOString().slice(0, 10),
  });
}
