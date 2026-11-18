# Test case standard (BDD)

I write test cases in Gherkin so that product, developers and QA read the same thing. They live in the area doc they belong to, not in a separate tool.

## Shape

```gherkin
Feature: Shopping cart

  Background:
    Given a visitor on the product page of an item that is in stock

  Rule: A product can be added with a quantity from 1 to 99

    @smoke @critical
    Scenario: Add one unit to the cart
      When the visitor adds 1 unit to the cart
      Then the cart counter shows 1

    @regression
    Scenario Outline: Quantities outside the allowed range are refused
      When the visitor tries to add <quantity> units
      Then the item is not added and the error says "<message>"

      Examples:
        | quantity | message                                         |
        | 0        | The quantity field must be at least 1.          |
        | 100      | The quantity field must not be greater than 99. |
```

## How I use each part

| Part | Use |
|---|---|
| `Background` | Setup shared by every scenario in the feature |
| `Rule` | One acceptance criterion or business rule. Scenarios under it prove that rule |
| `Scenario Outline` | Same behavior with different data, instead of copying scenarios |
| `@smoke` | Must pass on every deploy |
| `@regression` | Runs before a release |
| `@critical` | Runs first when time is short |

## What makes a good case

Every scenario traces back to a rule or a named risk. If I cannot say which rule a scenario protects, I delete it.

I size the list by the rules, not by a target number. Ten precise scenarios are better than forty that repeat each other.

Steps describe behavior, not clicks. "The visitor adds 1 unit" survives a redesign. "Clicks the blue button" does not.
