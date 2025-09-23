import { Page } from "@playwright/test";
import { HeaderComponent } from "@components/header/HeaderComponent";
import { FooterComponent } from "@components/footer/FooterComponent";

export class BasePage {
  protected page: Page;
  header: HeaderComponent;
  footer: FooterComponent;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
  }
}