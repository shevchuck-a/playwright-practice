import { expect } from '@playwright/test';
import { test } from './logout.fixture';

test.describe('Logout tests', () => {
  test('Logout for registered user', async ({ homePage, loginPage }) => {
    await test.step('Navigate to Home Page', async () => {
      await homePage.navigate();
      expect(await homePage.getTitle()).toBe("Automation Exercise");
      expect(await homePage.header.logoutLink.isVisible()).toBeTruthy();
      expect(await homePage.header.deleteAccountLink.isVisible()).toBeTruthy();
    });

    await test.step('Click Logout button', async () => {
      await homePage.header.logoutClick();
      expect(await loginPage.getTitle()).toBe("Automation Exercise - Signup / Login");
      expect(await loginPage.loginFormHeader.isVisible()).toBeTruthy();
    });
  });
});