import { Page } from "@playwright/test";
import { AccountDeletedLocators } from "./accountDeletedLocators";

export class AccountDeletedPage extends AccountDeletedLocators {
  constructor(page: Page) {
    super(page, '/delete_account');
  }

  public async clickContinue() {
    await this.continueButton.click();
  }
}