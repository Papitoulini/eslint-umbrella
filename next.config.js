// eslint-config-custom/next.config.js

import path from "path";
import { FlatCompat } from "@eslint/eslintrc";
import createBaseConfig from "./base.config.js";
import createReactConfig from "./react.config.js";

// Default options for Next.js projects:
const nextDefaultOptions = {
  // Passed to createBaseConfig (e.g. “I want Google + Airbnb + Standard + Import + ESLint-comments + Prettier”)
  baseOptions: {},

  // Passed to createReactConfig (e.g. “I want React-specific overrides”)
  reactOptions: {},

  // Next-specific presets:
  enableCoreWebVitals: true,
  enableNextTypeScript: true,
  enablePrettier: true,

  // Any Next-specific rule overrides
  extraRules: {
    // Example: disable a Next rule if desired
    // "@next/next/no-page-custom-font": "off"
  }
};

/**
 * Factory: createNextConfig(customOptions)
 *
 * @param {Object} customOptions
 * @param {Object} [customOptions.baseOptions]       – options forwarded to createBaseConfig
 * @param {Object} [customOptions.reactOptions]      – options forwarded to createReactConfig
 * @param {boolean} [customOptions.enableCoreWebVitals]
 * @param {boolean} [customOptions.enableNextTypeScript]
 * @param {boolean} [customOptions.enablePrettier]
 * @param {Object} [customOptions.extraRules]
 *
 * @returns {Array} Flat-config array for Next.js projects
 */
export default function createNextConfig(customOptions = {}) {
  const opts = {
    ...nextDefaultOptions,
    ...customOptions,
    baseOptions: {
      ...nextDefaultOptions.baseOptions,
      ...(customOptions.baseOptions || {})
    },
    reactOptions: {
      ...nextDefaultOptions.reactOptions,
      ...(customOptions.reactOptions || {})
    },
    extraRules: {
      ...nextDefaultOptions.extraRules,
      ...(customOptions.extraRules || {})
    }
  };

  // 1) Build base config (generic JS/TS rules, import/order, ESLint-comments, Prettier, etc.)
  const baseConfigArray = createBaseConfig(opts.baseOptions);

  // 2) Build React config (React + JSX + import/order + accessibility + Prettier)
  const reactConfigArray = createReactConfig(opts.reactOptions);

  // 3) Prepare FlatCompat for Next.js presets
  const compat = new FlatCompat({
    baseDirectory: path.resolve(new URL(import.meta.url).pathname, ".")
  });

  // 4) Assemble Next-specific extends:
  const extendsList = [];
  if (opts.enableCoreWebVitals) extendsList.push("next/core-web-vitals");
  if (opts.enableNextTypeScript) extendsList.push("next/typescript");
  if (opts.enablePrettier) extendsList.push("plugin:prettier/recommended");

  // 5) Next.js-specific section (applies to all JS/TS/JSX/TSX)
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
        react: require("eslint-plugin-react"),
        "jsx-a11y": require("eslint-plugin-jsx-a11y"),
        "@next/next": require("eslint-plugin-next"),
        // Inherit import plugin as well
        import: require("eslint-plugin-import"),
        "eslint-comments": require("eslint-plugin-eslint-comments"),
        prettier: require("eslint-plugin-prettier")
      },
      settings: {
        react: {
          version: "detect"
        },
        "import/parsers": {
          "@typescript-eslint/parser": [".ts", ".tsx"]
        },
        "import/resolver": {
          typescript: {
            alwaysTryTypes: true
          }
        }
      }
    },
    // 6) Extend Next.js presets (and Prettier if enabled)
    ...compat.extends(...extendsList),
    // 7) Combine Next-specific rule overrides + generic recommendations
    rules: {
      // Next.js best-practices
      "@next/next/no-html-link-for-pages": ["error", "pages/"],
      "@next/next/next-script-for-ga": "warn",
      "@next/next/no-sync-scripts": "error",
      "@next/next/no-img-element": "warn",
      "@next/next/google-font-display": "warn",
      "@next/next/no-unwanted-polyfillio": "warn",
      "@next/next/no-css-tags": "error",
      "@next/next/no-title-in-document-head": "error",
      "@next/next/no-script-component-in-head": "error",

      // React-specific (reinforce or override)
      "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-props-no-spreading": "warn",
      "react/jsx-key": "error",
      "react/no-array-index-key": "warn",
      "react/jsx-no-duplicate-props": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Accessibility (JSX-A11Y)
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
      "jsx-a11y/label-has-associated-control": [
        "error",
        { assert: "either", depth: 3 }
      ],

      // Import rules
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
      "import/no-unresolved": ["error", { ignore: ["^@/"] }],
      "import/no-cycle": ["error", { maxDepth: 1 }],
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "**/*.test.{js,jsx,ts,tsx}",
            "**/*.spec.{js,jsx,ts,tsx}",
            "next.config.js"
          ],
          optionalDependencies: false
        }
      ],

      // ESLint-comments plugin rules
      "eslint-comments/no-unused-disable": "error",
      "eslint-comments/no-duplicate-disable": "error",
      "eslint-comments/require-description": [
        "warn",
        { ignore: ["eslint-disable-next-line"] }
      ],

      // TypeScript-specific (via @typescript-eslint)
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        { allowExpressions: true }
      ],
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" }
      ],
      "@typescript-eslint/member-delimiter-style": [
        "error",
        {
          multiline: {
            delimiter: "semi",
            requireLast: true
          },
          singleline: {
            delimiter: "semi",
            requireLast: false
          }
        }
      ],

      // Next.js Core Web Vitals performance recommendations
      // (many are included in next/core-web-vitals, but we can reinforce)
      "jsx-a11y/no-onchange": "off",
      "jsx-a11y/interactive-supports-focus": "warn",

      // Common stylistic rules (reinforce from base + react)
      "semi": ["error", "always"],
      "quotes": ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "comma-dangle": ["error", "always-multiline"],
      "arrow-parens": ["error", "as-needed"],
      "max-len": ["warn", { code: 100, ignoreStrings: true, ignoreComments: true }],
      "no-magic-numbers": [
        "warn",
        { ignore: [0, 1], ignoreArrayIndexes: true, enforceConst: true }
      ],
      "no-shadow": ["error", { ignoreTypeValueShadow: true }],
      "no-duplicate-imports": "error",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "error",

      // Security-related rules (optional plugin if installed)
      // e.g., if using eslint-plugin-security: enable some recommended rules
      // "security/detect-object-injection": "warn",
      // "security/detect-non-literal-regexp": "warn",
      // "security/detect-eval-with-expression": "error",

      // Next-specific overrides from extraRules
      ...opts.extraRules
    }
  };

  // 8) Combine baseConfig, reactConfig, and nextSection
  return [...baseConfigArray, ...reactConfigArray, nextSection];
}
