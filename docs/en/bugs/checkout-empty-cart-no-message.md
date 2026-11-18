# [Checkout] empty cart shows the checkout steps with no message

[Versão em português](../../bugs/checkout-carrinho-vazio-sem-mensagem.md)

A visitor who opens the checkout with an empty cart sees the four step indicators and nothing else. There is no message and no link back to the shop, so the page looks broken.

**Environment.** https://practicesoftwaretesting.com, Chrome, app footer v2.5, November 2026.

**Preconditions.** Visitor not logged in, cart empty.

**Steps to reproduce**
1. Open https://practicesoftwaretesting.com/checkout

**Actual result.** The step bar (Cart, Sign in, Billing address, Payment) is shown with an empty area below it.

**Expected result.** A message explains that the cart is empty, with a link back to the products.

**Severity.** Low. No data or money is affected, but the visitor is left on a dead end.

**Evidence.** Screenshot of `/checkout` with an empty cart, showing only the step bar.

**Suggestion** (not a decision, product may prefer another fix). Show an empty cart message with a "Continue shopping" button, or redirect to the cart page.
