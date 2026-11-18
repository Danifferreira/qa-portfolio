import { test, expect, type APIRequestContext, type APIResponse } from '@playwright/test';
import { ApiClient } from '../support/api-client';

function fakeResponse(status: number): APIResponse {
  return { status: () => status } as unknown as APIResponse;
}

test.describe('API client', () => {
  test('retries once when the API answers 429', async () => {
    const statuses = [429, 200];
    let calls = 0;
    const request = {
      fetch: async () => fakeResponse(statuses[calls++]),
    } as unknown as APIRequestContext;

    const response = await new ApiClient(request, { retryDelayMs: 0 }).get('/products');

    expect(response.status()).toBe(200);
    expect(calls).toBe(2);
  });
});
