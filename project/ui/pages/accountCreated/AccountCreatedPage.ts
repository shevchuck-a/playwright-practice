import { Page } from "@playwright/test";
import { AccountCreatedLocators } from "./AccountCreatedLocators";

export class AccountCreatedPage extends AccountCreatedLocators {
  constructor(page: Page) {
    super(page, '/account_created');
  }

  public async clickContinue() {
    await this.continueButton.click();
  }
}