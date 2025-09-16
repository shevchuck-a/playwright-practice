import { test as base } from '@playwright/test';
import { HomePage } from '@pages/home';
import { Cleanup } from '@helpers/cleanup';
import '../../globalVars';

type BaseFixture = {
  homePage: HomePage;
};

export const test = base.extend<BaseFixture>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  page: async ({ page }, use, testInfo) => {
    await use(page);

    await new Cleanup(page.request).run();
  },
});