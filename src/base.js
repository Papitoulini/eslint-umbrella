import js from "@eslint/js";
import * as tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import unused from "eslint-plugin-unused-imports";

/** @returns {import('eslint').Linter.FlatConfig[]} */
export default function base() {
  return [
    { ignores: ["dist", "build", "coverage", "**/*.min.*"] },
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
      plugins: { import: importPlugin, "unused-imports": unused },
      rules: {
        "no-console": ["warn", { allow: ["warn", "error"] }],
        "no-debugger": "warn",
        "import/order": ["warn", { alphabetize: { order: "asc", caseInsensitive: true }, "newlines-between": "always" }],
        "unused-imports/no-unused-imports": "warn",
        "unused-imports/no-unused-vars": ["warn", { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" }]
      },
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parserOptions: { project: ["tsconfig.json"] }
      }
    }
  ];
}
