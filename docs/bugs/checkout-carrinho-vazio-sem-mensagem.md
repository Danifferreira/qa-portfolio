# [Checkout] carrinho vazio mostra as etapas do checkout sem nenhuma mensagem

[English version](../en/bugs/checkout-empty-cart-no-message.md)

Quem abre o checkout com o carrinho vazio vê os quatro indicadores de etapa e mais nada. Não há mensagem nem link de volta para a loja, então a página parece quebrada.

**Ambiente.** https://practicesoftwaretesting.com, Chrome, rodapé do app v2.5, novembro de 2026.

**Pré-condições.** Visitante sem login, carrinho vazio.

**Passos para reproduzir**
1. Abrir https://practicesoftwaretesting.com/checkout

**Resultado atual.** A barra de etapas (Cart, Sign in, Billing address, Payment) aparece com uma área vazia embaixo.

**Resultado esperado.** Uma mensagem explica que o carrinho está vazio, com um link de volta para os produtos.

**Severidade.** Baixa. Não afeta dados nem dinheiro, mas deixa o visitante num beco sem saída.

**Evidência.** Print da página `/checkout` com o carrinho vazio, mostrando só a barra de etapas.

**Sugestão** (não é uma decisão, produto pode preferir outra solução). Mostrar uma mensagem de carrinho vazio com um botão "Continuar comprando", ou redirecionar para a página do carrinho.
