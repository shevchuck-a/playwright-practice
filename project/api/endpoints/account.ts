import { APIRequestContext } from "playwright-core";
import { AccountInfo } from "@entities/accountInfo";
import { ApiResponseBody } from "@api/types/ApiResponseBody";

export class AccountAPI {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  public async create(accountInfo: AccountInfo){

    const body = this.getFormData(accountInfo);
    const response =  await this.request.post('/api/createAccount', {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: body
    });

    if(response.status() === 200 && (await response.json() as ApiResponseBody<{message: string}>).responseCode === 201){
      globalThis.registeredUsersForCleanup.push(accountInfo);
    }
    return response;
  }

  public async update(accountInfo: AccountInfo){
    const body = this.getFormData(accountInfo);
    return await this.request.put('/api/updateAccount', {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: body
    });
  };

  public async delete(email: string, password: string) {
    return await this.request.delete('/api/deleteAccount', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        email: email,
        password: password
      }
    });
  }

  public async get(email: string){
    return await this.request.get('/api/getUserDetailByEmail', {
      params: {
        email: email
      }
    });
  }

  private getFormData(accountInfo: AccountInfo){
    const array = Object.entries(accountInfo);
    const body = new FormData();
    for(const [key, value] of array){
      if(value !== undefined && value !== null){
        body.append(key, value.toString());
      }
    }
    return body;
  }
}



