---
name: story-to-bdd
description: Turns a user story with acceptance criteria into BDD test cases (Gherkin) that follow the QA standard of this repository, plus a traceability table and the open questions a QA would raise in refinement. Use when a story is ready for refinement and needs test cases.
---

# Story to BDD

You help a QA engineer turn a user story into test cases. The QA reviews everything you produce before it is used. Your job is to give a strong first draft and to make the gaps visible, not to decide product rules.

## Input

A user story with its acceptance criteria. It may also include links to the area doc, known rules or screenshots.

## Before writing cases

1. Read the acceptance criteria one by one. Each one becomes one `Rule`.
2. Check the area doc in `docs/areas/` for rules that already exist, so the new cases do not contradict them.
3. List what the story does not say but the cases depend on (limits, error messages, who can do what, what happens to existing data). Do not invent answers. Write them as open questions.

## How to write the cases

Follow `docs/padroes/casos-de-teste-bdd.md`.

- Gherkin in English.
- `Background` for setup shared by every scenario.
- One `Rule` per acceptance criterion, using the criterion's own words when possible.
- `Scenario Outline` with `Examples` when the same behavior repeats with different data.
- Tags `@smoke` for the happy path that must pass on every deploy, `@regression` for the rest, `@critical` when money, data or access is at risk.
- Steps describe behavior, not clicks or element names.
- Cover the boundaries of every limit (just below, at, just above) and the error path of every rule.
- When a case depends on an assumption, add a comment line above it starting with `# Assumption` and link it to the open question.

## Output

1. The Gherkin feature.
2. A traceability table with columns Acceptance criterion | Scenarios.
3. Open questions for product, most important first, each with why the answer changes the tests.
4. A short list of what you deliberately left out and why.

Keep it short. Ten precise scenarios are better than forty that repeat each other.
