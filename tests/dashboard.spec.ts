import { test, expect } from '../src/fixtures/pageFixtures';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.open();
  });

  test('dashboard loads with expected widgets @smoke', async ({ dashboardPage }) => {
    await expect(dashboardPage.pageHeader).toHaveText('Dashboard');
    await expect(dashboardPage.widgets.first()).toBeVisible();
  });

  test('sidebar navigation is visible @smoke', async ({ navigationPage }) => {
    await expect(navigationPage.sidebarMenu).toBeVisible();
  });

  test('user can log out from dashboard @regression', async ({ navigationPage, loginPage }) => {
    await navigationPage.logout();
    await loginPage.expectUrlContains('login');
  });
});
