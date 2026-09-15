import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path: string = '/') {
    await this.page.goto(path);
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
}
