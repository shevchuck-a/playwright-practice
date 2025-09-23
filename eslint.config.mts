import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import playwright from 'eslint-plugin-playwright';

export default tseslint.config(
  // Global ignores
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

  // Base JavaScript config
  js.configs.recommended,

  // Base TypeScript configs
  ...tseslint.configs.recommended,

  // General config for all files
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      }
    },
  },

  // TypeScript specific config with project reference (for source code - strict)
  {
    files: ["project/**/*.{ts,mts,cts}"], // Only apply strict rules to source code
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      }
    },
    rules: {
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/strict-boolean-expressions": "warn",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-call": "error",
    }
  },

  // Test files config with relaxed TypeScript rules
  {
    files: [
      "**/*.test.ts", 
      "**/*.spec.ts", 
      "**/tests-ui/**/*.ts",
      "**/tests-api/**/*.ts"
    ],
    plugins: {
      playwright,
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      }
    },
    rules: {
      // Playwright specific rules
      "playwright/missing-playwright-await": "error",
      "playwright/no-page-pause": "error", 
      "playwright/no-element-handle": "error",
      "playwright/expect-expect": "error",
      "playwright/no-conditional-in-test": "warn",
      
      // Relaxed TypeScript rules for test files
      "@typescript-eslint/no-non-null-assertion": "warn", // Downgrade to warning
      "@typescript-eslint/no-unsafe-argument": "off", // Allow in tests
      "@typescript-eslint/no-unsafe-member-access": "off", // Allow in tests - API responses are often any
      "@typescript-eslint/no-unsafe-call": "off", // Allow in tests
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/no-explicit-any": "off", // Allow explicit any in tests
      
      // Keep these as warnings for better practices
      "@typescript-eslint/prefer-nullish-coalescing": "warn",
    },
  },

  // Config files - most relaxed
  {
    files: ["eslint.config.mts", "playwright.config.ts", "*.config.{js,ts,mts}"],
    rules: {
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-explicit-any": "off",
    }
  },

  // Performance test files (K6)
  {
    files: ["**/tests-performance/**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
        __ENV: "readonly",
        check: "readonly",
        group: "readonly",
      }
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
    }
  }
);