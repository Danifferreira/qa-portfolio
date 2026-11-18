# Admin and permissions

The boundary between what a customer and an admin can do. Priority **High** in the [risk map](../strategy/risk-map.md).

## Rules observed

Listing all users needs a token. Without one, the API returns 401. With a customer token, it returns 403.

Deleting a product is an admin action. A customer token gets 403, and the product is still there afterwards.

## Risks

A customer reading other customers' data or changing the catalog would be a privacy and security incident. Permission bugs are rarely visible in the UI, which is why I test them at the API.

## How I test permissions

For every admin action I check three callers. No token, a customer token, and an admin token. The first two must be refused, and I always confirm afterwards that nothing changed, because an API can answer 403 and still apply the change.

## Test cases

```gherkin
Feature: Permissions

  Rule: Only admins can list users

    @smoke @critical
    Scenario: Anonymous request
      When a request without a token asks for the user list
      Then it is refused as unauthenticated

    @smoke @critical
    Scenario: Customer request
      Given a logged in customer
      When the customer asks for the user list
      Then it is refused as forbidden

  Rule: Only admins can delete products

    @smoke @critical
    Scenario: Customer tries to delete a product
      Given a logged in customer and a product in the catalog
      When the customer tries to delete the product
      Then it is refused as forbidden
      And the product is still in the catalog
```

## What to validate

| Level | Item | Automated test |
|---|---|---|
| Smoke | Anonymous user cannot list users | [`permissions.spec.ts`](../../tests/api/permissions.spec.ts) › anonymous user cannot list users |
| Smoke | Customer cannot list users | [`permissions.spec.ts`](../../tests/api/permissions.spec.ts) › customer cannot list users |
| Smoke | Customer cannot delete a product, and the product stays | [`permissions.spec.ts`](../../tests/api/permissions.spec.ts) › customer cannot delete a product |
| Regression | Customer cannot read another customer's invoices | manual |
| Regression | Customer cannot change another customer's profile | manual |
