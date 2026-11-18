import { test, expect, type APIRequestContext, type APIResponse } from '@playwright/test';
import { ApiClient, pickAnyInStockProduct } from '../support/api-client';

function fakeResponse(status: number, headers: Record<string, string> = {}, body: unknown = {}): APIResponse {
  return {
    status: () => status,
    headers: () => headers,
    json: async () => body,
  } as unknown as APIResponse;
}

function fakeRequest(responses: APIResponse[]): { request: APIRequestContext; calls: () => number } {
  let calls = 0;
  const request = { fetch: async () => responses[Math.min(calls++, responses.length - 1)] } as unknown as APIRequestContext;
  return { request, calls: () => calls };
}

test.describe('API client', () => {
  test('retries once when the API answers 429', async () => {
    const { request, calls } = fakeRequest([fakeResponse(429), fakeResponse(200)]);

    const response = await new ApiClient(request, { retryDelayMs: 0 }).get('/products');

    expect(response.status()).toBe(200);
    expect(calls()).toBe(2);
  });

  test('waits the time the API asks for in Retry-After', async () => {
    const { request } = fakeRequest([fakeResponse(429, { 'retry-after': '0' }), fakeResponse(200)]);
    const started = Date.now();

    await new ApiClient(request, { retryDelayMs: 5_000 }).get('/products');

    expect(Date.now() - started).toBeLessThan(1_000);
  });

  test('product picker explains a failed catalog request', async () => {
    const { request } = fakeRequest([fakeResponse(500)]);

    await expect(pickAnyInStockProduct(new ApiClient(request, { retryDelayMs: 0 }))).rejects.toThrow(
      'Could not load products: HTTP 500',
    );
  });

  test('product picker explains an empty catalog', async () => {
    const { request } = fakeRequest([fakeResponse(200, {}, { data: [] })]);

    await expect(pickAnyInStockProduct(new ApiClient(request, { retryDelayMs: 0 }))).rejects.toThrow(
      'The catalog returned no products',
    );
  });
});
