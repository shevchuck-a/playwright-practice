import { Locator } from "@playwright/test";
import { FieldConfig } from "@core-ui/interfaces/FieldConfig";

export class FormsHelper {
  public static async fillTheForm<T extends Record<string, FieldConfig>>(formConfig: T): Promise<void> {
    for (const [, config] of Object.entries(formConfig)) {
      if (this.shouldProcessField(config.value)) {
        await this.executeAction(config.locator, config.action, config.value!);
      }
    }
  }

  private static shouldProcessField(value?: string): boolean {
    return value !== undefined && value !== null && value !== '';
  }

  private static async executeAction(locator: Locator, action: string, value: string): Promise<void> {
    switch (action) {
      case 'fill':
        await locator.fill(value);
        break;
      case 'selectOption':
        await locator.selectOption(value);
        break;
      case 'check':
        await locator.check();
        break;
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  }
}