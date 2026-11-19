# AI output

[Versão em português](2-saida-da-ia.md)

This is the skill's output for the [coupon story](1-story.en.md), exactly as it was generated, with no edits. My review is in [3-my-review.en.md](3-my-review.en.md).

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

## Traceability

| Acceptance criterion | Scenarios |
|---|---|
| 1. Type and apply the coupon | Apply a valid coupon |
| 2. Discount and new total before completing | Discount and new total are shown before paying, Fixed and percentage coupons |
| 3. Invalid or expired coupon | Coupon that cannot be used |
| 4. One coupon per order | Second coupon replaces or is refused |
| 5. Total never below zero | Total never goes below zero |

## Open questions for product

1. **When the customer applies a second coupon, is the first one replaced or is the second one refused?** The scenario for criterion 4 accepts both today, so it would not catch a bug.
2. **How does rounding work?** 10% of 59.99 is 5.999. The example assumes the total becomes 53.99, but it could be 54.00.
3. **Does the coupon apply to shipping?** The story does not mention shipping, and that changes the expected total in every scenario.
4. **Is there a minimum order value to use a coupon?**
5. **Does the coupon stay applied if the customer goes back to the cart and changes the items?**

## What I left out

Coupons limited to a product category and single-use coupons per customer, because the story does not mention them. Load and concurrency tests (two orders using the same limited coupon at the same time), because they depend on rules that do not exist yet.
