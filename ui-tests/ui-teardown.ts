import { test as teardown } from '@playwright/test';
import { AccountAPI } from "@api/account";
import '../globalVars';

teardown('cleanup created accounts', async ({ page }) => {
  console.log('Running UI teardown to delete created accounts');
  if(globalThis.registeredUsersForCleanup.length !== 0){
    const accountAPI = new AccountAPI(page.request);

    const deletePromises = globalThis.registeredUsersForCleanup.map(async (user) => {
      const getResponse = await accountAPI.get(user.email);
      const userData = await getResponse.json();
      if(userData.responseCode === 200){
        await accountAPI.delete(user.email, user.password);
      }
    });

    await Promise.all(deletePromises);
    
    globalThis.registeredUsersForCleanup = [];
  }
});