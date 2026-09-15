import { test, expect } from '../src/fixtures/pageFixtures';
import { credentials, loginEdgeCases } from '../src/data/testData';

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

  // Username matching was confirmed case-insensitive by manual inspection — an
  // actual finding about the app, not an assumption, so it's asserted explicitly
  // rather than folded into the edge-case table below (which is for rejections).
  test('login accepts a lowercase username variant @regression', async ({ loginPage, dashboardPage }) => {
    await loginPage.open();
    await loginPage.login(credentials.valid.username.toLowerCase(), credentials.valid.password);

    await expect(dashboardPage.pageHeader).toHaveText('Dashboard');
  });

  for (const { name, username, password, expected } of loginEdgeCases) {
    test(`login edge case: ${name} @regression`, async ({ loginPage, page }) => {
      await loginPage.open();
      await loginPage.login(username, password);

      if (expected === 'invalid-credentials') {
        await expect(loginPage.errorAlert).toHaveText('Invalid credentials');
      } else {
        await expect(page.locator('.oxd-input-group__message')).toHaveCount(2);
      }
    });
  }
});
