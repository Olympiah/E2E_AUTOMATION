import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyInfoPage extends BasePage {
  readonly pageHeader: Locator;
  readonly employeeFullNameInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeader = page.locator('.oxd-topbar-header-breadcrumb-module');
    this.employeeFullNameInput = page.locator('input.orangehrm-firstname');
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async open() {
    await this.goto('/web/index.php/pim/viewMyDetails');
    await this.waitForReady(this.pageHeader);
  }
}
