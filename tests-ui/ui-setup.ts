import { test as setup, expect, Page } from '@playwright/test';
import path from 'path';
import { randomUUID } from 'crypto';
import { AccountInfo } from '@entities/AccountInfo';
import { LoginPage } from '@pages/login/LoginPage';
import { SignupPage } from '@pages/singnup/SignupPage';

const chromiumAuthFile = path.join(__dirname, '../playwright/.auth/chromium-user.json');

setup('authenticate for Chromium', async ({ page }) => {
  const userData: AccountInfo = {
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

  await authenticateUser(page, userData);

  await page.context().storageState({ path: chromiumAuthFile });
});

const firefoxAuthFile = path.join(__dirname, '../playwright/.auth/firefox-user.json');

setup('authenticate for Firefox', async ({ page }) => {
  const userData: AccountInfo = {
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

  await authenticateUser(page, userData);

  await page.context().storageState({ path: firefoxAuthFile });
});

async function authenticateUser(page: Page, userData: AccountInfo) {
  const loginPage = new LoginPage(page);
  const signupPage = new SignupPage(page);

  await loginPage.navigate();
  expect(await loginPage.getTitle()).toBe("Automation Exercise - Signup / Login");
  await expect(loginPage.signupFormHeader).toBeVisible();

  await loginPage.fillSignupFormAndSubmit(userData.name!, userData.email!);
  expect(await signupPage.getTitle()).toBe("Automation Exercise - Signup");

  userData.email = undefined; // Clear email to avoid re-filling
  await signupPage.fillAccountInfoAndSubmit(userData);
  expect(await signupPage.getTitle()).toBe("Automation Exercise - Account Created");

  globalThis.registeredUsersForCleanup.push(userData);
}