// eslint-config-custom/node.config.js

import path from "path";
import { FlatCompat } from "@eslint/eslintrc";
import createBaseConfig from "./base.config.js";

// Default options for Node projects:
const nodeDefaultOptions = {
  // Forwarded to createBaseConfig
  baseOptions: {},

  // Whether to include “plugin:node/recommended”
  enableNodeRecommended: true,

  // Whether to include Prettier last
  enablePrettier: true,

  // Any extra Node-specific rule overrides
  extraRules: {
    "no-console": "off"
  }
};

/**
 * Factory: createNodeConfig(customOptions)
 *
 * @param {Object} customOptions
 * @param {Object} [customOptions.baseOptions]      // passed to createBaseConfig
 * @param {boolean} [customOptions.enableNodeRecommended]
 * @param {boolean} [customOptions.enablePrettier]
 * @param {Object} [customOptions.extraRules]
 *
 * @returns {Array} Flat-config array for Node (Express) projects
 */
export default function createNodeConfig(customOptions = {}) {
  const opts = {
    ...nodeDefaultOptions,
    ...customOptions,
    baseOptions: {
      ...nodeDefaultOptions.baseOptions,
      ...(customOptions.baseOptions || {})
    },
    extraRules: {
      ...nodeDefaultOptions.extraRules,
      ...(customOptions.extraRules || {})
    }
  };

  // 1) Build the base config (TS + Google/Airbnb-base/Standard + Prettier etc.)
  const baseConfigArray = createBaseConfig(opts.baseOptions);

  // 2) FlatCompat for “plugin:node/recommended” + “plugin:prettier/recommended”
  const compat = new FlatCompat({
    baseDirectory: path.resolve(new URL(import.meta.url).pathname, ".")
  });

  const extendsList = [];
  if (opts.enableNodeRecommended) extendsList.push("plugin:node/recommended");
  if (opts.enablePrettier) extendsList.push("plugin:prettier/recommended");

  // 3) Node section: only .js/.ts files
  const nodeSection = {
    files: ["**/*.{js,ts}"],
    env: {
      node: true,
      es2021: true
    },
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      },
      plugins: {
        "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
        node: require("eslint-plugin-node"),
        import: require("eslint-plugin-import"),
        "eslint-comments": require("eslint-plugin-eslint-comments"),
        ...(opts.enablePrettier ? { prettier: require("eslint-plugin-prettier") } : {})
      },
      settings: {
        "import/parsers": {
          "@typescript-eslint/parser": [".ts"]
        },
        "import/resolver": {
          typescript: {
            alwaysTryTypes: true
          },
          node: {
            extensions: [".js", ".ts"],
            paths: ["src"]
          }
        }
      }
    },
    ...compat.extends(...extendsList),
    rules: {
      // Node.js plugin rules
      "node/no-unsupported-features/es-syntax": [
        "error",
        {
          ignores: []
        }
      ],
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
      "node/no-extraneous-import": [
        "error",
        {
          allowModules: [],
          enforceInternal: true
        }
      ],
      "node/no-extraneous-require": [
        "error",
        {
          allowModules: [],
          enforceInternal: true
        }
      ],
      "node/no-restricted-import": ["error", { name: "fs/promises", message: "Use fs.promises directly" }],
      "node/no-restricted-require": ["error", { name: "child_process", message: "Consider using execa instead" }],
      "node/callback-return": ["error", ["callback", "cb", "next"]],
      "node/exports-style": ["error", "module.exports"],

      // Import plugin rules
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "object",
            "type"
          ],
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
          devDependencies: [
            "**/*.test.{js,ts}",
            "**/*.spec.{js,ts}",
            "test/**",
            "**/scripts/**"
          ],
          optionalDependencies: false
        }
      ],
      "import/no-cycle": ["error", { maxDepth: 1 }],
      "import/no-named-as-default": "error",

      // ESLint-comments plugin rules
      "eslint-comments/no-unused-disable": "error",
      "eslint-comments/no-duplicate-disable": "error",
      "eslint-comments/require-description": ["warn", { ignore: ["eslint-disable-next-line"] }],

      // TypeScript-specific rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        { allowExpressions: true, allowTypedFunctionExpressions: true }
      ],
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/await-thenable": "error",

      // Common stylistic rules
      "semi": ["error", "always"],
      "quotes": ["error", "single", { avoidEscape: true, allowTemplateLiterals: true }],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "comma-dangle": ["error", "always-multiline"],
      "arrow-parens": ["error", "as-needed"],
      "no-magic-numbers": [
        "warn",
        { ignore: [0, 1], ignoreArrayIndexes: true, enforceConst: true }
      ],
      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "error",
      "no-duplicate-imports": "error",
      "no-param-reassign": ["error", { props: false }],
      "no-restricted-syntax": [
        "error",
        {
          selector: "ForInStatement",
          message: "for..in loops are not allowed."
        },
        {
          selector: "LabeledStatement",
          message: "Labels are not allowed."
        },
        {
          selector: "WithStatement",
          message: "`with` is not allowed."
        }
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-eval": "error",
      "consistent-return": "error",
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-fallthrough": "error",
      "no-unsafe-finally": "error",
      "no-underscore-dangle": "warn",
      "curly": "error",
      "brace-style": ["error", "1tbs"],
      "default-case": "warn",
      "dot-notation": "error",
      "eqeqeq": ["error", "always"],
      "max-len": ["warn", { code: 100, ignoreStrings: true, ignoreComments: true }],
      "complexity": ["warn", 10],
      "max-depth": ["warn", 4],
      "max-params": ["warn", 3],
      "max-statements": ["warn", 10],
      "max-nested-callbacks": ["warn", 3],
      "no-multi-spaces": "error",
      "no-redeclare": "error",
      "no-return-assign": "error",
      "no-sequences": "error",
      "no-throw-literal": "error",
      "prefer-arrow-callback": [
        "error",
        { allowNamedFunctions: false, allowUnboundThis: true }
      ],
      "wrap-iife": ["error", "inside"],

      // Security-related rules (if using eslint-plugin-security)
      // "security/detect-object-injection": "warn",
      // "security/detect-non-literal-regexp": "warn",
      // "security/detect-eval-with-expression": "error",

      // Next-specific or project-specific overrides from extraRules
      ...opts.extraRules
    }
  };

  // Combine: baseConfig + nodeSection
  return [...baseConfigArray, nodeSection];
}
