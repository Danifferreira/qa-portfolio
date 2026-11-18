# QA result standard

[Versão em português](../../padroes/resultado-de-qa.md)

When I finish testing a change, I leave one short result on the ticket. It is plain text, so it reads well anywhere and nobody has to scroll past decoration.

## Shape

```
Approved by QA

Short summary of what was tested and the outcome, in one or two sentences.

Test run
- Environment and version
- Accounts or data used
- Links to the test run or report

Results
- Group of cases and result
- Group of cases and result

Notes
- Anything the team should know, such as known limitations, follow-up tickets or risks accepted

Evidence
1. What the first attachment shows
2. What the second attachment shows
```

## Rules

The first line only says approved or rejected, so the result is clear at a glance.

A rejection always names the case that failed and links the bug, so the developer knows exactly what to fix.

An approval stays short. Evidence goes in only when there are attachments.
