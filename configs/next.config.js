// eslint-config-custom/next.config.js

import path from "path";
import { FlatCompat } from "@eslint/eslintrc";
import createBaseConfig from "./base.config.js";
import createReactConfig from "./react.config.js";
import reactPlugin from "eslint-plugin-react";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import nextPlugin from "eslint-plugin-next";
import importPlugin from "eslint-plugin-import";
import eslintCommentsPlugin from "eslint-plugin-eslint-comments";
import prettierPlugin from "eslint-plugin-prettier";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const nextDefaultOptions = {
  baseOptions: {},
  reactOptions: {},
  enableCoreWebVitals: true,
  enableNextTypeScript: true,
  enablePrettier: true,
  extraRules: {}
};

export default function createNextConfig(customOptions = {}) {
  const opts = {
    ...nextDefaultOptions,
    ...customOptions,
    baseOptions: { ...nextDefaultOptions.baseOptions, ...(customOptions.baseOptions || {}) },
    reactOptions: { ...nextDefaultOptions.reactOptions, ...(customOptions.reactOptions || {}) },
    extraRules: { ...nextDefaultOptions.extraRules, ...(customOptions.extraRules || {}) }
  };

  const baseConfigArray = createBaseConfig(opts.baseOptions);
  const reactConfigArray = createReactConfig(opts.reactOptions);

  const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: { eslint: "recommended"  }
  });

  const extendsList = [];
  if (opts.enableCoreWebVitals) extendsList.push("next/core-web-vitals");
  if (opts.enableNextTypeScript) extendsList.push("next/typescript");
  if (opts.enablePrettier) extendsList.push("plugin:prettier/recommended");

  const nextSection = {
    files: ["**/*.{js,jsx,ts,tsx}"],
    env: {
      browser: true,
      node: true,
      es2021: true
    },
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true }
      },
      plugins: {
        react: reactPlugin,
        "jsx-a11y": jsxA11yPlugin,
        "@next/next": nextPlugin,
        import: importPlugin,
        "eslint-comments": eslintCommentsPlugin,
        prettier: prettierPlugin
      },
      settings: {
        react: { version: "detect" },
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
      "@next/next/no-html-link-for-pages": ["error", "pages/"],
      "@next/next/next-script-for-ga": "warn",
      "@next/next/no-sync-scripts": "error",
      "@next/next/no-img-element": "warn",
      "@next/next/google-font-display": "warn",
      "@next/next/no-unwanted-polyfillio": "warn",
      "@next/next/no-css-tags": "error",
      "@next/next/no-title-in-document-head": "error",
      "@next/next/no-script-component-in-head": "error",

      "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-props-no-spreading": "warn",
      "react/jsx-key": "error",
      "react/no-array-index-key": "warn",
      "react/jsx-no-duplicate-props": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      "jsx-a11y/anchor-is-valid": ["error", { aspects: ["invalidHref"] }],
      "jsx-a11y/alt-text": [
        "error",
        {
          elements: ["img", "object", "area", "input[type='image']"],
          img: ["Image"]
        }
      ],
      "jsx-a11y/no-autofocus": ["warn", { ignoreNonDOM: true }],
      "jsx-a11y/click-events-have-key-events": "error",
      "jsx-a11y/no-noninteractive-element-interactions": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
      "jsx-a11y/label-has-associated-control": ["error", { assert: "either", depth: 3 }],

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
      "import/no-unresolved": ["error", { ignore: ["^@/"] }],
      "import/no-cycle": ["error", { maxDepth: 1 }],
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: ["**/*.test.{js,jsx,ts,tsx}", "**/*.spec.{js,jsx,ts,tsx}", "next.config.js"],
          optionalDependencies: false
        }
      ],

      "eslint-comments/no-unused-disable": "error",
      "eslint-comments/no-duplicate-disable": "error",
      "eslint-comments/require-description": ["warn", { ignore: ["eslint-disable-next-line"] }],

      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-function-return-type": ["warn", { allowExpressions: true }],
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/member-delimiter-style": [
        "error",
        {
          multiline: { delimiter: "semi", requireLast: true },
          singleline: { delimiter: "semi", requireLast: false }
        }
      ],

      "jsx-a11y/no-onchange": "off",
      "jsx-a11y/interactive-supports-focus": "warn",

      semi: ["error", "always"],
      quotes: ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "comma-dangle": ["error", "always-multiline"],
      "arrow-parens": ["error", "as-needed"],
      "max-len": ["warn", { code: 100, ignoreStrings: true, ignoreComments: true }],
      "no-magic-numbers": ["warn", { ignore: [0, 1], ignoreArrayIndexes: true, enforceConst: true }],
      "no-shadow": ["error", { ignoreTypeValueShadow: true }],
      "no-duplicate-imports": "error",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "error",

      ...opts.extraRules
    }
  };

  return [...baseConfigArray, ...reactConfigArray, nextSection];
}
