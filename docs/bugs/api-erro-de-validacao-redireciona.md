# [API] erros de validação voltam como redirecionamento HTML quando o cliente não pede JSON

[English version](../en/bugs/api-validation-error-redirect.md)

Quando uma requisição falha na validação e não envia `Accept: application/json`, a API responde `302` com uma página HTML que redireciona, em vez de `422` com o erro em JSON. Um cliente que não define esse cabeçalho não consegue saber o que deu errado.

**Ambiente.** https://api.practicesoftwaretesting.com, curl, novembro de 2026.

**Pré-condições.** Um id de carrinho e um id de produto.

**Passos para reproduzir**
1. `POST /carts/{cartId}` com o corpo `{"product_id": "<id>", "quantity": 0}` e o cabeçalho `Content-Type: application/json`, sem cabeçalho `Accept`.
2. Repetir a mesma requisição adicionando `Accept: application/json`.

**Resultado atual.** O passo 1 devolve `302` e uma página HTML com meta refresh. O passo 2 devolve `422` com `{"message":"The quantity field must be at least 1."}`.

**Resultado esperado.** As duas requisições devolvem `422` com o erro em JSON, já que é uma API JSON.

**Severidade.** Média. A regra é aplicada, mas o contrato da API muda conforme um cabeçalho, o que quebra clientes e esconde erros de validação.

**Evidência.** Corpo e status das duas respostas, registrados acima.

**Sugestão** (não é uma decisão, produto pode preferir outra solução). Responder sempre JSON nas rotas da API, independente do cabeçalho `Accept`.
