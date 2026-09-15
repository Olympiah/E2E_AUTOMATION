import { test, expect } from '../src/fixtures/pageFixtures';
import { uniqueName } from '../src/data/testData';

test.describe('PIM', () => {
  test.beforeEach(async ({ pimPage }) => {
    await pimPage.open();
  });

  test('PIM page loads employee list @smoke', async ({ pimPage }) => {
    await expect(pimPage.pageHeader).toHaveText('PIM');
    await expect(pimPage.employeeTableRows.first()).toBeVisible();
  });

  test('add new employee @regression', async ({ pimPage, page }) => {
    const firstName = uniqueName('First');
    const lastName = uniqueName('Last');

    await pimPage.addEmployee(firstName, lastName);

    // Save-and-redirect can be slow on the shared demo instance, so give this
    // one more room than the global expect timeout instead of relying on a
    // full test retry.
    await expect(page).toHaveURL(/viewPersonalDetails/, { timeout: 15_000 });
    await expect(page.locator('input.orangehrm-firstname')).toHaveValue(firstName);

    // Clean up so the shared demo instance doesn't accumulate test data.
    await pimPage.open();
    await pimPage.searchByEmployeeName(firstName);
    await pimPage.deleteFirstSearchResult();
    await expect(pimPage.toastMessage).toContainText('Successfully Deleted');
  });

  test('search employee by name @regression', async ({ pimPage }) => {
    await pimPage.searchByEmployeeName('a');

    await expect(pimPage.employeeTableRows.first()).toBeVisible();
  });

  test('search for a non-existent employee returns no rows @regression', async ({ pimPage }) => {
    await pimPage.searchByEmployeeName('zzzznonexistentemployee');

    await expect(pimPage.employeeTableRows).toHaveCount(0);
  });
});
