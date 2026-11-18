# Padrão de casos de teste (BDD)

[English version](../en/standards/test-cases-bdd.md)

Escrevo os casos de teste em Gherkin para que produto, devs e QA leiam a mesma coisa. Eles moram no documento da área a que pertencem, e não numa ferramenta separada. O Gherkin fica em inglês, que é como o time e as ferramentas de automação leem.

## Formato

```gherkin
Feature: Shopping cart

  Background:
    Given a visitor on the product page of an item that is in stock

  Rule: A product can be added with a quantity from 1 to 99

    @smoke @critical
    Scenario: Add one unit to the cart
      When the visitor adds 1 unit to the cart
      Then the cart counter shows 1

    @regression
    Scenario Outline: Quantities outside the allowed range are refused
      When the visitor tries to add <quantity> units
      Then the item is not added and the error says "<message>"

      Examples:
        | quantity | message                                         |
        | 0        | The quantity field must be at least 1.          |
        | 100      | The quantity field must not be greater than 99. |
```

## Como uso cada parte

| Parte | Uso |
|---|---|
| `Background` | Preparação comum a todos os cenários da funcionalidade |
| `Rule` | Um critério de aceite ou regra de negócio. Os cenários embaixo dela provam essa regra |
| `Scenario Outline` | O mesmo comportamento com dados diferentes, em vez de copiar cenários |
| `@smoke` | Precisa passar a cada deploy |
| `@regression` | Roda antes de uma release |
| `@critical` | Roda primeiro quando o tempo é curto |

## O que faz um bom caso

Todo cenário se liga a uma regra ou a um risco com nome. Se não consigo dizer qual regra o cenário protege, eu apago.

O tamanho da lista vem das regras, e não de uma meta de quantidade. Dez cenários precisos valem mais que quarenta que se repetem.

Os passos descrevem comportamento, e não cliques. "O visitante adiciona 1 unidade" sobrevive a um redesign. "Clica no botão azul" não.
