import { BasePage } from "@pages/BasePage";
import { Page } from "@playwright/test";
import { Button } from "@elements/buttonEnum";

export class AccountDeletedLocators extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public get continueButton() {
    return this.page.getByTestId(Button.CONTINUE);
  }
}