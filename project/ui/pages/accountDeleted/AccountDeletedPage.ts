import { Page } from "@playwright/test";
import { AccountDeletedLocators } from "./accountDeletedLocators";

export class AccountDeletedPage extends AccountDeletedLocators {
  constructor(page: Page) {
    super(page);
  }

  public async ClickContinue() {
    await this.continueButton.click();
  }
}