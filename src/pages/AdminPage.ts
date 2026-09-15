import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminPage extends BasePage {
  readonly pageHeader: Locator;
  readonly addButton: Locator;
  readonly searchUsernameInput: Locator;
  readonly searchButton: Locator;
  readonly userTable: Locator;
  readonly userTableRows: Locator;

  // Add User form
  readonly userRoleSelect: Locator;
  readonly employeeNameInput: Locator;
  readonly statusSelect: Locator;
  readonly formUsernameInput: Locator;
  readonly formPasswordInput: Locator;
  readonly formConfirmPasswordInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeader = page.locator('.oxd-topbar-header-breadcrumb-module');
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.searchUsernameInput = page.locator('.oxd-table-filter-area input').first();
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.userTable = page.locator('.oxd-table');
    this.userTableRows = page.locator('.oxd-table-card');

    this.userRoleSelect = page.locator('.oxd-select-text').first();
    this.employeeNameInput = page.getByPlaceholder('Type for hint search');
    this.statusSelect = page.locator('.oxd-select-text').nth(1);
    this.formUsernameInput = page.locator('.oxd-input').nth(2);
    this.formPasswordInput = page.locator('input[type="password"]').first();
    this.formConfirmPasswordInput = page.locator('input[type="password"]').nth(1);
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async open() {
    await this.goto('/web/index.php/admin/viewSystemUsers');
  }

  async searchByUsername(username: string) {
    await this.searchUsernameInput.fill(username);
    await this.searchButton.click();
  }

  async clickAddUser() {
    await this.addButton.click();
  }
}
