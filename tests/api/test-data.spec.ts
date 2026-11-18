import { test, expect } from '@playwright/test';
import { newCustomer } from '../support/test-data';

test.describe('Test data', () => {
  test('two generated customers never share an email', () => {
    const first = newCustomer();
    const second = newCustomer();
    expect(first.email).not.toBe(second.email);
  });

  test('generated password follows the API password rule', () => {
    expect(newCustomer().password).toMatch(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w]).{8,}/);
  });
});
