/**
 * ESLint Configuration File
 * 
 * This file configures ESLint for the Mineral Counter application.
 * ESLint helps maintain code quality by enforcing coding standards and catching potential errors.
 */

// Import core ESLint configurations and plugins
import js from "@eslint/js";               // Core JavaScript rules
import globals from "globals";             // Global variable definitions
import reactHooks from "eslint-plugin-react-hooks";     // React Hooks rules
import reactRefresh from "eslint-plugin-react-refresh"; // React Refresh rules
import tseslint from "typescript-eslint";  // TypeScript-specific rules

/**
 * ESLint Configuration
 * 
 * Exports a configuration object that defines how ESLint should analyze the code.
 * Uses the new flat config format introduced in ESLint 8.21.0
 */
export default tseslint.config(
  // Basic configuration options
  { 
    // Ignore the dist directory when linting
    ignores: ["dist"] 
  },

  // Main configuration object
  {
    // Extend recommended configurations
    extends: [
      js.configs.recommended,        // Base JavaScript rules
      ...tseslint.configs.recommended // TypeScript-specific rules
    ],

    // Files to lint - only TypeScript and TSX files
    files: ["**/*.{ts,tsx}"],

    // Language options
    languageOptions: {
      // Specify ECMAScript version
      ecmaVersion: 2020,
      // Add browser globals (window, document, etc.)
      globals: globals.browser,
    },

    // Configure plugins
    plugins: {
      // React Hooks linting
      "react-hooks": reactHooks,
      // React Refresh for development
      "react-refresh": reactRefresh,
    },

    // Specific rule configurations
    rules: {
      // Include all recommended React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // Configure React Refresh rules
      "react-refresh/only-export-components": [
        "warn",                    // Warning level
        { 
          allowConstantExport: true // Allow constant exports
        },
      ],

      // Disable TypeScript unused variables check
      // (useful during development)
      "@typescript-eslint/no-unused-vars": "off",
    },
  }
);
