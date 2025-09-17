import { test as base } from '@ui-fixtures/baseFixture';
import { AccountAPI } from '@api/account'

type AccountActionsFixture = {
  accountAPI: AccountAPI;
};

export const test = base.extend<AccountActionsFixture>({
  accountAPI: async ({ request }, use) => {
    const accountAPI = new AccountAPI(request);
    await use(accountAPI);
  }
});