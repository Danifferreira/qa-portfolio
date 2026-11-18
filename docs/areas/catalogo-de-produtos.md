# Catálogo de produtos

[English version](../en/areas/product-catalog.md)

Navegar, filtrar e buscar produtos. Prioridade **Média** no [mapa de riscos](../estrategia/mapa-de-riscos.md).

## Regras observadas

A lista de produtos é paginada, com 9 itens por página, e todo item tem id, nome e preço numérico.

Os produtos pertencem a categorias (Hand Tools, Power Tools, Other) e marcas. A página inicial ordena por nome ou preço e filtra por faixa de preço, categoria e marca.

A busca procura pelo nome do produto. Uma busca vazia não dá erro, e um termo muito longo (3.000 caracteres) devolve uma lista vazia em vez de falhar.

## Riscos

Preço errado ou busca quebrada perdem venda direto. O catálogo muda com frequência, então nenhum teste pode depender de um nome ou preço específico.

## Casos de teste

```gherkin
Feature: Product catalog

  Rule: The catalog lists products with a name and a price

    @smoke
    Scenario: Product list loads
      When a visitor opens the shop
      Then products are listed, each with a name and a price

  Rule: Search finds products by name

    @smoke
    Scenario: Search by a word from a product name
      Given a product that exists in the catalog
      When a visitor searches for the first word of its name
      Then the results show only the products that match the term
      And that product is among them

    @regression
    Scenario: Search with no match
      When a visitor searches for a term no product has
      Then an empty result is shown with no error

  Rule: Filters narrow the list

    @regression
    Scenario: Filter by category
      When a visitor selects the category "Hand Tools"
      Then only hand tools are listed
```

## O que validar

| Nível | Item | Teste automatizado |
|---|---|---|
| Smoke | A lista de produtos vem paginada, com nome e preço | [`catalog.spec.ts`](../../tests/api/catalog.spec.ts) › @smoke product list returns paginated data |
| Smoke | A busca filtra a lista e encontra um produto do catálogo | [`shopping.spec.ts`](../../tests/e2e/shopping.spec.ts) › @smoke search finds a product from the catalog |
| Regressão | Busca sem resultado mostra lista vazia | manual |
| Regressão | Filtros de categoria, marca e preço reduzem a lista | manual |
| Regressão | Ordenação por preço correta nos dois sentidos | manual |
