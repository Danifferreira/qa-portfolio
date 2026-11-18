# QA result standard

When I finish testing a change, I leave one short result on the ticket. It is plain text, so it reads well anywhere and nobody has to scroll past decoration.

## Shape

```
QA Approved

Short summary of what was tested and the outcome, in one or two sentences.

QA Execution
- Environment and version
- Accounts or data used
- Links to the test run or report

Results
- Group of cases and result
- Group of cases and result

Notes
- Anything the team should know, such as known limitations, follow-up tickets or risks accepted

Evidence (in order)
1. What the first attachment shows
2. What the second attachment shows
```

## Rules

The first line is only `QA Approved` or `QA Rejected`, so the result is clear at a glance.

A rejection always names the case that failed and links the bug, so the developer knows exactly what to fix.

An approval stays short. If there are no screenshots, there is no Evidence section.
