import { type Page, type Locator } from '@playwright/test';

export class IndexPage {
    private readonly page : Page
    private makeAppointmentLink : Locator
    constructor (page: Page) {
        this.page = page;
        this.makeAppointmentLink = page.getByRole('link', { name: 'Make Appointment' });
    }

    async clickMakeAppointment():Promise<void> {
        await this.makeAppointmentLink.click();
    }
}