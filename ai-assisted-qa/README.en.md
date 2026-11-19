# AI-assisted QA

[Versão em português](README.md)

I use AI in my daily QA work to save time on what is repetitive and keep the judgment with me. This folder shows both sides of that.

| Where | What is there |
|---|---|
| [Story to BDD](historia-para-bdd/) | A skill that turns a user story into BDD cases following this repository's standard, with a real example of the input, what the AI produced and what I corrected in review |
| [How I test AI and MCP features](testing-ai-and-mcp.en.md) | The risks I prioritize and how I test each one when the product has AI inside |

## How I use the skill

It runs in Claude Code. I give it the story with its acceptance criteria, and it returns the Gherkin, a traceability table and the open questions for product. I review everything before using it. AI speeds up the draft, but product decides what the rules are, and I decide what is worth testing.
