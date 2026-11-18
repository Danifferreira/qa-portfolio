import { test, expect } from '@playwright/test';
import { ApiClient, pickAnyInStockProduct } from '../support/api-client';

test.describe('Cart API', () => {
  test('@smoke visitor can create a cart and add a product', async ({ request }) => {
    const api = new ApiClient(request);
    const product = await pickAnyInStockProduct(api);

    const created = await api.post('/carts', {});
    expect(created.status()).toBe(201);
    const { id: cartId } = await created.json();
    expect(cartId).toBeTruthy();

    const added = await api.post(`/carts/${cartId}`, { product_id: product.id, quantity: 1 });
    expect(added.status()).toBe(200);

    const cart = await (await api.get(`/carts/${cartId}`)).json();
    const line = cart.cart_items.find((item: { product_id: string }) => item.product_id === product.id);
    expect(line?.quantity).toBe(1);
  });
});
