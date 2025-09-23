import { BasePage } from "@pages/BasePage";
import { Page } from "@playwright/test";
import { Button } from "@elements/buttonEnum";

export class AccountCreatedLocators extends BasePage {
  constructor(page: Page, path: string) {
    super(page, path);
  }

  public get continueButton() {
    return this.page.getByTestId(Button.CONTINUE);
  }
}