import { Page } from "@playwright/test";

export class LoginPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async navigate() {
    await this.page.goto('/login');
  }

  public async Signup(name: string, email: string) {
    await this.page.getByPlaceholder('Name').fill(name);
    await this.page.getByPlaceholder('Email').fill(email);
    await this.page.getByRole('button', { name: 'Signup' }).click();
  }
}