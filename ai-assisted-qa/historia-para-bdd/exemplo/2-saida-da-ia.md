# Saída gerada pela IA

[English version](2-ai-output.en.md)

Esta é a saída da skill para a [história do cupom](1-historia.md), exatamente como foi gerada, sem retoque. A minha revisão está em [3-minha-revisao.md](3-minha-revisao.md). O Gherkin fica em inglês, como no padrão do repositório.

## Gherkin

```gherkin
Feature: Discount coupon at checkout

  Background:
    Given a logged in customer with products in the cart
    And the customer is on the payment step of the checkout

  Rule: The customer can type a coupon at the payment step and apply it

    @smoke @critical
    Scenario: Apply a valid coupon
      Given a valid coupon "SAVE10" worth 10% off
      When the customer applies the coupon "SAVE10"
      Then the coupon is accepted

  Rule: A valid coupon shows the discount and the new total before the purchase is completed

    @smoke @critical
    Scenario: Discount and new total are shown before paying
      Given the cart total is 100.00
      And a valid coupon "SAVE10" worth 10% off
      When the customer applies the coupon "SAVE10"
      Then the discount shown is 10.00
      And the new total shown is 90.00
      And the purchase is not completed yet

    @regression
    Scenario Outline: Fixed and percentage coupons
      Given the cart total is <cart_total>
      And a valid coupon "<code>" worth <value>
      When the customer applies the coupon "<code>"
      Then the new total shown is <new_total>

      Examples:
        | cart_total | code    | value     | new_total |
        | 100.00     | SAVE10  | 10% off   | 90.00     |
        | 100.00     | MINUS15 | 15.00 off | 85.00     |
        | 59.99      | SAVE10  | 10% off   | 53.99     |

  Rule: An invalid or expired coupon shows an error message and does not change the total

    @regression
    Scenario Outline: Coupon that cannot be used
      Given the cart total is 100.00
      When the customer applies the coupon "<code>"
      Then an error message says the coupon <reason>
      And the total stays 100.00

      Examples:
        | code      | reason          |
        | NOTREAL   | is invalid      |
        | OLDSALE   | has expired     |
        |           | is required     |

  Rule: Only one coupon can be used per order

    @regression @critical
    Scenario: Second coupon replaces or is refused
      Given the coupon "SAVE10" is applied
      When the customer applies the coupon "MINUS15"
      Then only one coupon is applied to the order

  Rule: Percentage coupons cannot bring the total below zero

    @regression @critical
    Scenario: Total never goes below zero
      Given the cart total is 5.00
      And a valid coupon "FULL" worth 100% off
      When the customer applies the coupon "FULL"
      Then the new total shown is 0.00
```

## Rastreabilidade

| Critério de aceite | Cenários |
|---|---|
| 1. Digitar e aplicar o cupom | Apply a valid coupon |
| 2. Desconto e novo total antes de finalizar | Discount and new total are shown before paying, Fixed and percentage coupons |
| 3. Cupom inválido ou expirado | Coupon that cannot be used |
| 4. Um cupom por pedido | Second coupon replaces or is refused |
| 5. Total nunca abaixo de zero | Total never goes below zero |

## Perguntas em aberto para produto

1. **Quando o cliente aplica um segundo cupom, o primeiro é substituído ou o segundo é recusado?** O cenário do critério 4 hoje aceita as duas coisas, então não pega um bug.
2. **Como o arredondamento funciona?** 10% de 59,99 dá 5,999. O exemplo assume que o total vira 53,99, mas pode ser 54,00.
3. **O cupom vale para o frete?** A história não fala de frete, e isso muda o total esperado em todos os cenários.
4. **Existe valor mínimo de pedido para usar o cupom?**
5. **O cupom continua aplicado se o cliente voltar ao carrinho e mudar os itens?**

## O que deixei de fora

Cupons por categoria de produto e cupons de uso único por cliente, porque a história não menciona. Testes de carga e de concorrência (dois pedidos usando o mesmo cupom limitado ao mesmo tempo), porque dependem de regras que ainda não existem.
