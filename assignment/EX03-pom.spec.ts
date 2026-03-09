import { test, expect } from '../test-data/fixtures/fixture'
import appointmentData from '../test-data/appointment.json'

test.describe('EX03 - POM', () => {

  test('make appointment without date', async ({
    appointmentPage,
    login
  }) => {

    const data = appointmentData.appointments.noDate

    await appointmentPage.fillAppointmentForm(data)

    await appointmentPage.submit()

    await appointmentPage.expectDateRequired()

  })


  test('make appointment with valid data', async ({
    appointmentPage,
    login
  }) => {

    const data = appointmentData.appointments.valid

    await appointmentPage.fillAppointmentForm(data)

    await appointmentPage.submit()

    await appointmentPage.verifyAppointment(data)

  })

})