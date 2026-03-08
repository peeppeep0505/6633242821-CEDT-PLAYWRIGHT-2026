import { test as base, expect } from '@playwright/test';

// กำหนดประเภทของ Fixtures
type MyFixtures = {
  login: void;
  appointmentPage: AppointmentPageActions;
};

// สร้าง Class สำหรับจัดการ Action ในหน้า Appointment (Internal POM)
class AppointmentPageActions {
  constructor(private page: any) {}

  async selectFacility(value: string) {
    await this.page.locator('#combo_facility').selectOption(value);
  }
}

export const test = base.extend<MyFixtures>({
  // Fixture สำหรับ Login อัตโนมัติก่อนเริ่มเทส
  login: [async ({ page }, use) => {
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    await page.getByRole('link', { name: 'Make Appointment' }).click();
    await page.getByLabel('Username').fill('John Doe');
    await page.getByLabel('Password').fill('ThisIsNotAPassword');
    await page.getByRole('button', { name: 'Login' }).click();
    await use();
  }, { auto: true }], // auto: true ทำให้ไม่ต้องเรียกใน parameter ของ test() ก็ทำงานได้

  appointmentPage: async ({ page }, use) => {
    await use(new AppointmentPageActions(page));
  },
});

export { expect };