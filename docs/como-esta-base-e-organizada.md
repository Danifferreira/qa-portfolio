# Como esta base de QA é organizada

[English version](en/how-this-is-organized.md)

Organizo a documentação de QA para que qualquer pessoa do time encontre uma resposta em menos de um minuto e ninguém precise manter duas cópias da mesma regra.

## As regras que sigo

Cada informação mora em um lugar só. Uma regra de negócio é escrita uma vez, no documento da área a que pertence. Os outros documentos apontam para ela em vez de repetir.

Todo documento de área termina com uma tabela **O que validar**. Cada linha é algo que precisa continuar funcionando, com o nível e onde está coberto.

| Nível | Significado |
|---|---|
| Smoke | Roda a cada deploy. Se falhar, a release para |
| Regressão | Roda antes de uma release ou depois de uma mudança arriscada. Inclui todas as linhas de smoke |

Quando a linha é automatizada, a tabela aponta para o teste. Quando não é, diz "manual", e a estratégia explica o motivo.

Um bug que chega à produção vira uma linha nova na tabela da área, com link para o bug. É assim que a lista cresce a partir de falhas reais, e não de palpites.

A versão em inglês é uma tradução. O português é a fonte, e as duas mudam juntas.

## Onde fica cada coisa

| Pasta | O que tem lá |
|---|---|
| [padroes](padroes/) | Como escrevemos bugs, casos de teste e resultados de QA, para todo relato sair igual |
| [estrategia](estrategia/) | A estratégia de testes e o mapa de riscos que decide onde vai o esforço |
| [areas](areas/) | Um documento por área do produto, com regras, riscos, casos BDD e a tabela "O que validar" |
| [releases](releases/) | Relatórios de release com a decisão de go/no-go |
| [bugs](bugs/) | Defeitos encontrados nos testes, no padrão de bug |

## O produto

O produto é o [Practice Software Testing](https://practicesoftwaretesting.com), uma loja de ferramentas pública feita para treinar QA. Trato como se fosse o produto do meu time, ou seja, descrevo o que observei, e não o que imagino.
