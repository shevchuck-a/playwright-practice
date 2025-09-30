import { Locator } from "@playwright/test";

export interface IFieldConfig {
  locator: Locator;
  action: 'fill' | 'selectOption' | 'check';
  value?: string;
}