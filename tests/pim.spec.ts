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

    await expect(page).toHaveURL(/viewPersonalDetails/);
    await expect(page.locator('input.orangehrm-firstname')).toHaveValue(firstName);
  });

  test('search employee by name @regression', async ({ pimPage }) => {
    await pimPage.searchByEmployeeName('a');

    await expect(pimPage.employeeTableRows.first()).toBeVisible();
  });
});
