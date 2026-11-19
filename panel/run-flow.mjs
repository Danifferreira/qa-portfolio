import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseResults } from './parse-results.mjs';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PLAYWRIGHT_CLI = resolve(REPO_ROOT, 'node_modules', '@playwright', 'test', 'cli.js');
const TIMEOUT_MS = 120_000;

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function buildArgs(flow) {
  return [PLAYWRIGHT_CLI, 'test', flow.file, '--project', flow.project, '-g', `${escapeRegExp(flow.title)}$`, '--reporter=json', '--workers=1'];
}

export function runCommand({ command, args, timeoutMs }) {
  return new Promise((resolvePromise) => {
    const child = spawn(command, args, { cwd: REPO_ROOT, shell: false, windowsHide: true });
    let stdout = '';
    let finished = false;

    const finish = (result) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      resolvePromise(result);
    };

    const timer = setTimeout(() => {
      child.kill();
      finish({ status: 'error', durationMs: timeoutMs, error: `Tempo esgotado depois de ${Math.round(timeoutMs / 1000)} s` });
    }, timeoutMs);

    child.stdout.on('data', (chunk) => (stdout += chunk));
    child.on('error', (error) => finish({ status: 'error', durationMs: 0, error: `Não consegui iniciar os testes: ${error.message}` }));
    child.on('close', () => {
      let json = null;
      try {
        json = JSON.parse(stdout);
      } catch {
        json = null;
      }
      finish(parseResults(json));
    });
  });
}

export function runFlow(flow) {
  return runCommand({ command: process.execPath, args: buildArgs(flow), timeoutMs: TIMEOUT_MS });
}
