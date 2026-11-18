# Release report (example)

This is a fictional release of the tool shop, written the way I write real ones. The goal of the report is to let product decide in five minutes, with no surprises after go-live.

## Release 2.6 — cart quantity limits and checkout improvements

**Recommendation. Go**, with one accepted risk listed below.

## What changed

Cart quantities are now limited to 1 to 99 per product. The checkout step bar was redesigned.

## What was tested

| Group | Result |
|---|---|
| Smoke suite (all smoke rows in every area) | Passed |
| Cart quantity limits, including 0, 1, 99 and 100 | Passed |
| Checkout from cart to payment, logged in and as a new customer | Passed |
| Permissions regression (customer against admin endpoints) | Passed |
| Exploratory session on checkout, 45 minutes | 1 bug found |

## Bugs

| Bug | Severity | Status | Blocks release |
|---|---|---|---|
| [Empty cart shows the checkout steps with no message](../bugs/checkout-empty-cart-no-message.md) | Low | Open | No |

## Risks accepted

The empty cart checkout bug ships. It affects only visitors who open the checkout URL directly with an empty cart, and it has no impact on orders. Accepted by product, fix planned for the next release.

## Not covered

Payment with real providers (the demo has none), invoice PDF content, and performance under load. None of them changed in this release.

## After go-live

Smoke suite runs on production right after the deploy. If any smoke row fails, the release is rolled back before customers are notified.
