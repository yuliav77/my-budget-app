import { test, expect, Page } from '@playwright/test';

interface DashboardCurrency {
  budgetSymbol: string;
  remainingSymbol: string;
  spentSymbol: string;
}

const getCurrencySymbols = async (page: Page): Promise<DashboardCurrency> => {
  const budgetText = await page.locator('.cost-limit').first().textContent();
  const remainingText = await page.locator('.remaining-value').first().textContent();
  const spentText = await page.locator('.spent-value').first().textContent();

  return {
    budgetSymbol: budgetText?.match(/[£€$₹]/)?.[0] || '',
    remainingSymbol: remainingText?.match(/[£€$₹]/)?.[0] || '',
    spentSymbol: spentText?.match(/[£€$₹]/)?.[0] || '',
  };
};

test.describe('Currency Selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should display default currency (£ Pound)', async ({ page }) => {
    const symbols = await getCurrencySymbols(page);
    expect(symbols.budgetSymbol).toBe('£');
    expect(symbols.remainingSymbol).toBe('£');
    expect(symbols.spentSymbol).toBe('£');
  });

  test('should update all currency symbols when switching to Dollar', async ({ page }) => {
    // Select Dollar from currency dropdown
    await page.locator('#currency-selector').click();
    await page.locator('text=$ Dollar').click();

    const symbols = await getCurrencySymbols(page);
    expect(symbols.budgetSymbol).toBe('$');
    expect(symbols.remainingSymbol).toBe('$');
    expect(symbols.spentSymbol).toBe('$');
  });

  test('should update all currency symbols when switching to Euro', async ({ page }) => {
    await page.locator('#currency-selector').click();
    await page.locator('text=€ Euro').click();

    const symbols = await getCurrencySymbols(page);
    expect(symbols.budgetSymbol).toBe('€');
    expect(symbols.remainingSymbol).toBe('€');
    expect(symbols.spentSymbol).toBe('€');
  });

  test('should update all currency symbols when switching to Rupee', async ({ page }) => {
    await page.locator('#currency-selector').click();
    await page.locator('text=₹ Rupee').click();

    const symbols = await getCurrencySymbols(page);
    expect(symbols.budgetSymbol).toBe('₹');
    expect(symbols.remainingSymbol).toBe('₹');
    expect(symbols.spentSymbol).toBe('₹');
  });

  test('should persist currency selection after form submission', async ({ page }) => {
    // Change currency to Euro
    await page.locator('#currency-selector').click();
    await page.locator('text=€ Euro').click();

    // Submit a form entry
    await page.locator('#inputDepartment').selectOption('Marketing');
    await page.locator('#inputAllocation').selectOption('Add');
    await page.locator('#inputAmount').fill('100');
    await page.locator('.save-button').click();

    // Verify currency is still Euro
    const symbols = await getCurrencySymbols(page);
    expect(symbols.budgetSymbol).toBe('€');
    expect(symbols.remainingSymbol).toBe('€');
    expect(symbols.spentSymbol).toBe('€');
  });
});