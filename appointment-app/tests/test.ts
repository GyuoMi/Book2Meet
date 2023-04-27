import { expect, test } from '@playwright/test';


test('homepage expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Ready to Book an Appointment?' })).toBeVisible();
});
