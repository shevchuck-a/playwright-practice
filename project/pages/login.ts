import { Page } from "@playwright/test";

export class LoginPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async navigate() {
    await this.page.goto('/login');
  }

  public async signup(name: string, email: string) {
    await this.page.getByPlaceholder('Name').fill(name);
    await this.page.getByPlaceholder('Email').fill(email);
    await this.page.getByRole('button', { name: 'Signup' }).click();
  }

  public async login(email: string, password: string) {
    await this.page.getByTestId('login-email').fill(email);
    await this.page.getByTestId('login-password').fill(password);
    await this.page.getByTestId('login-button').click();
  }
}