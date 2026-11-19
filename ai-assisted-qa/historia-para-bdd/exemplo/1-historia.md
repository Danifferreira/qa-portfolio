# História de usuário (entrada)

[English version](1-story.en.md)

Esta é a história que entreguei para a skill. É uma funcionalidade fictícia da loja de demonstração, escrita do jeito que costuma chegar num refinamento.

## Cupom de desconto no checkout

**Como** cliente da loja,
**quero** aplicar um cupom de desconto no checkout,
**para** pagar menos quando tenho uma promoção.

### Critérios de aceite

1. O cliente pode digitar um cupom na etapa de pagamento e aplicar.
2. Um cupom válido mostra o desconto e o novo total antes de finalizar a compra.
3. Um cupom inválido ou expirado mostra uma mensagem de erro e não altera o total.
4. Só um cupom pode ser usado por pedido.
5. Cupons de porcentagem não podem deixar o total abaixo de zero.
