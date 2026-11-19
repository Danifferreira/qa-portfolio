# User story (input)

[Versão em português](1-historia.md)

This is the story I gave the skill. It is a fictional feature of the demo shop, written the way stories usually arrive in refinement.

## Discount coupon at checkout

**As** a shop customer,
**I want** to apply a discount coupon at checkout,
**so that** I pay less when I have a promotion.

### Acceptance criteria

1. The customer can type a coupon at the payment step and apply it.
2. A valid coupon shows the discount and the new total before the purchase is completed.
3. An invalid or expired coupon shows an error message and does not change the total.
4. Only one coupon can be used per order.
5. Percentage coupons cannot bring the total below zero.
