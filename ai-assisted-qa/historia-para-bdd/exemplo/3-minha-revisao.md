# O que eu corrigi na revisão

[English version](3-my-review.en.md)

Esta é a minha revisão da [saída da IA](2-saida-da-ia.md). O rascunho economizou tempo, mas não estava pronto para uso. Os problemas abaixo são exatamente o tipo de coisa que passa quando ninguém revisa.

## Cenários que não provam o critério

O cenário "Apply a valid coupon" termina em "the coupon is accepted", que não verifica nada visível. Ele precisa conferir o desconto ou o novo total.

O cenário do critério 4 aceita tanto substituir quanto recusar o segundo cupom, então não pega bug nenhum. A IA percebeu o problema nas perguntas, mas escreveu o cenário mesmo assim. O certo é deixar o cenário pendente até produto responder.

O critério 5 diz que o total não pode ficar abaixo de zero, mas o cenário usa um cupom de 100%, que nunca deixaria o total negativo. Para provar a regra, preciso de um desconto maior que o total.

A IA inventou uma regra. O cupom vazio com a mensagem "is required" não está nos critérios de aceite, e a própria skill diz para não inventar. Isso vira pergunta para produto, e não cenário.

## Casos de borda que faltaram

Cupom com letras minúsculas ou com espaço no fim ("save10 ").

Cupom que vence exatamente no dia da compra, considerando o fuso horário.

Cupom de valor fixo maior que o total do carrinho.

Clique duplo em "aplicar", para garantir que o desconto não é aplicado duas vezes.

Manipulação do preço pela API. O desconto precisa ser recalculado no servidor, sem confiar no total que vem da tela.

## Tags

O cenário de cupom inválido protege dinheiro, porque garante que o total não muda. Ele deveria ser `@critical`.

## Perguntas que eu acrescentaria para produto

O cupom pode ser removido depois de aplicado?

Funciona para quem compra sem login?

A regra de não ficar abaixo de zero vale também para cupom de valor fixo?

Existe limite de uso do cupom por cliente?

## O que tiro disso

A IA é boa para montar a estrutura, cobrir o caminho feliz e levantar perguntas. Ela erra quando precisa decidir se um cenário realmente prova a regra, e às vezes completa o que a história não disse. Por isso a revisão de QA continua sendo a parte que dá valor ao rascunho.
