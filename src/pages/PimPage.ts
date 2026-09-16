import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PimPage extends BasePage {
  readonly pageHeader: Locator;
  readonly addButton: Locator;
  readonly employeeNameSearchInput: Locator;
  readonly searchButton: Locator;
  readonly employeeTableRows: Locator;
  readonly deleteConfirmButton: Locator;

  // Add Employee form
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeader = page.locator('.oxd-topbar-header-breadcrumb-module');
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.employeeNameSearchInput = page.getByPlaceholder('Type for hints...').first();
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.employeeTableRows = page.locator('.oxd-table-card');
    this.deleteConfirmButton = page.getByRole('button', { name: 'Yes, Delete' });

    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async open() {
    await this.goto('/web/index.php/pim/viewEmployeeList');
    await this.waitForReady(this.pageHeader);
  }

  async searchByEmployeeName(name: string) {
    await this.employeeNameSearchInput.fill(name);
    await this.employeeNameSearchInput.press('Enter');
    await this.searchButton.click();
  }

  async addEmployee(firstName: string, lastName: string) {
    await this.addButton.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.saveButton.click();
  }

  /** Deletes the first row of the current search results. Used to clean up
   * records created by tests so the shared demo instance doesn't accumulate data. */
  async deleteFirstSearchResult() {
    await this.employeeTableRows.first().locator('button').last().click();
    await this.deleteConfirmButton.click();
  }
}
