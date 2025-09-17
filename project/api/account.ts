import { APIRequestContext } from "playwright-core";
import { AccountInfo } from "@entities/accountInfo";

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

    if(response.status() === 200 && (await response.json()).responseCode === 201){
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
    const body = new FormData();
    if(accountInfo.name){
      body.append('name', accountInfo.name);
    }
    if(accountInfo.email){
      body.append('email', accountInfo.email);
    }
    if(accountInfo.password){
      body.append('password', accountInfo.password);
    }
    if(accountInfo.title){
      body.append('title', accountInfo.title);
    }
    if(accountInfo.birth_date){
      body.append('birth_date', accountInfo.birth_date.toString());
    }
    if(accountInfo.birth_month){
      body.append('birth_month', accountInfo.birth_month);
    }
    if(accountInfo.birth_year){
      body.append('birth_year', accountInfo.birth_year.toString());
    }
    if(accountInfo.firstname){
      body.append('firstname', accountInfo.firstname);
    }
    if(accountInfo.lastname){
      body.append('lastname', accountInfo.lastname);
    }
    if(accountInfo.company){
      body.append('company', accountInfo.company);
    }
    if(accountInfo.address1){
      body.append('address1', accountInfo.address1);
    }
    if(accountInfo.address2){
      body.append('address2', accountInfo.address2);
    }
    if(accountInfo.country){
      body.append('country', accountInfo.country);
    }
    if(accountInfo.state){
      body.append('state', accountInfo.state);
    }
    if(accountInfo.city){
      body.append('city', accountInfo.city);
    }
    if(accountInfo.zipcode){
      body.append('zipcode', accountInfo.zipcode);
    }
    if(accountInfo.mobile_number){
      body.append('mobile_number', accountInfo.mobile_number);
    }

    return body;
  }
}

