import { test as base, expect } from '@playwright/test';
import { ApiClient } from './api-client';
import { newCustomer, type Customer } from './test-data';

export const test = base.extend<{ customer: Customer }>({
  customer: async ({ request }, use) => {
    const customer = newCustomer();
    const response = await new ApiClient(request).register(customer);
    if (response.status() !== 201) {
      throw new Error(`Could not register test customer: HTTP ${response.status()}`);
    }
    await use(customer);
  },
});

export { expect };
