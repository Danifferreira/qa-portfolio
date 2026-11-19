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
# language: pt
Funcionalidade: Carrinho e checkout

  Contexto:
    Dado um produto em estoque

  Regra: Um produto entra no carrinho com quantidade de 1 a 99

    @smoke @critical
    Cenário: Adicionar uma unidade ao carrinho
      Quando um visitante adiciona o produto ao carrinho
      Então o contador do carrinho mostra 1
      E a página do carrinho lista o produto

    @regression
    Esquema do Cenário: Quantidades fora do intervalo são recusadas
      Quando o produto é adicionado com quantidade <quantidade>
      Então o item não entra no carrinho e a mensagem diz "<mensagem>"

      Exemplos:
        | quantidade | mensagem                                        |
        | 0          | The quantity field must be at least 1.          |
        | 100        | The quantity field must not be greater than 99. |

  Regra: O checkout guia o cliente por quatro etapas

    @regression
    Cenário: Checkout com o carrinho vazio
      Dado um visitante com o carrinho vazio
      Quando o visitante abre o checkout
      Então uma mensagem explica que o carrinho está vazio e leva de volta à loja
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
