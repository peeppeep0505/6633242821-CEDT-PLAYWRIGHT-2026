import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://katalon-demo-cura.herokuapp.com/');
  }

  async clickMakeAppointment() {
    await this.page.getByRole('link', { name: 'Make Appointment' }).click();
  }

  async login(username: string, password: string) {
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async verifyLoginSuccess() {
    await expect(this.page).toHaveURL(/.*#appointment/);
    await expect(
      this.page.getByRole('heading', { name: 'Make Appointment' })
    ).toBeVisible();
  }

  async verifyLoginFailed(message: string) {
    const errorMessage = this.page.getByText(message);
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveClass(/text-danger/);
  }
}