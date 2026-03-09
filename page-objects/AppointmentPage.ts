import { Page, Locator, expect } from "@playwright/test";

export class AppointmentPage {

  private readonly page: Page

  private facilityDropdown: Locator
  private readmissionCheckbox: Locator
  private medicareRadio: Locator
  private medicaidRadio: Locator
  private noneRadio: Locator
  private dateInput: Locator
  private commentInput: Locator
  private bookBtn: Locator

  constructor(page: Page) {

    this.page = page

    this.facilityDropdown = page.getByLabel('Facility')
    this.readmissionCheckbox = page.getByRole('checkbox', { name: 'Apply for hospital readmission' })

    this.medicareRadio = page.getByRole('radio', { name: 'Medicare' })
    this.medicaidRadio = page.getByRole('radio', { name: 'Medicaid' })
    this.noneRadio = page.getByRole('radio', { name: 'None' })

    this.dateInput = page.locator('#txt_visit_date')
    this.commentInput = page.getByLabel('Comment')

    this.bookBtn = page.getByRole('button', { name: 'Book Appointment' })
  }

  async selectFacility(facility: string) {
    await this.facilityDropdown.selectOption(facility)
  }

  async setReadmission(value: boolean) {
    if (value) {
      await this.readmissionCheckbox.check()
    }
  }

  async selectHealthcare(program: string) {

    if (program === "Medicare") await this.medicareRadio.check()
    if (program === "Medicaid") await this.medicaidRadio.check()
    if (program === "None") await this.noneRadio.check()

  }

//   async selectDate(date: string) {

//   await this.dateInput.click()

//   const [day, month, year] = date.split('/')

//   await this.page.getByRole('cell', { name: day }).click()

// }

async selectDate(date: string) {

  const [day, month] = date.split('/')

  const months = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'
  ]

  await this.dateInput.click()

  // ไปหน้าเลือกเดือน
  await this.page.locator('.datepicker-switch').first().click()

  // เลือกเดือน
  await this.page.getByText(months[Number(month) - 1], { exact: true }).click()

  // เลือกวัน
  await this.page.getByRole('cell', { name: day, exact: true }).click()
}

  async fillComment(comment: string) {
    await this.commentInput.fill(comment)
  }

  async fillAppointmentForm(data: any) {

    await this.selectFacility(data.facility)
    await this.setReadmission(data.readmission)
    await this.selectHealthcare(data.program)

    if (data.date) {
        await this.selectDate(data.date)
    }

    await this.fillComment(data.comment)

    }

  async submit() {
    await Promise.all([
      this.page.waitForURL(/appointment/),
      this.bookBtn.click()
    ])
  }


  async verifyAppointment(data: any) {

      const summary = this.page.locator('#summary')

      await expect(summary).toContainText(data.facility)
      await expect(summary).toContainText(data.program)
      await expect(summary).toContainText(data.date)
      await expect(summary).toContainText(data.comment)

    }

    public async expectDateRequired(): Promise<void> {
    await expect(this.dateInput).toHaveAttribute('required')
  }

}