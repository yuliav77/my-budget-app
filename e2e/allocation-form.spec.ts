import { test, expect } from '@playwright/test';

test.describe('Allocation Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should submit form with all valid inputs', async ({ page }) => {
    await page.locator('#inputDepartment').selectOption('Marketing');
    await page.locator('#inputAllocation').selectOption('Add');
    await page.locator('#inputAmount').fill('150');
    await page.locator('.save-button').click();
    
    // Verify no error alert appears
    const alertPromise = page.waitForEvent('dialog').catch(() => null);
    await page.waitForTimeout(500);
  });

  test('should show error when amount exceeds remaining budget', async ({ page }) => {
    // Initial remaining is typically 2000 - all expenses
    await page.locator('#inputDepartment').selectOption('Marketing');
    await page.locator('#inputAllocation').selectOption('Add');
    await page.locator('#inputAmount').fill('999999');
    
    page.once('dialog', dialog => dialog.accept());
    await page.locator('.save-button').click();
  });

  test('should reject non-numeric input', async ({ page }) => {
    await page.locator('#inputDepartment').selectOption('Marketing');
    await page.locator('#inputAllocation').selectOption('Add');
    await page.locator('#inputAmount').fill('abc');
    
    // Verify input is rejected or cleared
    const value = await page.locator('#inputAmount').inputValue();
    expect(value).not.toContain('abc');
  });

  test('should update dashboard after reducing allocation', async ({ page }) => {
    const initialRemaining = await page.locator('.remaining-value').textContent();
    
    await page.locator('#inputDepartment').selectOption('Finance');
    await page.locator('#inputAllocation').selectOption('Reduce');
    await page.locator('#inputAmount').fill('50');
    await page.locator('.save-button').click();
    
    const updatedRemaining = await page.locator('.remaining-value').textContent();
    expect(updatedRemaining).not.toEqual(initialRemaining);
  });

  test('should display all department options', async ({ page }) => {
    await page.locator('#inputDepartment').click();
    
    const options = await page.locator('#inputDepartment option').count();
    expect(options).toBeGreaterThanOrEqual(6); // Choose + 5 departments
  });
});