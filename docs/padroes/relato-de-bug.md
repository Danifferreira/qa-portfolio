# Padrão de relato de bug

[English version](../en/standards/bug-report.md)

Um bug por relato. O relato precisa permitir que o dev reproduza o problema sem me perguntar nada.

## Título

`[Área] o que está errado + onde`

Exemplo: `[Checkout] carrinho vazio mostra as etapas do checkout sem nenhuma mensagem`

## Seções

| Seção | O que entra |
|---|---|
| Resumo | Uma ou duas frases com o problema e o impacto |
| Ambiente | URL, navegador ou cliente, versão mostrada no app, data |
| Pré-condições | Estado necessário antes dos passos (logado ou não, itens no carrinho) |
| Passos para reproduzir | Numerados, uma ação por passo |
| Resultado atual | O que acontece, com mensagens e códigos de status exatos |
| Resultado esperado | O que deveria acontecer, com base numa regra ou numa expectativa razoável de quem usa |
| Severidade | Crítica, Alta, Média ou Baixa (abaixo) |
| Evidência | Print, vídeo ou corpo da resposta, quando houver |
| Sugestão | Opcional. Deixo claro que é sugestão e não decisão, porque produto pode preferir outra solução |

## Severidade

| Severidade | Quando |
|---|---|
| Crítica | Perda de dados, cobrança errada, exposição de segurança ou privacidade, fluxo principal travado para todos |
| Alta | Fluxo principal travado para parte das pessoas, ou dado errado mostrado ao usuário |
| Média | A funcionalidade funciona com contorno, ou um contrato de API está quebrado |
| Baixa | Comportamento visual ou confuso, sem impacto em dados ou dinheiro |

## O que deixo de fora

Não arrisco a causa no relato. Encontrar a causa é trabalho do dev, e um palpite errado manda todo mundo na direção errada.

Antes de abrir um bug, procuro nos relatos existentes, inclusive nos fechados, para não criar duplicado.
