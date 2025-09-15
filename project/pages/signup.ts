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
    // const form = await this.page.locator('.signup-form');
    // await form.getByRole('textbox', { name: 'name' }).fill(name);
    // await form.getByRole('textbox', { name: 'Email Address' }).fill(email);
    // await form.getByRole('button', { name: 'Signup' }).click();
    await this.page.getByTestId('signup-name').fill(name);
    await this.page.getByTestId('signup-email').fill(email);
    await this.page.getByTestId('signup-button').click();
  }

  public async fillAccountInfoAndSubmit(accountInfo: AccountInfo) {
    const title = accountInfo.title;
    // await this.page.getByLabel(title).check();
    // await this.page.getByRole('radio', { name: title }).check();
    await this.page.locator(title).check();
    // await this.page.getByRole('textbox', { name: 'name' }).fill(accountInfo.username);
    await this.page.getByTestId('password').fill(accountInfo.password);
    await this.page.getByTestId('days').selectOption(accountInfo.dayOfBirth.toString());
    await this.page.getByTestId('months').selectOption(accountInfo.monthOfBirth);
    await this.page.getByTestId('years').selectOption(accountInfo.yearOfBirth.toString());
    if (accountInfo.newsletter){
      await this.page.getByRole('checkbox', { name: 'newsletter' }).check();
    }
    if (accountInfo.specialOffers) {
      await this.page.getByRole('checkbox', { name: 'optin' }).check();
    }
    await this.page.getByTestId('first_name').fill(accountInfo.firstName);
    await this.page.getByTestId('last_name').fill(accountInfo.lastName);
    await this.page.getByTestId('company').fill(accountInfo.company);
    await this.page.getByTestId('address').fill(accountInfo.address1);
    await this.page.getByTestId('address2').fill(accountInfo.address2);
    await this.page.getByTestId('country').selectOption(accountInfo.country);
    await this.page.getByTestId('state').fill(accountInfo.state);
    await this.page.getByTestId('city').fill(accountInfo.city);
    await this.page.getByTestId('zipcode').fill(accountInfo.zipcode);
    await this.page.getByTestId('mobile_number').fill(accountInfo.mobileNumber);
    await this.page.getByRole('button', { name: 'Create Account' }).click();
  }
}