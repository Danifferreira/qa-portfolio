# Mapa de riscos

[English version](../en/strategy/risk-map.md)

Dou nota para cada área por impacto (o que acontece com o cliente ou com o negócio se quebrar) e probabilidade (a chance de quebrar, pela complexidade, pelo ritmo de mudança e pelo que vi explorando). A prioridade decide quanto teste cada área recebe.

| Área | Impacto | Probabilidade | Prioridade | Por quê |
|---|---|---|---|---|
| [Admin e permissões](../areas/admin-e-permissoes.md) | Alto | Média | **Alta** | Um cliente chegando a dados ou ações de admin é incidente de segurança e privacidade |
| [Carrinho e checkout](../areas/carrinho-e-checkout.md) | Alto | Média | **Alta** | É onde tem dinheiro envolvido, e é a área com mais etapas e mais estado |
| [Autenticação](../areas/autenticacao.md) | Alto | Baixa | **Média** | Ninguém compra sem ela, mas muda pouco e as regras são claras |
| [Catálogo de produtos](../areas/catalogo-de-produtos.md) | Médio | Média | **Média** | Preço errado ou busca quebrada perdem venda, e o catálogo muda com frequência |

## Como a prioridade vira trabalho

| Prioridade | O que recebe |
|---|---|
| Alta | Casos BDD para cada regra, checagens automatizadas no nível em que a regra vive (API ou tela) e sessão exploratória a cada release |
| Média | Casos BDD das regras principais, smoke automatizado e sessão exploratória quando a área muda |
| Baixa | Sessão exploratória quando a área muda e só linha de regressão |

Reviso este mapa quando um bug escapa, quando uma área muda muito ou, no mínimo, a cada trimestre.
