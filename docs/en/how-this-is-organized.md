# How this QA base is organized

[Versão em português](../como-esta-base-e-organizada.md)

I organize QA documentation so that anyone on the team can find an answer in under a minute and nobody has to keep two copies of the same rule in sync.

## The rules I follow

Each piece of information lives in one place. A business rule is written once, in the doc of the area it belongs to. Every other doc links to it instead of repeating it.

Every area doc ends with a **What to validate** table. Each row is one thing that must keep working, with its level and where it is covered.

| Level | Meaning |
|---|---|
| Smoke | Runs on every deploy. If it fails, the release stops. |
| Regression | Runs before a release or after a risky change. Includes every smoke row. |

When a row is automated, the table links to the test. When it is not, it says "manual", and the strategy explains why.

A bug that reaches production becomes a new row in the table of its area, with a link to the bug. That is how the checklist grows from real failures instead of guesses.

## Where things are

| Folder | What lives there |
|---|---|
| [standards](standards/) | How we write bugs, test cases and QA results, so every report looks the same |
| [strategy](strategy/) | The test strategy and the risk map that decides where effort goes |
| [areas](areas/) | One doc per product area with its rules, risks, BDD cases and the What to validate table |
| [releases](releases/) | Release reports with the go/no-go decision |
| [bugs](bugs/) | Defects found while testing, in the bug standard |

## The product

The product is [Practice Software Testing](https://practicesoftwaretesting.com), a public demo tool shop built for QA practice. I treat it as if it were the product of my team, which means I describe what I observed, not what I assume.
