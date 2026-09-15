import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RecruitmentPage extends BasePage {
  readonly pageHeader: Locator;
  readonly addButton: Locator;
  readonly candidateNameSearchInput: Locator;
  readonly searchButton: Locator;
  readonly candidateTableRows: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeader = page.locator('.oxd-topbar-header-breadcrumb-module');
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.candidateNameSearchInput = page.locator('.oxd-table-filter-area input').first();
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.candidateTableRows = page.locator('.oxd-table-card');
  }

  async open() {
    await this.goto('/web/index.php/recruitment/viewCandidates');
  }

  async searchByCandidateName(name: string) {
    await this.candidateNameSearchInput.fill(name);
    await this.searchButton.click();
  }
}
