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
Feature: Customer authentication

  Rule: A new customer can create an account and log in

    @smoke @critical
    Scenario: Register and log in
      Given a visitor with a valid name, email and strong password
      When the visitor registers
      And logs in with the same email and password
      Then the visitor is logged in and sees their own name

  Rule: Weak passwords are refused

    @regression
    Scenario Outline: Password that breaks a rule
      When a visitor registers with the password "<password>"
      Then the registration is refused with a message about "<rule>"

      Examples:
        | password   | rule                  |
        | abc        | at least 8 characters |
        | abcdefgh1! | uppercase letter      |

  Rule: Login does not reveal which field is wrong

    @regression
    Scenario: Wrong password
      Given a registered customer
      When the customer logs in with a wrong password
      Then the login is refused with a generic message
```

## O que validar

| Nível | Item | Teste automatizado |
|---|---|---|
| Smoke | Cliente se cadastra e faz login (API) | [`users.spec.ts`](../../tests/api/users.spec.ts) › @smoke customer can register and log in |
| Smoke | Cliente faz login pela tela | [`auth.spec.ts`](../../tests/e2e/auth.spec.ts) › @smoke customer logs in through the UI |
| Regressão | Senha errada é recusada | [`users.spec.ts`](../../tests/api/users.spec.ts) › wrong password is rejected |
| Regressão | Senhas fracas são recusadas, com uma mensagem por regra | manual |
| Regressão | "Esqueci a senha" envia a redefinição e a senha antiga deixa de funcionar | manual |
