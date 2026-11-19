# Estratégia de testes

[English version](../en/strategy/test-strategy.md)

É assim que eu conduziria o QA da loja se ela fosse o produto do meu time. O objetivo é simples. Nenhuma release quebra a compra, e nenhum cliente vê ou altera o que não é dele.

## Escopo

Entram os fluxos do cliente (cadastro, login, navegação, busca, carrinho, checkout), a API pública que sustenta esses fluxos e a fronteira de permissão entre cliente e admin.

Ficam de fora, por enquanto, as telas de administração, os PDFs de nota fiscal, os meios de pagamento (a demonstração não tem nenhum real), testes de carga e auditorias de acessibilidade. Cada um ganharia um plano próprio se o produto dependesse dele.

## Onde vai o esforço

Quem decide é o [mapa de riscos](mapa-de-riscos.md). As áreas de prioridade alta recebem casos BDD, automação e linhas de smoke. As de prioridade menor recebem sessões exploratórias e linhas de regressão.

## Níveis de teste

| Nível | O que cobre aqui | Por quê |
|---|---|---|
| API | Login, contrato do catálogo, regras do carrinho, permissões | Rápido e estável. A maior parte das regras de negócio e todas as checagens de permissão vivem na API, então é onde coloco a maior parte da automação |
| Tela, ponta a ponta | Login, busca, adicionar ao carrinho | Prova que o caminho principal funciona para uma pessoa real num navegador real. Fica enxuto porque teste de tela é mais lento e mais frágil |
| Exploratório | Funcionalidades novas, casos de borda, tudo que mudou | Encontra o que ninguém escreveu em caso. Toda sessão termina com anotações, e bugs reais viram linhas nas tabelas das áreas |
| Regressão manual | Linhas marcadas como "manual" nas tabelas das áreas | O que é caro de automatizar ou muda demais para compensar |

## O que automatizo e o que não

Automatizo checagens que rodam com frequência, são estáveis e protegem dinheiro, dados ou acesso. Login, carrinho e permissões se encaixam.

Não automatizo fluxos que mudam a cada sprint, detalhes visuais ou qualquer coisa que dependa de julgamento humano. Esses ficam como linhas manuais ou exploratórias, e reviso essa decisão a cada trimestre.

Uma suíte pequena em que eu confio vale mais que uma grande que o time aprende a ignorar. Os testes que precisam de uma conta cadastram um cliente novo a cada execução. Os que precisam de um produto escolhem um do catálogo real na hora, nunca por nome ou preço fixo. Assim, um resultado vermelho sempre significa alguma coisa.

## Ambientes

Os testes rodam contra a demonstração pública. Antes de cada execução diária, uma checagem confirma se o site está no ar. Se não estiver, a execução aparece como "Environment unavailable" em vez de falha, porque ambiente fora do ar não é produto quebrado.

A execução diária no GitHub roda os testes de API. Os testes de tela rodam localmente, porque a loja protege algumas páginas com a verificação anti-robô do Cloudflare quando o acesso vem de servidores, e contornar essa proteção não é uma opção. O próximo passo é a rotina subir uma cópia própria da loja e rodar tudo nela.

## Critérios de entrada e saída

Uma mudança entra em QA quando tem critérios de aceite, está publicada num ambiente de teste e o dev registrou o que ela tem de arriscado.

Uma release sai de QA quando todas as linhas de smoke passam, não há bug Crítico ou Alto aberto e todo risco aceito está escrito no [relatório de release](../releases/relatorio-de-release-exemplo.md), com quem aceitou.

## Como sai a decisão de release

Escrevo o relatório de release com o que foi testado, o que não foi, os bugs abertos e os riscos. O go ou no-go é uma recomendação com motivos. A decisão final é dividida com produto, e quando a release sai com um risco conhecido, o relatório diz isso com todas as letras.
