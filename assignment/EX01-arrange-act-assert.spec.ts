import { test, expect } from '../test-data/fixtures/fixture'
import loginData from '../test-data/login.json'

test.describe('EX01 - Arrange, Act, Assert', () => {

  test('Verify login pass with valid user', async ({ loginPage }) => {

    const data = loginData.validUser

    await loginPage.goto()
    await loginPage.clickMakeAppointment()
    await loginPage.inputLoginForm(data.username, data.password)

    await loginPage.verifyLoginSuccess()

  })


  test('Verify login fails with invalid password', async ({ loginPage }) => {

    const data = loginData.invalidPassword

    await loginPage.goto()
    await loginPage.clickMakeAppointment()
    await loginPage.inputLoginForm(data.username, data.password)

    await loginPage.verifyLoginFailed()

  })


  test('Verify login fail with invalid username', async ({ loginPage }) => {

    const data = loginData.invalidUsername

    await loginPage.goto()
    await loginPage.clickMakeAppointment()
    await loginPage.inputLoginForm(data.username, data.password)

    await loginPage.verifyLoginFailed()

  })

})