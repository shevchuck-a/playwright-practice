import { Page } from "@playwright/test";
import { HomeLocators } from "./HomeLocators";

export class HomePage extends HomeLocators {
  constructor(page: Page) {
    super(page);
  }

  public async navigate() {
    await this.page.goto('/');
    return this;
  }
}