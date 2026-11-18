# QA Portfolio — Danielle Ferreira

> **Resumo em português.** Este repositório mostra como eu estruturo o QA de um produto do zero, usando uma loja de demonstração pública como se fosse o produto do meu time. Aqui estão os padrões, a estratégia de testes, o mapa de riscos, a documentação por área, um relatório de release, bugs reais que encontrei e uma suíte de testes automatizados que roda todos os dias.

I am a Senior QA Engineer with more than 6 years in software quality. What I enjoy most is organizing quality for a product and leaving a process the team can follow without depending on me. [LinkedIn](https://www.linkedin.com/in/danielle-ferreira-qa)

## What this repository shows

I took [Practice Software Testing](https://practicesoftwaretesting.com), a public demo tool shop, and treated it as the product of my team. This is the QA base I would build for it in the first weeks.

| Where | What you will find |
|---|---|
| [How this is organized](docs/en/how-this-is-organized.md) | The convention behind everything else. Start here |
| [Standards](docs/en/standards/) | How bugs, BDD test cases and QA results are written |
| [Test strategy](docs/en/strategy/test-strategy.md) | Scope, test levels, what I automate and what I do not, and how a release decision is made |
| [Risk map](docs/en/strategy/risk-map.md) | Where testing effort goes and why |
| [Areas](docs/en/areas/) | One doc per product area with rules, risks, BDD cases and a What to validate table linked to the tests |
| [Release report](docs/en/releases/release-report-example.md) | A go/no-go report in the format I use |
| [Bugs](docs/en/bugs/) | Real defects I found while exploring the shop |
| [Tests](tests/) | Playwright + TypeScript. API checks for auth, catalog, cart and permissions, plus a small UI smoke |

## Daily run

The suite runs every morning on GitHub Actions. Before it starts, a health check confirms the demo site is up. If it is not, the run is reported as "Environment unavailable" instead of failing.

**[See today's status and full report](https://danifferreira.github.io/qa-portfolio/)**

## Run it locally

```bash
npm ci
npx playwright install chromium
npm test
```

Every test creates its own customer, so runs never depend on data other visitors can change.

## Coming next

An AI-assisted QA section, with a skill that turns a user story into BDD cases and a guide on testing AI and MCP features. After that, a test panel where anyone on the team can run a business flow on demand and see the result, without waiting for a QA to be free.

---

Structured and reviewed by me, with AI assistance from Claude Code.
