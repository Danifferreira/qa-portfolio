# Authentication

Sign up and log in for customers. Priority **Medium** in the [risk map](../strategy/risk-map.md).

## Rules observed

A customer registers with first name, last name, email and password. Address, phone and date of birth are optional in the API.

The password needs at least 8 characters, with uppercase, lowercase, a number and a symbol. The API returns 422 with one message per broken rule.

Log in returns a bearer token. A wrong password returns 401 with no hint about which field was wrong, which is the safe behavior.

## Risks

A weak password rule or a leaky error message would make accounts easy to attack. A broken login blocks every purchase.

## Test cases

```gherkin
Feature: Customer authentication

  Rule: A new customer can create an account and log in

    @smoke @critical
    Scenario: Register and log in
      Given a visitor with a valid name, email and strong password
      When the visitor registers
      And logs in with the same email and password
      Then the visitor is logged in and sees their own name

  Rule: Weak passwords are refused

    @regression
    Scenario Outline: Password that breaks a rule
      When a visitor registers with the password "<password>"
      Then the registration is refused with a message about "<rule>"

      Examples:
        | password  | rule                 |
        | abc       | at least 8 characters |
        | abcdefgh1! | uppercase letter     |

  Rule: Login does not reveal which field is wrong

    @regression
    Scenario: Wrong password
      Given a registered customer
      When the customer logs in with a wrong password
      Then the login is refused with a generic message
```

## What to validate

| Level | Item | Automated test |
|---|---|---|
| Smoke | Customer can register and log in (API) | [`users.spec.ts`](../../tests/api/users.spec.ts) › @smoke customer can register and log in |
| Smoke | Customer logs in through the UI | [`auth.spec.ts`](../../tests/e2e/auth.spec.ts) › @smoke customer logs in through the UI |
| Regression | Wrong password is rejected | [`users.spec.ts`](../../tests/api/users.spec.ts) › wrong password is rejected |
| Regression | Weak passwords are refused with one message per rule | manual |
| Regression | Forgot password sends a reset and the old password stops working | manual |
