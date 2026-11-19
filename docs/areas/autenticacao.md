# Autenticação

[English version](../en/areas/authentication.md)

Cadastro e login de clientes. Prioridade **Média** no [mapa de riscos](../estrategia/mapa-de-riscos.md).

## Regras observadas

O cliente se cadastra com nome, sobrenome, e-mail e senha. Endereço, telefone e data de nascimento são opcionais na API.

A senha precisa de pelo menos 8 caracteres, com letra maiúscula, minúscula, número e símbolo. A API responde 422 com uma mensagem para cada regra quebrada.

O login devolve um token. Senha errada devolve 401 sem dizer qual campo estava errado, que é o comportamento seguro.

## Riscos

Uma regra de senha fraca ou uma mensagem de erro que entrega demais deixaria as contas fáceis de atacar. Um login quebrado trava todas as compras.

## Casos de teste

```gherkin
# language: pt
Funcionalidade: Autenticação do cliente

  Regra: Um cliente novo pode criar a conta e fazer login

    @smoke @critical
    Cenário: Cadastro e login
      Dado um visitante com nome, e-mail e senha forte válidos
      Quando o visitante se cadastra
      E faz login com o mesmo e-mail e senha
      Então o visitante está logado e vê o próprio nome

  Regra: Senhas fracas são recusadas

    @regression
    Esquema do Cenário: Senha que quebra uma regra
      Quando um visitante se cadastra com a senha "<senha>"
      Então o cadastro é recusado com uma mensagem sobre "<regra>"

      Exemplos:
        | senha      | regra                    |
        | abc        | pelo menos 8 caracteres  |
        | abcdefgh1! | letra maiúscula          |

  Regra: O login não revela qual campo está errado

    @regression
    Cenário: Senha errada
      Dado um cliente cadastrado
      Quando o cliente faz login com uma senha errada
      Então o login é recusado com uma mensagem genérica
```

## O que validar

| Nível | Item | Teste automatizado |
|---|---|---|
| Smoke | Cliente se cadastra e faz login (API) | [`users.spec.ts`](../../tests/api/users.spec.ts) › @smoke customer can register and log in |
| Smoke | Cliente faz login pela tela | [`auth.spec.ts`](../../tests/e2e/auth.spec.ts) › @smoke customer logs in through the UI |
| Regressão | Senha errada é recusada | [`users.spec.ts`](../../tests/api/users.spec.ts) › wrong password is rejected |
| Regressão | Senhas fracas são recusadas, com uma mensagem por regra | manual |
| Regressão | "Esqueci a senha" envia a redefinição e a senha antiga deixa de funcionar | manual |
