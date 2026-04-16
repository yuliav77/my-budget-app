import { test, expect, Page } from '@playwright/test';

// 1. Define an interface for our values to keep TypeScript happy
interface DashboardState {
  cost: number;
  remaining: number;
  spent: number;
}

// 2. Helper function to extract and parse the numeric value from a selector
const getVal = async (page: Page, selector: string) => {
  const text = await page.locator(selector).first().textContent();
  const cleanText = text?.replace(/[^0-9.-]/g, '') || '0';
  return parseInt(cleanText, 10);
};

// 3. Helper function to capture the full "state" of the dashboard at once
async function getDashboardState(page: Page): Promise<DashboardState> {

  return {
    cost: await getVal(page, '.cost-value'),
    remaining: await getVal(page, '.remaining-value'),
    spent: await getVal(page, '.spent-value'),
  };
}

test.describe('Dashboard Financial Logic', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  // 4. Test that clicking the plus button updates all values correctly
  test('should update all values correctly on plus click (+10)', async ({ page }) => {
    const initial = await getDashboardState(page);
    
    await page.locator('.btn-success').first().click();
    
    const updated = await getDashboardState(page);

    // Using toEqual with an object gives a much better error diff if the math fails
    expect(updated).toEqual({
      cost: initial.cost + 10,
      remaining: initial.remaining - 10,
      spent: initial.spent + 10
    });
  });

  // 5. Test that clicking the minus button updates all values correctly
  test('should update all values correctly on minus click (-10)', async ({ page }) => {
    const initial = await getDashboardState(page);
    
    await page.locator('.btn-danger').first().click();
    
    const updated = await getDashboardState(page);

    expect(updated).toEqual({
      cost: initial.cost - 10,
      remaining: initial.remaining + 10,
      spent: initial.spent - 10
    });
  });

  // 6. Test that Delete button resets item value to zero and updates the dashboard accordingly
  test('should reset values to zero on delete click', async ({ page }) => {
    const initial = await getDashboardState(page);
    const itemToReset = await getVal(page, '.cost-value'); // Get current cost to know how much to reset

    await page.locator('.delete-label').first().click();

    const updated = await getDashboardState(page);
    expect(updated).toEqual({
      cost: 0,
      remaining: initial.remaining + itemToReset, // Assuming remaining goes back up by the reset amount
      spent: initial.spent - itemToReset // Assuming spent goes back down by the reset amount
    });
  });

  // 7. Test that after choosing Department, Accocation, Amount and clicking Save button all values are updated correctly
  test('should update values correctly after saving new entry', async ({ page }) => {
    const initialState = await getDashboardState(page);
    // Fill out the form
    await page.locator('#inputDepartment').selectOption('Marketing');
    await page.locator('#inputAllocation').selectOption('Add'); 
    await page.locator('#inputAmount').fill('50');
    await page.locator('.save-button').first().click();
    const updatedState = await getDashboardState(page);
      
    expect(updatedState).toEqual({
      cost: initialState.cost + 50,
      remaining: initialState.remaining - 50,
      spent: initialState.spent + 50
    });
  });

  // 8. Test that the values never go negative (if that's a requirement)
  test('should not allow values to go negative', async ({ page }) => {
    // Click minus until we expect it to hit zero
    for (let i = 0; i < 20; i++) {
      await page.locator('.btn-danger').first().click();
    }
    
    const updated = await getDashboardState(page);

    expect(updated.cost).toBeGreaterThanOrEqual(0);
    expect(updated.remaining).toBeGreaterThanOrEqual(0);
    expect(updated.spent).toBeGreaterThanOrEqual(0);
  });

  // 8. Test that the values never exceed a budget limit 
  test('should not allow values to exceed limits', async ({ page }) => {
    // Click plus until we expect it to hit a limit (e.g., 1000)
    for (let i = 0; i < 100; i++) {
      await page.locator('.btn-success').first().click();
    }
    
    const updated = await getDashboardState(page);
    const limit = await page.locator('.cost-limit input').first().inputValue().then(val => parseInt(val, 10)); //get value fron input field inside span class cost-limit
    expect(updated.cost).toBeLessThanOrEqual(limit);
    expect(updated.remaining).toBeGreaterThanOrEqual(0); // Assuming remaining can't be negative
    expect(updated.spent).toBeLessThanOrEqual(limit);
  });


});