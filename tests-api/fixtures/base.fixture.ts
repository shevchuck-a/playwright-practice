import { test as base } from '@playwright/test';
import { AccountAPI } from '@api/account'
import '../../globalVars';

type BaseFixture = {
  accountAPI: AccountAPI;
};

export const test = base.extend<BaseFixture>({
  accountAPI: async ({ page }, use) => {
    await use(new AccountAPI(page.request));
  },
});