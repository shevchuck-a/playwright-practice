import { Page } from "@playwright/test";

export class HeaderLocators{
  protected page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  public get signupLoginLink() {
    return this.page.getByRole('link', { name: 'Login' });
  }

  public get logoutLink() {
    return this.page.getByRole('link', { name: 'Logout' });
  }

  public get deleteAccountLink() {
    return this.page.getByRole('link', { name: 'Delete Account' });
  }
}