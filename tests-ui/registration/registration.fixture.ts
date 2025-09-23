import { test as base } from '@ui-fixtures/baseFixture';
import { LoginPage } from '@pages/login/LoginPage';
import { SignupPage } from '@pages/singnup/SignupPage';
import { AccountCreatedPage } from '@pages/accountCreated/AccountCreatedPage';
import { AccountDeletedPage } from '@pages/accountDeleted/AccountDeletedPage';

type RegistrationFixture = {
  loginPage: LoginPage;
  signupPage: SignupPage;
  accountCreatedPage: AccountCreatedPage;
  accountDeletedPage: AccountDeletedPage;
};

export const test = base.extend<RegistrationFixture>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  accountCreatedPage: async ({ page }, use) => {
    await use(new AccountCreatedPage(page));
  },
  accountDeletedPage: async ({ page }, use) => {
    await use(new AccountDeletedPage(page));
  },
});