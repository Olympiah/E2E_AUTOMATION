import { test, expect } from '../src/fixtures/pageFixtures';

test.describe('Leave', () => {
  test.beforeEach(async ({ leavePage }) => {
    await leavePage.open();
  });

  test('leave module loads @smoke', async ({ leavePage }) => {
    await expect(leavePage.pageHeader).toHaveText('Leave');
  });

  test('apply leave tab shows leave type and date fields @regression', async ({ leavePage }) => {
    await leavePage.goToApply();

    await expect(leavePage.leaveTypeSelect).toBeVisible();
    await expect(leavePage.fromDateInput).toBeVisible();
    await expect(leavePage.toDateInput).toBeVisible();
  });
});
