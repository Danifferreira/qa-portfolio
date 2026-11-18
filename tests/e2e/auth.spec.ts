import { test, expect } from '../support/fixtures';

test.describe('Authentication', () => {
  test('@smoke customer logs in through the UI', async ({ page, customer }) => {
    await page.goto('/auth/login');
    await page.getByTestId('email').fill(customer.email);
    await page.getByTestId('password').fill(customer.password);
    await page.getByTestId('login-submit').click();

    await expect(page).toHaveURL(/\/account/);
    await expect(page.getByTestId('nav-menu')).toContainText(customer.first_name);
  });
});
