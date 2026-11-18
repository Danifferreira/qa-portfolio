import { test, expect } from '@playwright/test';
import { ApiClient } from '../support/api-client';

test.describe('Catalog API', () => {
  test('@smoke product list returns paginated data', async ({ request }) => {
    const api = new ApiClient(request);
    const response = await api.get('/products?page=1');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    for (const product of body.data) {
      expect(product.id).toBeTruthy();
      expect(product.name).toBeTruthy();
      expect(typeof product.price).toBe('number');
    }
  });
});
