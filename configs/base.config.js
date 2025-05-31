// eslint-config-custom/base.config.js

import path from "path";
import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import";
import eslintCommentsPlugin from "eslint-plugin-eslint-comments";
import prettierPlugin from "eslint-plugin-prettier";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const defaultOptions = {
  enableGoogle: true,
  enableAirbnbBase: true,
  enableStandard: true,
  enableImport: true,
  enableESLintComments: true,
  enablePrettier: true,

  ignorePatterns: [
    "node_modules/**",
    "dist/**",
    "build/**",
    ".next/**",
    "out/**",
    "coverage/**"
  ],

  env: {
    node: true,
    browser: true,
    es2021: true
  },

  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },

  extraRules: {
    "no-console": "off"
  }
};

export default function createBaseConfig(customOptions = {}) {
  const opts = {
    enableGoogle: customOptions.enableGoogle ?? defaultOptions.enableGoogle,
    enableAirbnbBase:
      customOptions.enableAirbnbBase ?? defaultOptions.enableAirbnbBase,
    enableStandard: customOptions.enableStandard ?? defaultOptions.enableStandard,
    enableImport: customOptions.enableImport ?? defaultOptions.enableImport,
    enableESLintComments:
      customOptions.enableESLintComments ?? defaultOptions.enableESLintComments,
    enablePrettier: customOptions.enablePrettier ?? defaultOptions.enablePrettier,
    ignorePatterns: Array.isArray(customOptions.ignorePatterns)
      ? customOptions.ignorePatterns
      : defaultOptions.ignorePatterns.slice(),
    env: {
      ...defaultOptions.env,
      ...(customOptions.env || {})
    },
    parserOptions: {
      ...defaultOptions.parserOptions,
      ...(customOptions.parserOptions || {})
    },
    extraRules: {
      ...defaultOptions.extraRules,
      ...(customOptions.extraRules || {})
    }
  };

  const compat = new FlatCompat({
      baseDirectory: __dirname,
      recommendedConfig: "eslint:recommended"
    });
    const extendsList = [
      "plugin:@typescript-eslint/recommended"
    ];
  if (opts.enableAirbnbBase) extendsList.push("airbnb-base");
  if (opts.enableStandard) extendsList.push("standard");
  if (opts.enableImport) {
    extendsList.push("plugin:import/recommended");
    extendsList.push("plugin:import/typescript");
  }
  if (opts.enableESLintComments) extendsList.push("plugin:eslint-comments/recommended");
  if (opts.enablePrettier) extendsList.push("plugin:prettier/recommended");

  return [
    { ignores: opts.ignorePatterns },
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      env: opts.env,
      languageOptions: {
        parser: "@typescript-eslint/parser",
        parserOptions: opts.parserOptions,
        plugins: {
          ...(opts.enableImport ? { import: importPlugin } : {}),
          ...(opts.enableESLintComments ? { "eslint-comments": eslintCommentsPlugin } : {}),
          ...(opts.enablePrettier ? { prettier: prettierPlugin } : {})
        },
        settings: {
          "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"]
          },
          "import/resolver": {
            typescript: { alwaysTryTypes: true }
          }
        }
      },
      ...compat.extends(...extendsList),
      rules: {
        ...opts.extraRules,
        "import/order": [
          "error",
          {
            groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],
            "newlines-between": "always",
            alphabetize: { order: "asc", caseInsensitive: true }
          }
        ],
        "import/newline-after-import": "error",
        "import/no-duplicates": "error",
        "import/no-unresolved": ["error", { ignore: ["^@/"] }],
        "eslint-comments/no-unused-disable": "error",
        "eslint-comments/no-unused-enable": "error",
        "prefer-const": "error",
        "arrow-body-style": ["error", "as-needed"],
        "no-var": "error",
        "prefer-arrow-callback": ["error", { allowNamedFunctions: false, allowUnboundThis: true }],
        "no-duplicate-imports": "error",
        "no-param-reassign": ["error", { props: false }],
        "no-restricted-syntax": [
          "error",
          { selector: "ForInStatement", message: "for..in loops are not allowed." },
          { selector: "LabeledStatement", message: "Labels are not allowed." },
          { selector: "WithStatement", message: "`with` is not allowed." }
        ],
        "no-lonely-if": "error",
        "no-else-return": "error",
        eqeqeq: ["error", "always"],
        curly: "error",
        "brace-style": ["error", "1tbs"],
        "block-scoped-var": "error",
        "consistent-return": "error",
        "default-case": "warn",
        "dot-notation": "error",
        "no-eq-null": "error",
        "no-extra-bind": "error",
        "no-floating-decimal": "error",
        "no-implicit-coercion": ["error", { boolean: false }],
        "no-implicit-globals": "error",
        "no-invalid-this": "error",
        "no-iterator": "error",
        "no-labels": "error",
        "no-multi-spaces": "error",
        "no-new": "error",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-octal": "error",
        "no-octal-escape": "error",
        "no-proto": "error",
        "no-redeclare": "error",
        "no-return-assign": "error",
        "no-sequences": "error",
        "no-throw-literal": "error",
        "no-unmodified-loop-condition": "error",
        "no-unused-expressions": "error",
        "no-useless-concat": "error",
        "no-useless-escape": "error",
        "no-useless-return": "error",
        radix: "error",
        "require-await": "error",
        "wrap-iife": ["error", "inside"],
        yoda: ["error", "never"],
        complexity: ["warn", 10],
        "max-depth": ["warn", 4],
        "max-lines": ["warn", { max: 300, skipBlankLines: true, skipComments: true }],
        "max-params": ["warn", 3],
        "max-statements": ["warn", 10],
        "max-nested-callbacks": ["warn", 3],
        "max-len": ["warn", { code: 120, ignoreUrls: true }],
        "no-bitwise": "warn",
        "no-console": ["warn", { allow: ["warn", "error"] }],
        "no-debugger": "error",
        "no-alert": "error",
        "no-eval": "error",
        "no-undefined": "error",
        "no-underscore-dangle": "warn",
        "no-warning-comments": ["warn", { terms: ["todo", "fixme", "xxx"], location: "start" }],
        "padding-line-between-statements": [
          "warn",
          { blankLine: "always", prev: "*", next: "return" },
          { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
          { blankLine: "never", prev: "import", next: "import" }
        ]
      }
    }
  ];
}
