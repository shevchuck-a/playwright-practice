import { AccountAPI } from "@api/account";
import { APIRequestContext } from "@playwright/test";

export class Cleanup{
  private apiContext: APIRequestContext;

  constructor(apiContext: APIRequestContext){
    this.apiContext = apiContext;
  }
  public async run(){
    if(global.registeredUsersForCleanup.length !== 0){
      const accountAPI = new AccountAPI(this.apiContext);

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
  }
}