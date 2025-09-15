import { Page } from "@playwright/test";
import { HeaderElement } from "@elements/header";

export class HomePage {
  page: Page;
  header: HeaderElement;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderElement(page);
  }

  public async navigate() {
    await this.page.goto('/');
  }

  
}