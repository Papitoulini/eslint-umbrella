// eslint-config-custom/node.config.js

import path from "path";
import { FlatCompat } from "@eslint/eslintrc";
import createBaseConfig from "./base.config.js";
import nodePlugin from "eslint-plugin-node";
import importPlugin from "eslint-plugin-import";
import eslintCommentsPlugin from "eslint-plugin-eslint-comments";
import prettierPlugin from "eslint-plugin-prettier";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const nodeDefaultOptions = {
  baseOptions: {},
  enableNodeRecommended: true,
  enablePrettier: true,
  extraRules: { "no-console": "off" }
};

export default function createNodeConfig(customOptions = {}) {
  const opts = {
    ...nodeDefaultOptions,
    ...customOptions,
    baseOptions: { ...nodeDefaultOptions.baseOptions, ...(customOptions.baseOptions || {}) },
    extraRules: { ...nodeDefaultOptions.extraRules, ...(customOptions.extraRules || {}) }
  };

  const baseConfigArray = createBaseConfig(opts.baseOptions);

  const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: { eslint: "recommended"  }
  });

  const extendsList = [];
  if (opts.enableNodeRecommended) extendsList.push("plugin:node/recommended");
  if (opts.enablePrettier) extendsList.push("plugin:prettier/recommended");

  const nodeSection = {
    files: ["**/*.{js,ts}"],
    env: { node: true, es2021: true },
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
      plugins: {
        node: nodePlugin,
        import: importPlugin,
        "eslint-comments": eslintCommentsPlugin,
        ...(opts.enablePrettier ? { prettier: prettierPlugin } : {})
      },
      settings: {
        "import/parsers": { "@typescript-eslint/parser": [".ts"] },
        "import/resolver": {
          typescript: { alwaysTryTypes: true },
          node: { extensions: [".js", ".ts"], paths: ["src"] }
        }
      }
    },
    ...compat.extends(...extendsList),
    rules: {
      "node/no-unsupported-features/es-syntax": ["error", { ignores: [] }],
      "node/no-unsupported-features/node-builtins": ["error", { version: ">=14.0.0" }],
      "node/no-process-exit": "warn",
      "node/no-process-env": "warn",
      "node/no-path-concat": "error",
      "node/no-deprecated-api": "error",
      "node/no-unpublished-import": "error",
      "node/no-unpublished-require": "error",
      "node/no-missing-import": "error",
      "node/no-missing-require": "error",
      "node/no-exports-assign": "error",
      "node/no-extraneous-import": ["error", { allowModules: [], enforceInternal: true }],
      "node/no-extraneous-require": ["error", { allowModules: [], enforceInternal: true }],
      "node/no-restricted-import": ["error", { name: "fs/promises", message: "Use fs.promises directly" }],
      "node/no-restricted-require": ["error", { name: "child_process", message: "Consider using execa instead" }],
      "node/callback-return": ["error", ["callback", "cb", "next"]],
      "node/exports-style": ["error", "module.exports"],

      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"], "object", "type"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true }
        }
      ],
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "import/no-unresolved": ["error", { commonjs: true, ignore: ["^@/"] }],
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: ["**/*.test.{js,ts}", "**/*.spec.{js,ts}", "test/**", "**/scripts/**"],
          optionalDependencies: false
        }
      ],
      "import/no-cycle": ["error", { maxDepth: 1 }],
      "import/no-named-as-default": "error",

      "eslint-comments/no-unused-disable": "error",
      "eslint-comments/no-duplicate-disable": "error",
      "eslint-comments/require-description": ["warn", { ignore: ["eslint-disable-next-line"] }],

      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/explicit-function-return-type": ["warn", { allowExpressions: true, allowTypedFunctionExpressions: true }],
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/await-thenable": "error",

      semi: ["error", "always"],
      quotes: ["error", "single", { avoidEscape: true, allowTemplateLiterals: true }],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "comma-dangle": ["error", "always-multiline"],
      "arrow-parens": ["error", "as-needed"],
      "no-magic-numbers": ["warn", { ignore: [0, 1], ignoreArrayIndexes: true, enforceConst: true }],
      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "error",
      "no-duplicate-imports": "error",
      "no-param-reassign": ["error", { props: false }],
      "no-restricted-syntax": [
        "error",
        { selector: "ForInStatement", message: "for..in loops are not allowed." },
        { selector: "LabeledStatement", message: "Labels are not allowed." },
        { selector: "WithStatement", message: "`with` is not allowed." }
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-eval": "error",
      "consistent-return": "error",
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-fallthrough": "error",
      "no-unsafe-finally": "error",
      "no-underscore-dangle": "warn",
      curly: "error",
      "brace-style": ["error", "1tbs"],
      "default-case": "warn",
      "dot-notation": "error",
      eqeqeq: ["error", "always"],
      "max-len": ["warn", { code: 100, ignoreStrings: true, ignoreComments: true }],
      complexity: ["warn", 10],
      "max-depth": ["warn", 4],
      "max-params": ["warn", 3],
      "max-statements": ["warn", 10],
      "max-nested-callbacks": ["warn", 3],
      "no-multi-spaces": "error",
      "no-redeclare": "error",
      "no-return-assign": "error",
      "no-sequences": "error",
      "no-throw-literal": "error",
      "prefer-arrow-callback": ["error", { allowNamedFunctions: false, allowUnboundThis: true }],
      "wrap-iife": ["error", "inside"],

      ...opts.extraRules
    }
  };

  return [...baseConfigArray, nodeSection];
}
