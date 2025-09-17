import { expect } from '@playwright/test';
import { test } from './registration.fixture';
import { randomUUID } from 'crypto';
import { AccountTitle } from "@entities/accountTitle";
import { AccountInfo } from '@entities/accountInfo';


test.describe('Registration cases', () =>{
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
    test('Register new User', async ({
      homePage,
      loginPage,
      signupPage,
      accountCreatedPage,
      accountDeletedPage
    }) =>{
      await test.step('Navigate to Signup Page', async () => {
        await homePage.navigate();
        await expect(homePage.page).toHaveTitle(/Automation Exercise/);

        await homePage.header.signupLoginClick();
        await expect(loginPage.page.getByText('New User Signup!')).toBeVisible();
      });

      await test.step('Fill Signup Form', async () =>{
        await signupPage.fillSignupFormAndSubmit(userData.name, userData.email);
        await expect(signupPage.page.getByText('ENTER ACCOUNT INFORMATION')).toBeVisible();
      });

      await test.step('Fill Account Information', async () =>{
        await signupPage.fillAccountInfoAndSubmit(userData);
        await expect(signupPage.page.getByText('ACCOUNT CREATED!')).toBeVisible();
      });

      await test.step('Click Continue for registered user', async () =>{
        await accountCreatedPage.ClickContinue();
        await expect(homePage.page).toHaveTitle(/Automation Exercise/);
      });

      await test.step('Delete created user', async () =>{
        await homePage.header.deleteAccountClick();
        await expect(accountDeletedPage.page.getByText('ACCOUNT DELETED!')).toBeVisible();
        
        await accountDeletedPage.ClickContinue();
        await expect(homePage.page).toHaveTitle(/Automation Exercise/);
      });
    });
  }
})
