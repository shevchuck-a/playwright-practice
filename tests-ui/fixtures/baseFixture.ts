import { test as base } from '@playwright/test';
import { HomePage } from '@pages/home';

type BaseFixture = {
  homePage: HomePage;
};

export const test = base.extend<BaseFixture>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});