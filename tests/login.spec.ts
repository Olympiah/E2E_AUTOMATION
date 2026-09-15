import { test, expect } from '../src/fixtures/pageFixtures';
import { credentials } from '../src/data/testData';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
  test('valid credentials redirect to dashboard @smoke', async ({ loginPage, dashboardPage }) => {
    await loginPage.open();
    await loginPage.login(credentials.valid.username, credentials.valid.password);

    await expect(dashboardPage.pageHeader).toHaveText('Dashboard');
    await loginPage.expectUrlContains('dashboard');
  });

  test('invalid credentials show error message @regression', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(credentials.invalid.username, credentials.invalid.password);

    await expect(loginPage.errorAlert).toHaveText('Invalid credentials');
  });

  test('empty fields show required validation @regression', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.loginButton.click();

    await expect(page.locator('.oxd-input-group__message')).toHaveCount(2);
  });

  test('forgot password link navigates to reset page @regression', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.forgotPasswordLink.click();

    await loginPage.expectUrlContains('requestPasswordResetCode');
  });
});
