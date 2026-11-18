# Padrão de resultado de QA

[English version](../en/standards/qa-result.md)

Quando termino de testar uma mudança, deixo um resultado curto no ticket. Em texto simples, para ler bem em qualquer lugar e ninguém precisar rolar por enfeite.

## Formato

```
Aprovado no QA

Resumo do que foi testado e do resultado, em uma ou duas frases.

Execução
- Ambiente e versão
- Contas ou dados usados
- Links para a execução ou o relatório

Resultados
- Grupo de casos e resultado
- Grupo de casos e resultado

Observações
- O que o time precisa saber, como limitações conhecidas, tickets de acompanhamento ou riscos aceitos

Evidências
1. O que mostra o primeiro anexo
2. O que mostra o segundo anexo
```

## Regras

A primeira linha diz só se foi aprovado ou reprovado, para o resultado ficar claro de relance.

Uma reprovação sempre nomeia o caso que falhou e aponta o bug, para o dev saber exatamente o que corrigir.

Uma aprovação fica curta. Evidências entram só quando existem anexos.
