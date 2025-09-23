import { Locator } from "@playwright/test";

export interface FieldConfig {
  locator: Locator;
  action: 'fill' | 'selectOption' | 'check';
  value?: string;
}