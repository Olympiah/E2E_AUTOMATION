import { test, expect } from '../src/fixtures/pageFixtures';

test.describe('My Info', () => {
  test.beforeEach(async ({ myInfoPage }) => {
    await myInfoPage.open();
  });

  test('my info page loads personal details @smoke', async ({ myInfoPage }) => {
    await expect(myInfoPage.pageHeader).toHaveText('PIM');
    await expect(myInfoPage.employeeFullNameInput).toBeVisible();
  });

  test('employee full name field is populated @regression', async ({ myInfoPage }) => {
    await expect(myInfoPage.employeeFullNameInput).not.toHaveValue('');
  });
});
