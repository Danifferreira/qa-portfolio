# Test strategy

[Versão em português](../../estrategia/estrategia-de-testes.md)

This is how I would run QA for the tool shop if it were my team's product. The goal is simple. No release breaks buying, and no customer can see or change what is not theirs.

## Scope

In scope are the customer flows (sign up, log in, browse, search, cart, checkout), the public API that powers them, and the permission boundary between customers and admins.

Out of scope for now are the admin back office screens, invoice PDFs, payment providers (the demo has none that are real), load testing and accessibility audits. Each of these would get its own plan if the product depended on it.

## Where effort goes

The [risk map](risk-map.md) decides it. High priority areas get BDD cases, automation and smoke rows. Lower priority areas get exploratory sessions and regression rows.

## Test levels

| Level | What it covers here | Why |
|---|---|---|
| API | Auth, catalog contract, cart rules, permissions | Fast and stable. Most business rules and every permission check live in the API, so this is where I put most automated checks |
| UI end to end | Login, search, add to cart | Proves the main path works for a real user in a real browser. Kept small because UI tests are slower and more fragile |
| Exploratory | New features, edge cases, anything that changed | Finds what nobody wrote a case for. Every session ends with notes, and real bugs become rows in the area tables |
| Manual regression | Rows marked "manual" in the area tables | Things that are expensive to automate or change too often to be worth it |

## What I automate and what I do not

I automate checks that run often, are stable, and protect money, data or access. Login, cart and permissions qualify.

I do not automate flows that change every sprint, visual details, or anything that needs a human judgment call. Those stay as manual or exploratory rows, and I revisit the decision every quarter.

A small suite I trust is worth more than a large one people learn to ignore. Tests that need an account register a new customer on every run. Tests that need a product pick one from the live catalog at run time, never by a fixed name or price. That way a red result always means something.

## Environments

Tests run against the public demo. Before each daily run, a health check confirms the site is up. If it is not, the run is reported as "Environment unavailable" instead of failing, because a broken environment is not a broken product.

The daily run on GitHub runs the API tests. The UI tests run locally, because the shop protects some pages with Cloudflare's bot check when traffic comes from servers, and working around that protection is not an option. The next step is for the workflow to start its own copy of the shop and run everything there.

## Entry and exit criteria

A change enters QA when it has acceptance criteria, is deployed to a test environment, and the developer has noted anything risky.

A release leaves QA when every smoke row passes, no Critical or High bug is open, and every accepted risk is written in the [release report](../releases/release-report-example.md) with who accepted it.

## How a release decision is made

I write the release report with what was tested, what was not, the open bugs and the risks. The go or no-go is a recommendation with reasons. The final call is shared with product, and when we ship with a known risk, the report says so in plain words.
