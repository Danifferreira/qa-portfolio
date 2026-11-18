import { test, expect } from '@playwright/test';
import { ApiClient } from '../support/api-client';
import { newCustomer } from '../support/test-data';

test.describe('Users API', () => {
  test('@smoke customer can register and log in', async ({ request }) => {
    const api = new ApiClient(request);
    const customer = newCustomer();

    const registration = await api.register(customer);
    expect(registration.status()).toBe(201);

    const token = await api.login(customer.email, customer.password);
    expect(token).toBeTruthy();

    const me = await api.get('/users/me', token);
    expect(me.status()).toBe(200);
    expect((await me.json()).email).toBe(customer.email);
  });

  test('wrong password is rejected', async ({ request }) => {
    const api = new ApiClient(request);
    const customer = newCustomer();
    await api.register(customer);

    const response = await api.post('/users/login', {
      email: customer.email,
      password: `${customer.password}x`,
    });
    expect(response.status()).toBe(401);
  });
});
