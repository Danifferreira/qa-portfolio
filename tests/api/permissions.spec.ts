import { test, expect } from '@playwright/test';
import { ApiClient, pickAnyInStockProduct } from '../support/api-client';
import { newCustomer } from '../support/test-data';

async function customerToken(api: ApiClient): Promise<string> {
  const customer = newCustomer();
  await api.register(customer);
  return api.login(customer.email, customer.password);
}

test.describe('Permissions API', () => {
  test('anonymous user cannot list users', async ({ request }) => {
    const response = await new ApiClient(request).get('/users');
    expect(response.status()).toBe(401);
  });

  test('customer cannot list users', async ({ request }) => {
    const api = new ApiClient(request);
    const response = await api.get('/users', await customerToken(api));
    expect(response.status()).toBe(403);
  });

  test('customer cannot delete a product', async ({ request }) => {
    const api = new ApiClient(request);
    const product = await pickAnyInStockProduct(api);

    const attempt = await api.delete(`/products/${product.id}`, await customerToken(api));
    expect(attempt.status()).toBe(403);

    const stillThere = await api.get(`/products/${product.id}`);
    expect(stillThere.status()).toBe(200);
  });
});
