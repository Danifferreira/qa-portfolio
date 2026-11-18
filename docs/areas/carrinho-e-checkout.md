# Carrinho e checkout

[English version](../en/areas/cart-and-checkout.md)

Adicionar produtos ao carrinho e passar pelo checkout. Prioridade **Alta** no [mapa de riscos](../estrategia/mapa-de-riscos.md).

## Regras observadas

Um carrinho pode ser criado sem login. O produto entra com quantidade de 1 a 99. Quantidades fora desse intervalo são recusadas com uma mensagem clara.

O checkout tem quatro etapas, nesta ordem. Carrinho, login, endereço de cobrança e pagamento.

## Riscos

É onde tem dinheiro envolvido e onde mora mais estado (itens do carrinho, usuário, endereço, pagamento). Uma quantidade errada ou um carrinho perdido custam venda e confiança.

## Casos de teste

```gherkin
Feature: Cart and checkout

  Background:
    Given a product that is in stock

  Rule: A product can be added with a quantity from 1 to 99

    @smoke @critical
    Scenario: Add one unit to the cart
      When a visitor adds the product to the cart
      Then the cart counter shows 1
      And the cart page lists the product

    @regression
    Scenario Outline: Quantities outside the range are refused
      When the product is added with quantity <quantity>
      Then the item is not added and the message says "<message>"

      Examples:
        | quantity | message                                         |
        | 0        | The quantity field must be at least 1.          |
        | 100      | The quantity field must not be greater than 99. |

  Rule: Checkout guides the customer through four steps

    @regression
    Scenario: Checkout with an empty cart
      Given a visitor with an empty cart
      When the visitor opens the checkout
      Then a message explains the cart is empty and links back to the shop
```

## O que validar

| Nível | Item | Teste automatizado |
|---|---|---|
| Smoke | Carrinho é criado e o produto entra com quantidade 1 (API) | [`cart.spec.ts`](../../tests/api/cart.spec.ts) › @smoke visitor can create a cart and add a product |
| Smoke | Visitante adiciona um produto ao carrinho pela tela | [`shopping.spec.ts`](../../tests/e2e/shopping.spec.ts) › @smoke visitor adds a product to the cart |
| Regressão | Quantidades 0 e 100 são recusadas com a mensagem certa | manual |
| Regressão | Checkout completo chega ao pagamento com um cliente logado | manual |
| Regressão | Carrinho vazio no checkout explica o que fazer. Ver [bug](../bugs/checkout-carrinho-vazio-sem-mensagem.md) | manual |
| Regressão | Requisições inválidas ao carrinho respondem JSON 422 mesmo sem o cabeçalho Accept. Ver [bug](../bugs/api-erro-de-validacao-redireciona.md) | manual |
