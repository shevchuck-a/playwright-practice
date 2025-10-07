import { test as base } from '@ui-fixtures/baseFixture';
import { LoginPage } from '@pages/login/LoginPage';
import { AccountAPI } from '@api/endpoints/account'


type LoginFixture = {
  loginPage: LoginPage;
  accountAPI: AccountAPI;
};

export const test = base.extend<LoginFixture>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  accountAPI: async ({ page }, use) => {
    await use(new AccountAPI(page.request));
  },
});