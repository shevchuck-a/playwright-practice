import { BasePage } from "@pages/BasePage";
import { Page } from "@playwright/test";

export class SignupLocators extends BasePage {
  constructor(page: Page, path: string) {
    super(page, path);
  }

  public titleRadio(title: string) {
    return this.page.locator(title);
  }

  public get nameInput() {
    return this.page.getByTestId('name');
  }

  public get emailInput() {
    return this.page.getByTestId('email');
  }

  public get passwordInput() {
    return this.page.getByTestId('password');
  }

  public get daysSelect() {
    return this.page.getByTestId('days');
  }

  public get monthsSelect() {
    return this.page.getByTestId('months');
  }

  public get yearsSelect() {
    return this.page.getByTestId('years');
  }

  public get newsletterCheckbox() {
    return this.page.getByRole('checkbox', { name: 'newsletter' });
  }

  public get specialOffersCheckbox() {
    return this.page.getByRole('checkbox', { name: 'optin' });
  }

  public get firstNameInput() {
    return this.page.getByTestId('first_name');
  }

  public get lastNameInput() {
    return this.page.getByTestId('last_name');
  }

  public get companyInput() {
    return this.page.getByTestId('company');
  }

  public get addressInput() {
    return this.page.getByTestId('address');
  }

  public get address2Input() {
    return this.page.getByTestId('address2');
  }

  public get countrySelect() {
    return this.page.getByTestId('country');
  }

  public get stateInput() {
    return this.page.getByTestId('state');
  }

  public get cityInput() {
    return this.page.getByTestId('city');
  }

  public get zipcodeInput() {
    return this.page.getByTestId('zipcode');
  }

  public get mobileNumberInput() {
    return this.page.getByTestId('mobile_number');
  }

  public get createAccountButton() {
    return this.page.getByRole('button', { name: 'Create Account' });
  }
}