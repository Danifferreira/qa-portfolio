# [Geral] o app mostra dois números de versão diferentes

[English version](../en/bugs/app-version-mismatch.md)

O título da aba do navegador diz `v5.0`, enquanto o rodapé da mesma página diz `v2.5`. Quando alguém reporta um bug, não fica claro em qual versão está.

**Ambiente.** https://practicesoftwaretesting.com, Chrome, novembro de 2026.

**Passos para reproduzir**
1. Abrir https://practicesoftwaretesting.com/checkout
2. Comparar o título da aba com a versão no rodapé.

**Resultado atual.** O título mostra "Checkout - Practice Software Testing - Toolshop - v5.0". O rodapé mostra "v2.5 | Built 2026-10-11".

**Resultado esperado.** Um único número de versão, igual em todos os lugares.

**Severidade.** Baixa. Não afeta quem usa, mas atrasa a triagem de bugs e o suporte.

**Evidência.** Título da aba e rodapé da página `/checkout`, registrados acima.

**Sugestão** (não é uma decisão, produto pode preferir outra solução). Ler a versão de um único lugar na hora do build e usar no título e no rodapé.
