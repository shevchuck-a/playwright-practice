import { BasePage } from "@pages/BasePage";
import { Page } from "@playwright/test";

export class LoginLocators extends BasePage {
  constructor(page: Page, path: string) {
    super(page, path);
  }

  public get loginEmail() {
    return this.page.getByTestId('login-email');
  }

  public get loginPassword() {
    return this.page.getByTestId('login-password');
  }

  public get loginButton() {
    return this.page.getByTestId('login-button');
  }

  public get signupName() {
    return this.page.getByTestId('signup-name');
  }

  public get signupEmail() {
    return this.page.getByTestId('signup-email');
  }

  public get signupButton() {
    return this.page.getByTestId('signup-button');
  }

  public get loginFormHeader() {
    return this.page.getByText('Login to your account');
  }

  public get signupFormHeader() {
    return this.page.getByText('New User Signup!');
  }

  public get emailAlreadyExistError() {
    return this.page.getByText('Email Address already exist!');
  }
}