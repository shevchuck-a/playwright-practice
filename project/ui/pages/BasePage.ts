import { Page } from "@playwright/test";
import { HeaderComponent } from "@components/header/HeaderComponent";
import { FooterComponent } from "@components/footer/FooterComponent";

export abstract class BasePage {
  private path: string;
  protected page: Page;
  public header: HeaderComponent;
  public footer: FooterComponent;

  constructor(page: Page, path: string) {
    this.path = path;
    this.page = page;
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
  }

  public async getTitle() {
    return await this.page.title();
  }

  public async navigate() {
    await this.page.goto(this.path);
    return this;
  }
}