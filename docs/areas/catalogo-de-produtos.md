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
# language: pt
Funcionalidade: Catálogo de produtos

  Regra: O catálogo lista produtos com nome e preço

    @smoke
    Cenário: A lista de produtos carrega
      Quando um visitante abre a loja
      Então os produtos aparecem, cada um com nome e preço

  Regra: A busca encontra produtos pelo nome

    @smoke
    Cenário: Busca por uma palavra do nome do produto
      Dado um produto que existe no catálogo
      Quando um visitante busca a primeira palavra do nome dele
      Então os resultados mostram só os produtos que combinam com o termo
      E esse produto está entre eles

    @regression
    Cenário: Busca sem resultado
      Quando um visitante busca um termo que nenhum produto tem
      Então aparece um resultado vazio, sem erro

  Regra: Os filtros reduzem a lista

    @regression
    Cenário: Filtro por categoria
      Quando um visitante seleciona a categoria "Hand Tools"
      Então só aparecem ferramentas manuais
```

## O que validar

| Nível | Item | Teste automatizado |
|---|---|---|
| Smoke | A lista de produtos vem paginada, com nome e preço | [`catalog.spec.ts`](../../tests/api/catalog.spec.ts) › @smoke product list returns paginated data |
| Smoke | A busca filtra a lista e encontra um produto do catálogo | [`shopping.spec.ts`](../../tests/e2e/shopping.spec.ts) › @smoke search finds a product from the catalog |
| Regressão | Busca sem resultado mostra lista vazia | manual |
| Regressão | Filtros de categoria, marca e preço reduzem a lista | manual |
| Regressão | Ordenação por preço correta nos dois sentidos | manual |
