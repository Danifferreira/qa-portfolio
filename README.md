# Portfólio de QA — Danielle Ferreira

[English version](README.en.md)

Sou QA Sênior, com mais de 6 anos em qualidade de software. O que mais gosto é de organizar a qualidade de um produto e deixar um processo que o time consegue seguir sem depender de mim. [LinkedIn](https://www.linkedin.com/in/danielle-ferreira-qa)

## O que este repositório mostra

Peguei o [Practice Software Testing](https://practicesoftwaretesting.com), uma loja de ferramentas pública feita para treinar QA, e tratei como se fosse o produto do meu time. Esta é a base de QA que eu montaria nas primeiras semanas.

| Onde | O que você encontra |
|---|---|
| [Como esta base é organizada](docs/como-esta-base-e-organizada.md) | A convenção por trás de tudo. Comece por aqui |
| [Padrões](docs/padroes/) | Como escrevo bugs, casos de teste em BDD e resultados de QA |
| [Estratégia de testes](docs/estrategia/estrategia-de-testes.md) | Escopo, níveis de teste, o que automatizo e o que não, e como sai a decisão de release |
| [Mapa de riscos](docs/estrategia/mapa-de-riscos.md) | Onde vai o esforço de teste e por quê |
| [Áreas](docs/areas/) | Um documento por área do produto, com regras, riscos, casos BDD e a tabela "O que validar" ligada aos testes |
| [Relatório de release](docs/releases/relatorio-de-release-exemplo.md) | Um relatório de go/no-go no formato que eu uso |
| [Bugs](docs/bugs/) | Defeitos reais que encontrei explorando a loja |
| [Testes](tests/) | Playwright + TypeScript. Testes de API de login, catálogo, carrinho e permissões, mais um smoke de tela enxuto |

## Execução diária

Os testes de API rodam toda manhã no GitHub Actions. Antes de começar, uma checagem confirma se o site de demonstração está no ar. Se não estiver, a execução aparece como "Environment unavailable" em vez de falha.

Os testes de tela rodam localmente. A loja de demonstração protege algumas páginas com a verificação anti-robô do Cloudflare quando o acesso vem de servidores como os do GitHub, e eu não contorno esse tipo de proteção. O próximo passo é a rotina subir uma cópia própria da loja e testar tudo nela.

**[Ver o status de hoje e o relatório completo](https://danifferreira.github.io/qa-portfolio/)**

O GitHub pausa rotinas agendadas em repositórios sem atividade por 60 dias. A página mostra a data da última execução, então fica claro quando isso acontecer.

## Rodar localmente

```bash
npm ci
npx playwright install chromium
npm test
```

Os testes que precisam de uma conta cadastram um cliente novo a cada execução. Os que precisam de um produto escolhem um do catálogo real na hora, nunca por nome ou preço fixo.

## Próximos passos

Uma seção de QA com apoio de IA, com uma skill que transforma uma história de usuário em casos BDD e um guia de como testar funcionalidades com IA e MCP. Depois, um painel em que qualquer pessoa do time roda um fluxo de negócio sob demanda e vê o resultado, sem esperar um QA livre.

---

Estruturado e revisado por mim, com apoio de IA (Claude Code).
