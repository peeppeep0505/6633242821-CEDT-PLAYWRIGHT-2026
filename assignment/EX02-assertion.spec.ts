import { test, expect } from '../test-data/fixtures/fixture';
import appointmentData from '../test-data/appointment.json'

  test('EX02 - Verify Make Appointment Form Assertions', async ({
    appointmentPage,
    login
  }) => {

    const data = appointmentData.appointments.valid

    await appointmentPage.fillAppointmentForm(data)

    await appointmentPage.submit()

    await appointmentPage.verifyAppointment(data)

  })