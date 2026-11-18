# Relatório de release (exemplo)

[English version](../en/releases/release-report-example.md)

Esta é uma release fictícia da loja, escrita do jeito que eu escrevo as reais. O objetivo do relatório é deixar produto decidir em cinco minutos, sem surpresa depois de ir para o ar.

## Release 2.6, limites de quantidade no carrinho e melhorias no checkout

**Recomendo seguir com a release (go)**, com um risco aceito listado abaixo.

## O que mudou

As quantidades no carrinho agora vão de 1 a 99 por produto. A barra de etapas do checkout foi redesenhada.

## O que foi testado

| Grupo | Resultado |
|---|---|
| Suíte de smoke (todas as linhas de smoke de todas as áreas) | Passou |
| Limites de quantidade no carrinho, incluindo 0, 1, 99 e 100 | Passou |
| Checkout do carrinho até o pagamento, logado e como cliente novo | Passou |
| Regressão de permissões (cliente contra rotas de admin) | Passou |
| Sessão exploratória no checkout, 45 minutos | 1 bug encontrado |

## Bugs

| Bug | Severidade | Status | Bloqueia a release |
|---|---|---|---|
| [Carrinho vazio mostra as etapas do checkout sem nenhuma mensagem](../bugs/checkout-carrinho-vazio-sem-mensagem.md) | Baixa | Aberto | Não |

## Riscos aceitos

O bug do checkout com carrinho vazio vai junto. Ele só afeta quem abre o endereço do checkout direto com o carrinho vazio e não tem impacto em pedidos. Aceito por produto, correção planejada para a próxima release.

## O que não foi coberto

Pagamento com meios reais (a demonstração não tem), conteúdo do PDF de nota fiscal e desempenho sob carga. Nada disso mudou nesta release.

## Depois de ir para o ar

A suíte de smoke roda em produção logo depois do deploy. Se alguma linha de smoke falhar, a release volta antes de os clientes serem avisados.
