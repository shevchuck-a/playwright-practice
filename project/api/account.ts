import { APIRequestContext } from "playwright-core";
import { AccountInfo } from "@entities/accountInfo";

export class AccountAPI {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  public async create(accountInfo: AccountInfo){
    const response =  await this.request.post('/api/createAccount', {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form:{
        name: accountInfo.username,
        email: accountInfo.email,
        password: accountInfo.password,
        title: accountInfo.title,
        birth_date: accountInfo.dayOfBirth.toString(),
        birth_month: accountInfo.monthOfBirth,
        birth_year: accountInfo.yearOfBirth.toString(),
        firstname: accountInfo.firstName,
        lastname: accountInfo.lastName,
        company: accountInfo.company,
        address1: accountInfo.address1,
        address2: accountInfo.address2,
        country: accountInfo.country,
        state: accountInfo.state,
        city: accountInfo.city,
        zipcode: accountInfo.zipcode,
        mobile_number: accountInfo.mobileNumber
      }
    });

    if(response.status() === 200 && (await response.json()).responseCode === 201){
      globalThis.registeredUsersForCleanup.push(accountInfo);
    }
    return response;
  }

  public async delete(email: string, password: string) {
    return await this.request.post('/api/deleteAccount', {
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
}

