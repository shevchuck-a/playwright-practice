import { Page } from "@playwright/test";
import { HeaderElement } from "@elements/header";

export class AccountDeletedPage {
  page: Page;
  header: HeaderElement;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderElement(page);
  }

  public async ClickContinue() {
    await this.page.getByTestId('continue-button').click();
  }
}