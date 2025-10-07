import { expect } from '@playwright/test';
import { test } from './registration.fixture';
import { randomUUID } from 'crypto';
import { AccountTitle } from "@entities/accountTitle";
import { AccountInfo } from '@entities/AccountInfo';
import { ApiResponseBody } from '@api/types/ApiResponseBody';


test.describe('Registration cases', () =>{
  const registerUsersData: AccountInfo[] = [
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
  ];

  for (const userData of registerUsersData) {
    test('Register new User', async ({
      homePage,
      loginPage,
      signupPage,
      accountCreatedPage,
      accountDeletedPage,
      accountAPI
    }) =>{
      const createdUserEmail = userData.email;

      await test.step('Navigate to Signup Page', async () => {
        await homePage.navigate();
        expect(await homePage.getTitle()).toBe("Automation Exercise");
      });

      await test.step('Click Signup/Login button', async () => {
        await homePage.header.signupLoginClick();
        expect(await loginPage.getTitle()).toBe("Automation Exercise - Signup / Login");
        await expect(loginPage.signupFormHeader).toBeVisible();
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
        await accountCreatedPage.clickContinue();
        expect(await homePage.getTitle()).toBe("Automation Exercise");
      });

      await test.step('Check via API that user created', async() =>{
        await expect(async () => {
          const response = await accountAPI.get(createdUserEmail!);
          expect(response.status()).toBe(200);
          const responseBody = await response.json();
          expect(responseBody.responseCode).toBe(200);
        }).toPass();
      });

      await test.step('Delete created user', async () =>{
        await homePage.header.deleteAccountClick();
        expect(await accountDeletedPage.getTitle()).toBe("Automation Exercise - Account Created");
        
        await accountDeletedPage.clickContinue();
        expect(await homePage.getTitle()).toBe("Automation Exercise");
      });
    });


    const existUserData: AccountInfo = {
      name: `testuser-${randomUUID()}`,
      email: `${randomUUID()}@example.com`,
      password: 'Password123!',
      firstname: 'John',
      lastname: 'Doe',
      address1: '123 Main St',
      country: 'Canada',
      state: 'Ontario',
      city: 'Toronto',
      zipcode: 'M4B1B3',
      mobile_number: '+1234567890'
    };
    test('Try to register exist user',  async ({
      loginPage,
      accountAPI
    }) =>{
      await test.step('Precondition - register user via API', async () =>{
        const registerUserApi = await accountAPI.create(existUserData);
        const registerUserApiBody = await registerUserApi.json() as ApiResponseBody<{message: string}>;
        expect(registerUserApiBody.responseCode).toBe(201);
      });

      await test.step('Navigate to Login/Signup Page', async () => {
        await loginPage.navigate();
        expect(await loginPage.getTitle()).toBe("Automation Exercise - Signup / Login");
      });

      await test.step('Fill Signup Form with exist user data', async () =>{
        await loginPage.fillSignupFormAndSubmit(existUserData.name!, existUserData.email!);
        await expect(loginPage.emailAlreadyExistError).toBeVisible();
      });
    });
  }
})
