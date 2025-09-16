import { expect } from '@playwright/test';
import { test } from './login.fixture';
import { randomUUID } from 'crypto';
import { AccountInfo } from '@entities/accountInfo';
import { AccountTitle } from '@entities/accountTitle';

test.describe('Login tests', () => {
  const newUserData: AccountInfo[] = [
      {
        title: AccountTitle.MR,
        username: `testuser-${randomUUID()}`,
        email: `${randomUUID()}@example.com`,
        password: 'Password123!',
        dayOfBirth: 1,
        monthOfBirth: 'January',
        yearOfBirth: 2000,
        newsletter: true,
        specialOffers: false,
        firstName: 'John',
        lastName: 'Doe',
        company: 'ExampleCorp',
        address1: '123 Main St',
        address2: 'Apt 4B',
        country: 'Canada',
        state: 'Ontario',
        city: 'Toronto',
        zipcode: 'M4B1B3',
        mobileNumber: '+1234567890'
      }
    ]

  for (const userData of newUserData) {
    test.beforeEach(async ({ accountAPI }) => {
      const response = await accountAPI.create(userData);
      const responseBody = await response.json();
      expect(responseBody.responseCode).toBe(201);
    });

    test('Login with created user', async ({ homePage, loginPage, accountAPI }) => {
      await test.step('Navigate to Login Page', async () => {
        await homePage.navigate();
        await expect(homePage.page).toHaveTitle(/Automation Exercise/);
      });

      await test.step('Click Signup/Login button', async () => {
        await homePage.header.signupLoginClick();
        await expect(loginPage.page.getByText('Login to your account')).toBeVisible();
      });

      await test.step('Login with created user', async () => {
        await loginPage.login(userData.email, userData.password);
        await expect(homePage.page).toHaveTitle(/Automation Exercise/);
      });
    });
  }
});