import { AppointmentPage } from "../../page-objects/AppointmentPage";
import { IndexPage } from "../../page-objects/IndexPage";
import { LoginPage } from "../../page-objects/LoginPage";
import { test as base } from "@playwright/test";

type MyFixtures = {
  indexPage: IndexPage
  loginPage: LoginPage
  appointmentPage: AppointmentPage
  login: void
}

export const test = base.extend<MyFixtures>({

  indexPage: async ({ page }, use) => {
    await use(new IndexPage(page))
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },

  appointmentPage: async ({ page }, use) => {
    await use(new AppointmentPage(page))
  },

  login: async ({ page, indexPage, loginPage }, use) => {

    await page.goto(process.env.URL!)
    await indexPage.clickMakeAppointment()
    await loginPage.inputLoginForm(
      'John Doe',
      'ThisIsNotAPassword'
    )
    await use()

  }

})

export { expect } from '@playwright/test'