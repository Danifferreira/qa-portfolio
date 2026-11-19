# Admin e permissões

[English version](../en/areas/admin-and-permissions.md)

A fronteira entre o que um cliente e um admin podem fazer. Prioridade **Alta** no [mapa de riscos](../estrategia/mapa-de-riscos.md).

## Regras observadas

Listar todos os usuários exige token. Sem token, a API responde 401. Com token de cliente, responde 403.

Apagar um produto é ação de admin. Um token de cliente recebe 403, e o produto continua lá depois.

## Riscos

Um cliente lendo dados de outros clientes ou alterando o catálogo seria incidente de privacidade e segurança. Bugs de permissão raramente aparecem na tela, por isso testo direto na API.

## Como testo permissões

Para cada ação de admin, o ideal é testar três chamadas, sem token, com token de cliente e com token de admin. As duas primeiras precisam ser recusadas, e depois confiro que nada mudou, porque uma API pode responder 403 e ainda assim aplicar a mudança.

Neste portfólio, a automação cobre os casos recusados. O caso positivo (o admin consegue) fica como regressão manual, porque a conta de admin da demonstração é compartilhada por todos que treinam nela, e um teste automático não deve depender dela nem alterar seus dados.

## Casos de teste

```gherkin
# language: pt
Funcionalidade: Permissões

  Regra: Só admins listam usuários

    @smoke @critical
    Cenário: Requisição sem login
      Quando uma requisição sem token pede a lista de usuários
      Então ela é recusada como não autenticada

    @smoke @critical
    Cenário: Requisição de cliente
      Dado um cliente logado
      Quando o cliente pede a lista de usuários
      Então ela é recusada como proibida

  Regra: Só admins apagam produtos

    @smoke @critical
    Cenário: Cliente tenta apagar um produto
      Dado um cliente logado e um produto no catálogo
      Quando o cliente tenta apagar o produto
      Então a ação é recusada como proibida
      E o produto continua no catálogo
```

## O que validar

| Nível | Item | Teste automatizado |
|---|---|---|
| Smoke | Visitante sem login não lista usuários | [`permissions.spec.ts`](../../tests/api/permissions.spec.ts) › anonymous user cannot list users |
| Smoke | Cliente não lista usuários | [`permissions.spec.ts`](../../tests/api/permissions.spec.ts) › customer cannot list users |
| Smoke | Cliente não apaga produto, e o produto continua lá | [`permissions.spec.ts`](../../tests/api/permissions.spec.ts) › customer cannot delete a product |
| Regressão | Admin consegue apagar um produto (caso positivo) | manual |
| Regressão | Visitante sem login não apaga produto | manual |
| Regressão | Cliente não lê notas fiscais de outro cliente | manual |
| Regressão | Cliente não altera o perfil de outro cliente | manual |
