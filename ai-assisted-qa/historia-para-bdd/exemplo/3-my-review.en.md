# What I corrected in review

[Versão em português](3-minha-revisao.md)

This is my review of the [AI output](2-ai-output.en.md). The draft saved time, but it was not ready to use. The problems below are exactly the kind of thing that slips through when nobody reviews.

## Scenarios that do not prove the criterion

The scenario "Apply a valid coupon" ends with "the coupon is accepted", which checks nothing visible. It needs to check the discount or the new total.

The scenario for criterion 4 accepts both replacing and refusing the second coupon, so it would never catch a bug. The AI noticed the problem in its questions but wrote the scenario anyway. The right move is to keep the scenario pending until product answers.

Criterion 5 says the total cannot go below zero, but the scenario uses a 100% coupon, which could never make the total negative. To prove the rule I need a discount larger than the total.

The AI made up a rule. An empty coupon with the message "is required" is not in the acceptance criteria, and the skill itself says not to invent rules. That becomes a question for product, not a scenario.

## Edge cases that were missing

A coupon in lowercase or with a trailing space ("save10 ").

A coupon that expires on the exact day of purchase, considering the time zone.

A fixed value coupon larger than the cart total.

A double click on "apply", to make sure the discount is not applied twice.

Price tampering through the API. The discount must be recalculated on the server, without trusting the total sent by the screen.

## Tags

The invalid coupon scenario protects money, because it guarantees the total does not change. It should be `@critical`.

## Questions I would add for product

Can the coupon be removed after it is applied?

Does it work for guest checkout?

Does the "never below zero" rule also apply to fixed value coupons?

Is there a usage limit per customer?

## What I take from this

AI is good at building the structure, covering the happy path and raising questions. It gets things wrong when it has to decide whether a scenario really proves the rule, and it sometimes fills in what the story did not say. That is why the QA review is still the part that gives the draft its value.
