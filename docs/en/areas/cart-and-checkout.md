# Cart and checkout

Adding products to the cart and going through checkout. Priority **High** in the [risk map](../strategy/risk-map.md).

## Rules observed

A cart can be created without logging in. A product is added with a quantity from 1 to 99. Quantities outside that range are refused with a clear message.

Checkout has four steps in this order. Cart, sign in, billing address, payment.

## Risks

This is where money is involved and where the most state lives (cart contents, user, address, payment). A wrong quantity or a lost cart costs sales and trust.

## Test cases

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

## What to validate

| Level | Item | Automated test |
|---|---|---|
| Smoke | Cart is created and a product is added with quantity 1 (API) | [`cart.spec.ts`](../../../tests/api/cart.spec.ts) › @smoke customer can create a cart and add a product |
| Smoke | Customer adds a product to the cart in the UI | [`shopping.spec.ts`](../../../tests/e2e/shopping.spec.ts) › @smoke customer adds a product to the cart |
| Regression | Quantities 0 and 100 are refused with the right message | manual |
| Regression | Full checkout reaches the payment step with a logged in customer | manual |
| Regression | Empty cart at checkout explains what to do. See [bug](../bugs/checkout-empty-cart-no-message.md) | manual |
| Regression | Invalid cart requests return JSON 422 even without an Accept header. See [bug](../bugs/api-validation-error-redirect.md) | manual |
