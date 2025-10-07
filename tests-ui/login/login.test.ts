import { expect } from '@playwright/test';
import { test } from './login.fixture';
import { randomUUID } from 'crypto';
import { AccountInfo } from '@entities/AccountInfo';
import { AccountTitle } from '@entities/accountTitle';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login tests', () => {
  const newUserData: AccountInfo[] = [
      {
        title: AccountTitle.MR,
        name: `testuser-${randomUUID()}`,
        email: `${randomUUID()}@example.com`,
        password: 'Password123!',
        birth_date: 1,
        birth_month: 'January',
        birth_year: 2000,
        newsletter: true,
        specialOffers: false,
        firstname: 'John',
        lastname: 'Doe',
        company: 'ExampleCorp',
        address1: '123 Main St',
        address2: 'Apt 4B',
        country: 'Canada',
        state: 'Ontario',
        city: 'Toronto',
        zipcode: 'M4B1B3',
        mobile_number: '+1234567890'
      }
    ]

  for (const userData of newUserData) {
    test.beforeEach(async ({ accountAPI }) => {
      const response = await accountAPI.create(userData);
      const responseBody = await response.json();
      expect(responseBody.responseCode).toBe(201);
    });

    test('Login with created user', async ({ homePage, loginPage }) => {
      await test.step('Navigate to Login Page', async () => {
        await homePage.navigate();
        expect(await homePage.getTitle()).toBe("Automation Exercise");
      });

      await test.step('Click Signup/Login button', async () => {
        await homePage.header.signupLoginClick();
        expect(await loginPage.getTitle()).toBe("Automation Exercise - Signup / Login");
        await expect(loginPage.loginFormHeader).toBeVisible();
      });

      await test.step('Login with created user', async () => {
        await loginPage.fillLoginFormAndSubmit(userData.email!, userData.password!);
        expect(await homePage.getTitle()).toBe("Automation Exercise");
      });
    });
  }
});
