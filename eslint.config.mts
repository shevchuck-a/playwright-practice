import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

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

  js.configs.recommended,
  ...tseslint.configs.recommended,

  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], 
    languageOptions: { 
      globals: {
        ...globals.browser, 
        ...globals.node
      } 
    } 
  },

  {
    files: [
      "project/**/*.{ts,mts,cts}",
      "**/*.test.ts", 
      "**/*.spec.ts", 
      "**/tests-ui/**/*.ts",
      "**/tests-api/**/*.ts"], // Only apply strict rules to source code
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      }
    },
    rules: {
      "@typescript-eslint/no-non-null-assertion": ["off"],
      "@typescript-eslint/strict-boolean-expressions": "warn",
      "@typescript-eslint/no-unsafe-argument": ["off"],
      "@typescript-eslint/no-unsafe-member-access": ["off"],
      "@typescript-eslint/no-unsafe-assignment": ["off"],
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "variable",
          "format": ["camelCase", "UPPER_CASE", "PascalCase"]
        },
        {
          "selector": ["function", "parameterProperty"],
          "format": ["camelCase"]
        },
        {
          "selector": "classMethod",
          "format": ["camelCase"]
        },
        {
          "selector": "class",
          "format": ["PascalCase"]
        },
        {
          "selector": "interface",
          "prefix": ["I"],
          "format": ["PascalCase"]
        },
        {
          "selector": "enumMember",
          "format": ["UPPER_CASE"]
        },
        {
          "selector": "enum",
          "format": ["PascalCase"]
        }
      ],
    }
  },
]);
