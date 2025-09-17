import { test as base } from '@ui-fixtures/baseFixture';
import { LoginPage } from '@pages/login';
import { SignupPage } from '@pages/signup';
import { AccountCreatedPage } from '@pages/accountCreated';
import { AccountDeletedPage } from '@pages/accountDeleted';

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