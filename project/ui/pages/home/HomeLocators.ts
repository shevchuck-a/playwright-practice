import { BasePage } from "@pages/BasePage";
import { Page } from "@playwright/test";

export class HomeLocators extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}