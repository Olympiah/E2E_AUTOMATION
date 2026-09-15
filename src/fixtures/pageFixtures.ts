import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { NavigationPage } from '../pages/NavigationPage';
import { DashboardPage } from '../pages/DashboardPage';
import { AdminPage } from '../pages/AdminPage';
import { PimPage } from '../pages/PimPage';
import { LeavePage } from '../pages/LeavePage';
import { RecruitmentPage } from '../pages/RecruitmentPage';
import { MyInfoPage } from '../pages/MyInfoPage';

type PageFixtures = {
  loginPage: LoginPage;
  navigationPage: NavigationPage;
  dashboardPage: DashboardPage;
  adminPage: AdminPage;
  pimPage: PimPage;
  leavePage: LeavePage;
  recruitmentPage: RecruitmentPage;
  myInfoPage: MyInfoPage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  navigationPage: async ({ page }, use) => use(new NavigationPage(page)),
  dashboardPage: async ({ page }, use) => use(new DashboardPage(page)),
  adminPage: async ({ page }, use) => use(new AdminPage(page)),
  pimPage: async ({ page }, use) => use(new PimPage(page)),
  leavePage: async ({ page }, use) => use(new LeavePage(page)),
  recruitmentPage: async ({ page }, use) => use(new RecruitmentPage(page)),
  myInfoPage: async ({ page }, use) => use(new MyInfoPage(page)),
});

export { expect } from '@playwright/test';
