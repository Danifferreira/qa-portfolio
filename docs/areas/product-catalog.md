# Product catalog

Browsing, filtering and searching products. Priority **Medium** in the [risk map](../strategy/risk-map.md).

## Rules observed

The product list is paginated, 9 items per page, and every item has an id, a name and a numeric price.

Products belong to categories (Hand Tools, Power Tools, Other) and brands. The home page filters by category, brand and price range, and sorts by name or price.

Search matches the product name. An empty search does not cause an error, and a very long search term (3,000 characters) returns an empty list instead of failing.

## Risks

Wrong prices or a broken search lose sales directly. Catalog data changes often, so tests must never depend on a specific product name or price.

## Test cases

```gherkin
Feature: Product catalog

  Rule: The catalog lists products with a name and a price

    @smoke
    Scenario: Product list loads
      When a visitor opens the shop
      Then products are listed, each with a name and a price

  Rule: Search finds products by name

    @smoke
    Scenario: Search by a word from a product name
      Given a product that exists in the catalog
      When a visitor searches for the first word of its name
      Then that product appears in the results

    @regression
    Scenario: Search with no match
      When a visitor searches for a term no product has
      Then an empty result is shown with no error

  Rule: Filters narrow the list

    @regression
    Scenario: Filter by category
      When a visitor selects the category "Hand Tools"
      Then only hand tools are listed
```

## What to validate

| Level | Item | Automated test |
|---|---|---|
| Smoke | Product list returns paginated data with name and price | [`catalog.spec.ts`](../../tests/api/catalog.spec.ts) › @smoke product list returns paginated data |
| Smoke | Search finds a product from the catalog | [`shopping.spec.ts`](../../tests/e2e/shopping.spec.ts) › @smoke search finds a product from the catalog |
| Regression | Search with no match shows an empty result | manual |
| Regression | Category, brand and price filters narrow the list | manual |
| Regression | Sort by price is correct in both directions | manual |
