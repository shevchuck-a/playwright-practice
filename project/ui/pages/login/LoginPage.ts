import { Page } from "@playwright/test";
import { LoginLocators } from "./LoginLocators";

export class LoginPage extends LoginLocators {
  constructor(page: Page) {
    super(page, '/login');
  }

  public async fillSignupFormAndSubmit(name: string, email: string) {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.signupButton.click();
  }

  public async fillLoginFormAndSubmit(email: string, password: string) {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }
}