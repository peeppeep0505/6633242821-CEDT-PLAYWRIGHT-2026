import { test, expect } from '../test-data/fixtures/appointment-fixture';

test('EX02 - Verify Make Appointment Form Assertions', async ({ page, appointmentPage }) => {
  
  // 1. Verify display “Make Appointment” in h2
  await expect(page.getByRole('heading', { name: 'Make Appointment' })).toBeVisible();

  // 2. Verify can select all facility combo boxes
  const facilities = ['Tokyo CURA Healthcare Center', 'Hongkong CURA Healthcare Center', 'Seoul CURA Healthcare Center'];
  for (const facility of facilities) {
    await page.locator('#combo_facility').selectOption(facility);
    await expect(page.locator('#combo_facility')).toHaveValue(facility);
  }

  // 3. Verify can select apply for hospital readmission checkbox
  const readmissionCheckbox = page.getByLabel('Apply for hospital readmission');
  await readmissionCheckbox.check();
  await expect(readmissionCheckbox).toBeChecked();

  // 4. Verify can select health care program radio button
  const programs = ['Medicare', 'Medicaid', 'None'];
  for (const program of programs) {
    const radio = page.getByRole('radio', { name: program });
    await radio.check();
    await expect(radio).toBeChecked();
  }

  // 5. Verify can input current date on Visit Date
    const today = "15/02/2026"; 
    const dateInput = page.getByRole('textbox', { name: 'Visit Date (Required)' });

    await dateInput.click();
    await dateInput.pressSequentially(today, { delay: 100 }); 
    await expect(dateInput).toHaveValue(today);

  // 6. Verify can input comment
  const commentInput = page.getByRole('textbox', { name: 'Comment' });
  await commentInput.fill('Test Comment by Playwright');
  await expect(commentInput).toHaveValue('Test Comment by Playwright');

  // 7. Verify book appointment button is displayed and enabled
  const bookBtn = page.getByRole('button', { name: 'Book Appointment' });
  await expect(bookBtn).toBeVisible();
  await expect(bookBtn).toBeEnabled();

  await bookBtn.click();
  await expect(page.getByRole('heading', { name: 'Appointment Confirmation' })).toBeVisible();
});