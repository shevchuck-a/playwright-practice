import { Page } from "@playwright/test";
import { HeaderLocators } from "./HeaderLocators";

export class HeaderComponent extends HeaderLocators{
  constructor(page: Page) {
    super(page);
  }

  public async signupLoginClick() {
    await this.signupLoginLink.click();
  }

  public async logoutClick() {
    await this.logoutLink.click();
  }

  public async deleteAccountClick() {
    await this.deleteAccountLink.click();
  }
}