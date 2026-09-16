import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LeavePage extends BasePage {
  readonly pageHeader: Locator;
  readonly applyTab: Locator;
  readonly leaveTypeSelect: Locator;
  readonly fromDateInput: Locator;
  readonly toDateInput: Locator;
  readonly applyButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeader = page.locator('.oxd-topbar-header-breadcrumb-module');
    this.applyTab = page.getByText('Apply', { exact: true });
    this.leaveTypeSelect = page.locator('.oxd-select-text').first();
    this.fromDateInput = page.locator('.oxd-date-input input').first();
    this.toDateInput = page.locator('.oxd-date-input input').nth(1);
    this.applyButton = page.getByRole('button', { name: 'Apply' });
  }

  async open() {
    await this.goto('/web/index.php/leave/viewLeaveModule');
    await this.waitForReady(this.pageHeader);
  }

  async goToApply() {
    await this.applyTab.click();
  }
}
