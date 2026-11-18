# Bug report standard

[Versão em português](../../padroes/relato-de-bug.md)

One bug per report. A report should let a developer reproduce the problem without asking me anything.

## Title

`[Area] what is wrong + where`

Example: `[Checkout] empty cart shows the checkout steps with no message`

## Sections

| Section | What goes in it |
|---|---|
| Summary | One or two sentences with the problem and its impact |
| Environment | URL, browser or client, version shown by the app, date |
| Preconditions | State needed before the steps (logged in or not, items in cart) |
| Steps to reproduce | Numbered, one action per step |
| Actual result | What happens, with exact messages and status codes |
| Expected result | What should happen, based on a rule or a reasonable user expectation |
| Severity | Critical, High, Medium or Low (see below) |
| Evidence | Screenshot, video or response body, when there is one |
| Suggestion | Optional. Clearly marked as a suggestion and not a decision, because product may prefer another fix |

## Severity

| Severity | When |
|---|---|
| Critical | Data loss, money taken wrongly, security or privacy exposure, main flow blocked for everyone |
| High | Main flow blocked for some users, or wrong data shown to the user |
| Medium | Feature works with a workaround, or an API contract is broken |
| Low | Cosmetic or confusing behavior with no impact on data or money |

## What I leave out

I do not guess the root cause in the report. Finding the cause is the developer's job, and a wrong guess sends people in the wrong direction.

Before opening a bug I search the existing reports, including closed ones, so I do not create a duplicate.
