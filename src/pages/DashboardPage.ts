import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly pageHeader: Locator;
  readonly widgets: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeader = page.locator('.oxd-topbar-header-breadcrumb-module');
    this.widgets = page.locator('.oxd-grid-item');
  }

  async open() {
    await this.goto('/web/index.php/dashboard/index');
  }
}
