# Padrão de casos de teste (BDD)

[English version](../en/standards/test-cases-bdd.md)

Escrevo os casos de teste em Gherkin para que produto, devs e QA leiam a mesma coisa. Eles moram no documento da área a que pertencem, e não numa ferramenta separada. O Gherkin segue o idioma do documento. Nos documentos em português ele fica em português (`# language: pt`), e na versão em inglês fica em inglês. As mensagens que o sistema mostra são copiadas exatamente como aparecem.

## Formato

```gherkin
# language: pt
Funcionalidade: Carrinho de compras

  Contexto:
    Dado um visitante na página de um produto em estoque

  Regra: Um produto entra no carrinho com quantidade de 1 a 99

    @smoke @critical
    Cenário: Adicionar uma unidade ao carrinho
      Quando o visitante adiciona 1 unidade ao carrinho
      Então o contador do carrinho mostra 1

    @regression
    Esquema do Cenário: Quantidades fora do intervalo permitido são recusadas
      Quando o visitante tenta adicionar <quantidade> unidades
      Então o item não entra e o erro diz "<mensagem>"

      Exemplos:
        | quantidade | mensagem                                        |
        | 0          | The quantity field must be at least 1.          |
        | 100        | The quantity field must not be greater than 99. |
```

## Como uso cada parte

| Parte | Uso |
|---|---|
| `Contexto` (`Background`) | Preparação comum a todos os cenários da funcionalidade |
| `Regra` (`Rule`) | Um critério de aceite ou regra de negócio. Os cenários embaixo dela provam essa regra |
| `Esquema do Cenário` (`Scenario Outline`) | O mesmo comportamento com dados diferentes, em vez de copiar cenários |
| `@smoke` | Precisa passar a cada deploy |
| `@regression` | Roda antes de uma release |
| `@critical` | Roda primeiro quando o tempo é curto |

## O que faz um bom caso

Todo cenário se liga a uma regra ou a um risco com nome. Se não consigo dizer qual regra o cenário protege, eu apago.

O tamanho da lista vem das regras, e não de uma meta de quantidade. Dez cenários precisos valem mais que quarenta que se repetem.

Os passos descrevem comportamento, e não cliques. "O visitante adiciona 1 unidade" sobrevive a um redesign. "Clica no botão azul" não.
