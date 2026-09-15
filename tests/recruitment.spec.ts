import { test, expect } from '../src/fixtures/pageFixtures';

test.describe('Recruitment', () => {
  test.beforeEach(async ({ recruitmentPage }) => {
    await recruitmentPage.open();
  });

  test('recruitment page loads candidates list @smoke', async ({ recruitmentPage }) => {
    await expect(recruitmentPage.pageHeader).toHaveText('Recruitment');
  });

  test('add candidate button is visible @regression', async ({ recruitmentPage }) => {
    await expect(recruitmentPage.addButton).toBeVisible();
  });

  test('search candidate by name @regression', async ({ recruitmentPage, page }) => {
    await recruitmentPage.searchByCandidateName('a');

    await expect(page.locator('.oxd-table')).toBeVisible();
  });

  test('submitting the add candidate form empty shows required errors @regression', async ({
    recruitmentPage,
  }) => {
    await recruitmentPage.openAddCandidateForm();

    await recruitmentPage.saveButton.click();

    await expect(recruitmentPage.fieldValidationMessages.first()).toBeVisible();
    await expect(recruitmentPage.fieldValidationMessages).toHaveCount(3);
  });
});
