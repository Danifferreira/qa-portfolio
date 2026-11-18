import { test, expect } from '../support/fixtures';
import { ApiClient, pickAnyInStockProduct } from '../support/api-client';

test.describe('Shopping', () => {
  test('@smoke search finds a product from the catalog', async ({ page, request }) => {
    const product = await pickAnyInStockProduct(new ApiClient(request));
    const term = product.name.split(' ')[0];

    await page.goto('/');
    await page.getByTestId('search-query').fill(term);
    await page.getByTestId('search-submit').click();

    await expect(page.getByTestId('product-name').filter({ hasText: product.name }).first()).toBeVisible();
  });

  test('@smoke customer adds a product to the cart', async ({ page, request }) => {
    const product = await pickAnyInStockProduct(new ApiClient(request));

    await page.goto(`/product/${product.id}`);
    await expect(page.getByTestId('product-name')).toHaveText(product.name);
    await page.getByTestId('add-to-cart').click();

    await expect(page.getByTestId('cart-quantity')).toHaveText('1');
    await page.getByTestId('nav-cart').click();
    await expect(page.getByTestId('product-title').filter({ hasText: product.name })).toBeVisible();
  });
});
