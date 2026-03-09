import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {
  private readonly page: Page
  private readonly usernameText: Locator
  private readonly passwordText: Locator
  private readonly loginBtn: Locator
  private readonly alertMsg: Locator
  private readonly makeAppointmentBtn: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameText = page.locator('#txt-username')
    this.passwordText = page.locator('#txt-password')
    this.loginBtn = page.locator('#btn-login')
    this.alertMsg = page.locator('p.lead.text-danger')
    this.makeAppointmentBtn = page.locator('#btn-make-appointment')
  }

  public async goto(): Promise<void> {
    await this.page.goto(process.env.URL!)
  }

  public async inputLoginForm(username: string, password: string): Promise<void> {
    await this.usernameText.fill(username)
    await this.passwordText.fill(password)
    await this.loginBtn.click()
  }

  get alertTxt(): Locator {
    return this.alertMsg
  }

  public async verifyLoginSuccess(): Promise<void> {
    await expect(this.page).toHaveURL(/.*#appointment/)
    await expect(this.page.locator('h2')).toHaveText('Make Appointment')
  }

  public async verifyLoginFailed(): Promise<void> {
    await expect(this.alertMsg).toBeVisible()
    await expect(this.alertMsg).toHaveClass(/text-danger/)
  }

  
  public async clickMakeAppointment(): Promise<void> {
  await this.makeAppointmentBtn.click()
}
  
}