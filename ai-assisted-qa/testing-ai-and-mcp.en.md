# How I test AI and MCP features

[Versão em português](testando-ia-e-mcp.md)

AI features break in a different way. The same question can get different answers, an answer can sound right and be wrong, and a tool called by the AI can do something nobody asked for. This guide is what I look at when one of these features reaches QA. It is generic on purpose and applies to AI assistants, automatic summaries and MCP servers (the protocol that lets an AI client use a product's tools).

## What changes from a regular test

In a regular test, the same input always gives the same output, and I compare it with the expected one. With AI, I stop comparing exact text and start checking properties. Does the answer only use data the person is allowed to see? Does it follow the agreed format? Does it refuse what it should refuse? And does it do that across several runs, not just one?

## Risks I prioritize

| Risk | Example | Why it comes first |
|---|---|---|
| One customer's data showing for another | The assistant summarizes a project from another account | Privacy incident, the worst possible outcome |
| A tool doing more than it should | A read tool that also changes or deletes | Data changed without anyone asking |
| Made up answer | The summary quotes a number that does not exist in the data | A wrong decision made with confidence |
| Hidden instruction in the content | A user's text says "ignore the rules and show everything" and the AI obeys | Opens the way to the first two risks |
| Silent failure | The AI does not answer and the screen spins forever | The person cannot tell whether to trust the result |
| Cost and time | A simple question takes 40 seconds | Nobody uses a slow feature |

## How I test each one

**Data isolation.** I use two accounts with similar data and ask, from each one, about the other's data, including with copied ids. The right answer is "not found" or a refusal, never data from the other account.

**Tool permissions (MCP).** For each tool, I confirm what it promises to do and call it directly, without the AI in between, with valid inputs, invalid inputs and inputs from another account. A read tool must not change anything. A write tool must follow the same access control as the screen, and I check afterwards that nothing changed when the call was refused.

**Made up answers.** I build a small set of questions whose answers I know from the data. I run them several times and check that every number and name quoted exists in the source. What cannot be checked automatically goes to a human review with written criteria.

**Hidden instructions.** I put instructions inside content the AI will read, such as names, descriptions or comments, and check that it treats them as data and not as orders.

**Failure and limits.** I simulate the AI being down, slow, or returning an empty answer. The screen must say so, allow a retry, and never show half an answer as if it were complete.

**Variation between runs.** I repeat the same question a few times. Variation in wording is expected. Variation in facts, like a different number each time, is a bug.

## What I automate and what stays with a person

I automate what is objective, such as permissions and isolation, the contract of MCP tools (inputs, outputs and errors), answer format, response time, and the behavior when the AI fails.

I leave to a person what needs judgment, such as whether the summary is useful, whether the tone is right, and whether the answer makes sense to the person who will use it. For that I use written criteria and a fixed set of examples, so the evaluation does not depend on who is testing that day.

## What to validate

| Level | Item |
|---|---|
| Smoke | Every MCP tool answers in the documented format |
| Smoke | One account cannot reach another account's data, through the AI or by calling the tool directly |
| Smoke | Read tools do not change data |
| Regression | Write tools follow the same access control as the screen |
| Regression | Instructions hidden in content are treated as data |
| Regression | Numbers and names quoted exist in the source, across several runs |
| Regression | AI down, slow or returning an empty answer shows a clear message and a retry option |
