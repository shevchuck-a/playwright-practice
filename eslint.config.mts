import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import playwright from 'eslint-plugin-playwright';

export default defineConfig([
  {
    ignores: [
      "node_modules/",
      "playwright-report/",
      "test-results/",
      "dist/",
      "build/",
      "coverage/",
      "*.js.map",
      ".env*",
    ]
  },
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.node,
      }
    },
  },
  tseslint.configs.recommended,
  {
    files: ["**/*.test.ts", "**/*.spec.ts", "**/ui-tests/**/*.ts"],
    plugins: {
      playwright,
    },
    rules: {
      ...playwright.configs.recommended.rules,
      "playwright/missing-playwright-await": "error",
      "playwright/no-page-pause": "error",
      "playwright/no-element-handle": "error",
    },
  },
]);
