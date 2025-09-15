import { Page } from "@playwright/test";

export class HeaderElement{
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async signupLoginClick() {
    await this.page.getByRole('link', { name: 'Login' }).click();
  }

  public async deleteAccountClick() {
    await this.page.getByRole('link', { name: 'Delete Account' }).click();
  }
}