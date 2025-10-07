import { test as base } from '@ui-fixtures/baseFixture';
import { LoginPage } from '@pages/login/LoginPage';


type LogoutFixture = {
  loginPage: LoginPage;
};

export const test = base.extend<LogoutFixture>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});