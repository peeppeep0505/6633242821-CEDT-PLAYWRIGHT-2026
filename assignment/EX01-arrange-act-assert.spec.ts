import { test, expect } from '@playwright/test';

test('Verify login pass with valid user', async ({ page }) => {
  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('John Doe');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('ThisIsNotAPassword');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/.*#appointment/);
  await expect(page.getByRole('heading', { name: 'Make Appointment' })).toBeVisible();
});


test('Verify login fails with invalid password', async ({ page }) => {
  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('John Doe');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('1234');
  await page.getByRole('button', { name: 'Login' }).click();
  const errorMessage = page.getByText('Login failed! Please ensure');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveClass(/text-danger/);
});

test('Verify login fail with invalid username', async ({ page }) => {
  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('John');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('ThisIsNotAPassword');
  await page.getByRole('button', { name: 'Login' }).click();
  const errorMessage = page.getByText('Login failed! Please ensure');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveClass(/text-danger/);
});
