import { Page } from "@playwright/test";

export class FooterComponent {
  private page: Page;
  
    constructor(page: Page) {
      this.page = page;
    }
}