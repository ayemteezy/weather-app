// eslint.config.js
import js from "@eslint/js";
import globals from "globals"; // 1. Import the globals package

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
  {
    ignores: ["dist/**", "node_modules/**"],
  },
];
