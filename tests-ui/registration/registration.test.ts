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
        expect(await homePage.getTitle()).toBe("Automation Exercise");

        await homePage.header.signupLoginClick();
      });

      await test.step('Fill Signup Form', async () =>{
        await loginPage.fillSignupFormAndSubmit(userData.name!, userData.email!);
        expect(await signupPage.getTitle()).toBe("Automation Exercise - Signup");
      });

      await test.step('Fill Account Information', async () =>{
        userData.email = undefined; // Clear email to avoid re-filling
        await signupPage.fillAccountInfoAndSubmit(userData);
        expect(await signupPage.getTitle()).toBe("Automation Exercise - Account Created");
      });

      await test.step('Click Continue for registered user', async () =>{
        await accountCreatedPage.ClickContinue();
        expect(await homePage.getTitle()).toBe("Automation Exercise");
      });

      await test.step('Delete created user', async () =>{
        await homePage.header.deleteAccountClick();
        expect(await accountDeletedPage.getTitle()).toBe("Automation Exercise - Account Created");
        
        await accountDeletedPage.ClickContinue();
        expect(await homePage.getTitle()).toBe("Automation Exercise");
      });
    });
  }
})
