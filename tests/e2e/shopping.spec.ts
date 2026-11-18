import { test, expect } from '../support/fixtures';
import { ApiClient, pickAnyInStockProduct } from '../support/api-client';

test.describe('Shopping', () => {
  test('@smoke search finds a product from the catalog', async ({ page, request }) => {
    const product = await pickAnyInStockProduct(new ApiClient(request));
    const term = product.name.split(' ')[0];

    await page.goto('/');
    await expect(page.getByTestId('search-caption')).toHaveCount(0);

    await page.getByTestId('search-query').fill(term);
    await page.getByTestId('search-submit').click();

    await expect(page.getByTestId('search-caption')).toContainText(term);

    const apiResults = await (await new ApiClient(request).get(`/products/search?q=${encodeURIComponent(term)}`)).json();
    const expected = apiResults.data.map((item: { name: string }) => item.name).sort();
    expect(expected).toContain(product.name);

    const names = page.getByTestId('product-name');
    await expect
      .poll(async () => (await names.allTextContents()).map((name) => name.trim()).sort())
      .toEqual(expected.slice(0, 9));
  });

  test('@smoke visitor adds a product to the cart', async ({ page, request }) => {
    const product = await pickAnyInStockProduct(new ApiClient(request));

    await page.goto(`/product/${product.id}`);
    await expect(page.getByTestId('product-name')).toHaveText(product.name);
    await page.getByTestId('add-to-cart').click();

    await expect(page.getByTestId('cart-quantity')).toHaveText('1');
    await page.getByTestId('nav-cart').click();
    await expect(page.getByTestId('product-title').filter({ hasText: product.name })).toBeVisible();
  });
});
