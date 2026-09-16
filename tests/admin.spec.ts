import { test, expect } from '../src/fixtures/pageFixtures';

test.describe('Admin', () => {
  test.beforeEach(async ({ adminPage }) => {
    await adminPage.open();
  });

  test('admin page loads system users list @smoke', async ({ adminPage }) => {
    await expect(adminPage.pageHeader).toHaveText('Admin');
    await expect(adminPage.userTable).toBeVisible();
  });

  test('search system user by username @regression', async ({ adminPage }) => {
    await adminPage.searchByUsername('Admin');

    await expect(adminPage.userTableRows.first()).toContainText('Admin');
  });

  test('add user form opens with required fields @regression', async ({ adminPage, page }) => {
    await adminPage.clickAddUser();

    await expect(page.getByText('Add User')).toBeVisible();
    await expect(adminPage.saveButton).toBeVisible();
  });

  test('search with non-existent username shows no records @regression', async ({ adminPage, page }) => {
    await adminPage.searchByUsername('NonExistentUser999');

    // Admin's zero-result search also fires a toast reading the same text, so match
    // only the table's empty-state <span> (the toast renders a <p>) to avoid a strict-mode
    // violation from two visible matches.
    await expect(page.locator('span.oxd-text', { hasText: 'No Records Found' })).toBeVisible();
  });
});
