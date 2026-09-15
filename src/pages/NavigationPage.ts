import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/** Shared left-sidebar navigation, available from any authenticated page. */
export class NavigationPage extends BasePage {
  readonly sidebarMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.sidebarMenu = page.locator('.oxd-sidepanel');
  }

  private menuItem(name: string): Locator {
    return this.page.locator('.oxd-main-menu-item', { hasText: name });
  }

  async goToAdmin() {
    await this.menuItem('Admin').click();
  }

  async goToPIM() {
    await this.menuItem('PIM').click();
  }

  async goToLeave() {
    await this.menuItem('Leave').click();
  }

  async goToRecruitment() {
    await this.menuItem('Recruitment').click();
  }

  async goToMyInfo() {
    await this.menuItem('My Info').click();
  }

  async goToDashboard() {
    await this.menuItem('Dashboard').click();
  }

  async logout() {
    await this.sidebarUserDropdown.click();
    await this.page.getByText('Logout').click();
  }
}
