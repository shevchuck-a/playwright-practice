import { Page } from "@playwright/test";
import { AccountInfo } from "@entities/accountInfo";

export class SignupPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async navigate() {
    await this.page.goto('/signup');
  }
  
  public async fillSignupFormAndSubmit(name: string, email: string) {
    await this.page.getByTestId('signup-name').fill(name);
    await this.page.getByTestId('signup-email').fill(email);
    await this.page.getByTestId('signup-button').click();
  }

  public async fillAccountInfoAndSubmit(accountInfo: AccountInfo, markForDeletion = true) {
    if (accountInfo.title) {
      await this.page.locator(accountInfo.title).check();
    }
    
    if (accountInfo.password) {
      await this.page.getByTestId('password').fill(accountInfo.password);
    }
    
    if (accountInfo.birth_date) {
      await this.page.getByTestId('days').selectOption(accountInfo.birth_date.toString());
    }
    
    if (accountInfo.birth_month) {
      await this.page.getByTestId('months').selectOption(accountInfo.birth_month);
    }
    
    if (accountInfo.birth_year) {
      await this.page.getByTestId('years').selectOption(accountInfo.birth_year.toString());
    }
    
    if (accountInfo.newsletter) {
      await this.page.getByRole('checkbox', { name: 'newsletter' }).check();
    }
    
    if (accountInfo.specialOffers) {
      await this.page.getByRole('checkbox', { name: 'optin' }).check();
    }
    
    if (accountInfo.firstname) {
      await this.page.getByTestId('first_name').fill(accountInfo.firstname);
    }
    
    if (accountInfo.lastname) {
      await this.page.getByTestId('last_name').fill(accountInfo.lastname);
    }
    
    if (accountInfo.company) {
      await this.page.getByTestId('company').fill(accountInfo.company);
    }
    
    if (accountInfo.address1) {
      await this.page.getByTestId('address').fill(accountInfo.address1);
    }
    
    if (accountInfo.address2) {
      await this.page.getByTestId('address2').fill(accountInfo.address2);
    }
    
    if (accountInfo.country) {
      await this.page.getByTestId('country').selectOption(accountInfo.country);
    }
    
    if (accountInfo.state) {
      await this.page.getByTestId('state').fill(accountInfo.state);
    }
    
    if (accountInfo.city) {
      await this.page.getByTestId('city').fill(accountInfo.city);
    }
    
    if (accountInfo.zipcode) {
      await this.page.getByTestId('zipcode').fill(accountInfo.zipcode);
    }
    
    if (accountInfo.mobile_number) {
      await this.page.getByTestId('mobile_number').fill(accountInfo.mobile_number);
    }
    
    await this.page.getByRole('button', { name: 'Create Account' }).click();

    if (markForDeletion) {
      global.registeredUsersForCleanup.push(accountInfo);
    }
  }
}