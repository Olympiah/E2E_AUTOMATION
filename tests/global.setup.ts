import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import { credentials } from '../src/data/testData';

const authFile = 'playwright/.auth/user.json';

setup('authenticate as Admin', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.open();
  await loginPage.login(credentials.valid.username, credentials.valid.password);
  await expect(dashboardPage.pageHeader).toHaveText('Dashboard');

  await page.context().storageState({ path: authFile });
});
