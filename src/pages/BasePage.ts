import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  /** Waits for a page-ready signal (e.g. the breadcrumb) with a longer timeout than the
   * global default — several modules (PIM, Leave, Recruitment) only render it once their
   * list-data XHR completes, which routinely exceeds the 5s expect timeout in CI. */
  async waitForReady(locator: Locator, timeout = 15_000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async expectUrlContains(fragment: string) {
    await expect(this.page).toHaveURL(new RegExp(fragment));
  }

  async expectVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  get toastMessage(): Locator {
    return this.page.locator('.oxd-toast');
  }

  get sidebarUserDropdown(): Locator {
    return this.page.locator('.oxd-userdropdown-tab');
  }

  /** "Required"/format validation messages shown under OXD form fields. */
  get fieldValidationMessages(): Locator {
    return this.page.locator('.oxd-input-group__message');
  }
}
