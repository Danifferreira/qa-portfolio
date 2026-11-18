import type { APIRequestContext, APIResponse } from '@playwright/test';
import { API_URL } from '../config';
import type { Customer } from './test-data';

type Method = 'GET' | 'POST' | 'DELETE';

export class ApiClient {
  private readonly retryDelayMs: number;

  constructor(private readonly request: APIRequestContext, options: { retryDelayMs?: number } = {}) {
    this.retryDelayMs = options.retryDelayMs ?? 2_000;
  }

  private async send(method: Method, path: string, body?: unknown, token?: string): Promise<APIResponse> {
    const options = {
      method,
      data: body,
      headers: {
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };
    const response = await this.request.fetch(`${API_URL}${path}`, options);
    if (response.status() !== 429) return response;

    await new Promise((resolve) => setTimeout(resolve, this.waitBeforeRetry(response)));
    return this.request.fetch(`${API_URL}${path}`, options);
  }

  private waitBeforeRetry(response: APIResponse): number {
    const retryAfter = Number(response.headers()['retry-after']);
    return Number.isFinite(retryAfter) && retryAfter >= 0 ? retryAfter * 1_000 : this.retryDelayMs;
  }

  get(path: string, token?: string): Promise<APIResponse> {
    return this.send('GET', path, undefined, token);
  }

  post(path: string, body: unknown, token?: string): Promise<APIResponse> {
    return this.send('POST', path, body, token);
  }

  delete(path: string, token?: string): Promise<APIResponse> {
    return this.send('DELETE', path, undefined, token);
  }

  register(customer: Customer): Promise<APIResponse> {
    return this.post('/users/register', customer);
  }

  async login(email: string, password: string): Promise<string> {
    const response = await this.post('/users/login', { email, password });
    if (response.status() !== 200) {
      throw new Error(`Login failed for ${email}: HTTP ${response.status()}`);
    }
    return (await response.json()).access_token;
  }
}

export async function pickAnyInStockProduct(client: ApiClient): Promise<{ id: string; name: string; price: number }> {
  const response = await client.get('/products?page=1');
  if (response.status() !== 200) {
    throw new Error(`Could not load products: HTTP ${response.status()}`);
  }
  const products: Array<{ id: string; name: string; price: number; in_stock?: boolean }> = (await response.json()).data ?? [];
  if (products.length === 0) {
    throw new Error('The catalog returned no products');
  }
  const product = products.find((item) => item.in_stock !== false) ?? products[0];
  return { id: product.id, name: product.name, price: product.price };
}
