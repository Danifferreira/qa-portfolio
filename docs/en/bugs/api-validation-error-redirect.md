# [API] validation errors come back as an HTML redirect when the client does not ask for JSON

[Versão em português](../../bugs/api-erro-de-validacao-redireciona.md)

When a request fails validation and does not send `Accept: application/json`, the API answers `302` with an HTML page that redirects, instead of `422` with the JSON error. A client that does not set that header cannot tell what went wrong.

**Environment.** https://api.practicesoftwaretesting.com, curl, November 2026.

**Preconditions.** A cart id and a product id.

**Steps to reproduce**
1. `POST /carts/{cartId}` with body `{"product_id": "<id>", "quantity": 0}` and header `Content-Type: application/json`, without an `Accept` header.
2. Repeat the same request adding `Accept: application/json`.

**Actual result.** Step 1 returns `302` and an HTML page with a meta refresh. Step 2 returns `422` with `{"message":"The quantity field must be at least 1."}`.

**Expected result.** Both requests return `422` with the JSON error, since this is a JSON API.

**Severity.** Medium. The rule is enforced, but the API contract changes depending on a header, which breaks clients and hides validation errors.

**Evidence.** Status and body of both responses, recorded above.

**Suggestion** (not a decision, product may prefer another fix). Always answer JSON for routes under the API, regardless of the `Accept` header.
