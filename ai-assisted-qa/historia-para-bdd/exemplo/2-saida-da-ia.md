# Saída gerada pela IA

[English version](2-ai-output.en.md)

Esta é a saída da skill para a [história do cupom](1-historia.md), sem retoque no conteúdo. A IA gerou o Gherkin em inglês, seguindo o padrão do repositório. Aqui ele está traduzido para português, para o exemplo ficar inteiro num idioma só. O original está na versão em inglês. A minha revisão está em [3-minha-revisao.md](3-minha-revisao.md).

## Gherkin

```gherkin
# language: pt
Funcionalidade: Cupom de desconto no checkout

  Contexto:
    Dado um cliente logado com produtos no carrinho
    E o cliente está na etapa de pagamento do checkout

  Regra: O cliente pode digitar um cupom na etapa de pagamento e aplicar

    @smoke @critical
    Cenário: Aplicar um cupom válido
      Dado um cupom válido "SAVE10" de 10% de desconto
      Quando o cliente aplica o cupom "SAVE10"
      Então o cupom é aceito

  Regra: Um cupom válido mostra o desconto e o novo total antes de finalizar a compra

    @smoke @critical
    Cenário: Desconto e novo total aparecem antes de pagar
      Dado que o total do carrinho é 100,00
      E um cupom válido "SAVE10" de 10% de desconto
      Quando o cliente aplica o cupom "SAVE10"
      Então o desconto mostrado é 10,00
      E o novo total mostrado é 90,00
      E a compra ainda não foi finalizada

    @regression
    Esquema do Cenário: Cupons de valor fixo e de porcentagem
      Dado que o total do carrinho é <total_do_carrinho>
      E um cupom válido "<codigo>" de <valor>
      Quando o cliente aplica o cupom "<codigo>"
      Então o novo total mostrado é <novo_total>

      Exemplos:
        | total_do_carrinho | codigo  | valor             | novo_total |
        | 100,00            | SAVE10  | 10% de desconto   | 90,00      |
        | 100,00            | MINUS15 | 15,00 de desconto | 85,00      |
        | 59,99             | SAVE10  | 10% de desconto   | 53,99      |

  Regra: Um cupom inválido ou expirado mostra uma mensagem de erro e não altera o total

    @regression
    Esquema do Cenário: Cupom que não pode ser usado
      Dado que o total do carrinho é 100,00
      Quando o cliente aplica o cupom "<codigo>"
      Então uma mensagem de erro diz que o cupom <motivo>
      E o total continua 100,00

      Exemplos:
        | codigo  | motivo         |
        | NOTREAL | é inválido     |
        | OLDSALE | expirou        |
        |         | é obrigatório  |

  Regra: Só um cupom pode ser usado por pedido

    @regression @critical
    Cenário: Segundo cupom substitui o primeiro ou é recusado
      Dado que o cupom "SAVE10" está aplicado
      Quando o cliente aplica o cupom "MINUS15"
      Então só um cupom fica aplicado no pedido

  Regra: Cupons de porcentagem não podem deixar o total abaixo de zero

    @regression @critical
    Cenário: O total nunca fica abaixo de zero
      Dado que o total do carrinho é 5,00
      E um cupom válido "FULL" de 100% de desconto
      Quando o cliente aplica o cupom "FULL"
      Então o novo total mostrado é 0,00
```

## Rastreabilidade

| Critério de aceite | Cenários |
|---|---|
| 1. Digitar e aplicar o cupom | Aplicar um cupom válido |
| 2. Desconto e novo total antes de finalizar | Desconto e novo total aparecem antes de pagar, Cupons de valor fixo e de porcentagem |
| 3. Cupom inválido ou expirado | Cupom que não pode ser usado |
| 4. Um cupom por pedido | Segundo cupom substitui o primeiro ou é recusado |
| 5. Total nunca abaixo de zero | O total nunca fica abaixo de zero |

## Perguntas em aberto para produto

1. **Quando o cliente aplica um segundo cupom, o primeiro é substituído ou o segundo é recusado?** O cenário do critério 4 hoje aceita as duas coisas, então não pega um bug.
2. **Como o arredondamento funciona?** 10% de 59,99 dá 5,999. O exemplo assume que o total vira 53,99, mas pode ser 54,00.
3. **O cupom vale para o frete?** A história não fala de frete, e isso muda o total esperado em todos os cenários.
4. **Existe valor mínimo de pedido para usar o cupom?**
5. **O cupom continua aplicado se o cliente voltar ao carrinho e mudar os itens?**

## O que deixei de fora

Cupons por categoria de produto e cupons de uso único por cliente, porque a história não menciona. Testes de carga e de concorrência (dois pedidos usando o mesmo cupom limitado ao mesmo tempo), porque dependem de regras que ainda não existem.
