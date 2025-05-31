// eslint-config-custom/react.config.js

import path from "path";
import { FlatCompat } from "@eslint/eslintrc";
import createBaseConfig from "./base.config.js";
import reactPlugin from "eslint-plugin-react";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import eslintCommentsPlugin from "eslint-plugin-eslint-comments";
import prettierPlugin from "eslint-plugin-prettier";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const reactDefaultOptions = {
  baseOptions: {},
  enableAirbnbFull: true,
  enableReactRecommended: true,
  enableJsxA11yRecommended: true,
  enablePrettier: true,
  extraRules: {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off"
  }
};

export default function createReactConfig(customOptions = {}) {
  const opts = {
    ...reactDefaultOptions,
    ...customOptions,
    baseOptions: { ...reactDefaultOptions.baseOptions, ...(customOptions.baseOptions || {}) },
    extraRules: { ...reactDefaultOptions.extraRules, ...(customOptions.extraRules || {}) }
  };

  const baseConfigArray = createBaseConfig(opts.baseOptions);

  const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: { eslint: "recommended"  }
  });

  const extendsList = [];
  if (opts.enableAirbnbFull) extendsList.push("airbnb");
  if (opts.enableReactRecommended) extendsList.push("plugin:react/recommended");
  if (opts.enableJsxA11yRecommended) extendsList.push("plugin:jsx-a11y/recommended");
  if (opts.enablePrettier) extendsList.push("plugin:prettier/recommended");

  const reactSection = {
    files: ["**/*.{jsx,tsx}"],
    env: {
      browser: true,
      es2021: true,
      node: true
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
        import: importPlugin,
        "eslint-comments": eslintCommentsPlugin,
        ...(opts.enablePrettier ? { prettier: prettierPlugin } : {})
      },
      settings: {
        react: { version: "detect" },
        "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
        "import/resolver": {
          typescript: { alwaysTryTypes: true },
          node: { extensions: [".js", ".jsx", ".ts", ".tsx"], paths: ["src"] }
        }
      }
    },
    ...compat.extends(...extendsList),
    rules: {
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
      "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }],
      "react/jsx-props-no-spreading": ["warn", { html: "enforce" }],
      "react/jsx-one-expression-per-line": "warn",
      "react/jsx-wrap-multilines": [
        "error",
        {
          declaration: "parens-new-line",
          assignment: "parens-new-line",
          return: "parens-new-line",
          arrow: "parens-new-line",
          condition: "parens-new-line",
          logical: "parens-new-line",
          prop: "ignore"
        }
      ],
      "react/jsx-no-bind": ["warn", { ignoreRefs: true, allowArrowFunctions: true }],
      "react/jsx-no-comment-textnodes": "error",
      "react/jsx-no-duplicate-props": ["error", { ignoreCase: true }],
      "react/jsx-no-target-blank": ["error", { enforceDynamicLinks: "always" }],
      "react/jsx-pascal-case": ["error", { allowAllCaps: true, ignore: [] }],
      "react/jsx-props-no-multi-spaces": "error",
      "react/jsx-sort-default-props": ["warn", { ignoreCase: true }],
      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true,
          shorthandFirst: true,
          ignoreCase: true,
          reservedFirst: true
        }
      ],
      "react/jsx-tag-spacing": [
        "error",
        {
          closingSlash: "never",
          beforeSelfClosing: "always",
          afterOpening: "never",
          beforeClosing: "never"
        }
      ],
      "react/no-access-state-in-setstate": "error",
      "react/no-adjacent-inline-elements": "warn",
      "react/no-array-index-key": "warn",
      "react/no-children-prop": "error",
      "react/no-danger": "warn",
      "react/no-danger-with-children": "error",
      "react/no-deprecated": "warn",
      "react/no-did-mount-set-state": "warn",
      "react/no-did-update-set-state": "warn",
      "react/no-direct-mutation-state": "error",
      "react/no-find-dom-node": "error",
      "react/no-is-mounted": "error",
      "react/no-multi-comp": ["warn", { ignoreStateless: true }],
      "react/no-redundant-should-component-update": "error",
      "react/no-render-return-value": "error",
      "react/no-set-state": "off",
      "react/no-string-refs": "error",
      "react/no-this-in-sfc": "error",
      "react/no-typos": "error",
      "react/no-unescaped-entities": "error",
      "react/no-unsafe": ["error", { checkAliases: true }],
      "react/no-unused-state": "error",
      "react/no-unused-prop-types": ["error", { skipShapeProps: true }],
      "react/no-will-update-set-state": "error",
      "react/prefer-stateless-function": ["warn", { ignorePureComponents: true }],
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/require-default-props": "off",
      "react/require-optimization": "warn",
      "react/require-render-return": "error",
      "react/self-closing-comp": ["error", { component: true, html: false }],
      "react/sort-comp": [
        "warn",
        {
          order: [
            "static-variables",
            "static-methods",
            "instance-variables",
            "lifecycle",
            "everything-else",
            "rendering"
          ],
          groups: {
            lifecycle: [
              "displayName",
              "propTypes",
              "contextTypes",
              "childContextTypes",
              "mixins",
              "statics",
              "defaultProps",
              "constructor",
              "getDerivedStateFromProps",
              "state",
              "getDerivedStateFromError",
              "getSnapshotBeforeUpdate",
              "componentDidCatch",
              "componentDidMount",
              "componentDidUpdate",
              "componentWillMount",
              "componentWillReceiveProps",
              "shouldComponentUpdate",
              "componentWillUpdate",
              "componentWillUnmount"
            ],
            rendering: ["^render.+$", "render"]
          }
        }
      ],
      "react/sort-prop-types": [
        "warn",
        {
          callbacksLast: true,
          requiredFirst: true,
          ignoreCase: true,
          sortShapeProp: true
        }
      ],
      "react/static-property-placement": ["error", "static public field"],
      "react/style-prop-object": "error",
      "react/void-dom-elements-no-children": "error",

      "jsx-a11y/accessible-emoji": "warn",
      "jsx-a11y/alt-text": [
        "error",
        {
          elements: ["img", "object", "area", "input[type='image']"],
          img: ["Image"]
        }
      ],
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/anchor-is-valid": ["error", { aspects: ["noHref", "preferButton"] }],
      "jsx-a11y/aria-activedescendant-has-tabindex": "warn",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-role": ["error", { ignoreNonDOM: false }],
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/autocomplete-valid": "warn",
      "jsx-a11y/click-events-have-key-events": "error",
      "jsx-a11y/control-has-associated-label": [
        "warn",
        {
          ignoreElements: ["audio", "canvas", "embed", "input", "textarea", "tr", "video"],
          ignoreRoles: [
            "grid",
            "listbox",
            "menu",
            "menubar",
            "radiogroup",
            "row",
            "tablist",
            "toolbar",
            "tree",
            "treegrid"
          ],
          includeRoles: ["alert", "dialog"]
        }
      ],
      "jsx-a11y/heading-has-content": "error",
      "jsx-a11y/html-has-lang": "error",
      "jsx-a11y/iframe-has-title": "off",
      "jsx-a11y/img-redundant-alt": "error",
      "jsx-a11y/interactive-supports-focus": [
        "warn",
        { tabbable: ["button", "checkbox", "link", "searchbox", "spinbutton", "switch", "textbox"] }
      ],
      "jsx-a11y/label-has-associated-control": ["error", { assert: "either", depth: 3 }],
      "jsx-a11y/lang": "error",
      "jsx-a11y/media-has-caption": "warn",
      "jsx-a11y/mouse-events-have-key-events": "error",
      "jsx-a11y/no-access-key": "warn",
      "jsx-a11y/no-autofocus": ["warn", { ignoreNonDOM: true }],
      "jsx-a11y/no-distracting-elements": ["warn", { elements: ["marquee", "blink"] }],
      "jsx-a11y/no-interactive-element-to-noninteractive-role": [
        "error",
        { tr: ["none"] }
      ],
      "jsx-a11y/no-noninteractive-element-interactions": [
        "warn",
        {
          handlers: [
            "onClick",
            "onError",
            "onMouseDown",
            "onMouseUp",
            "onKeyDown",
            "onKeyUp",
            "onKeyPress",
            "onFocus",
            "onBlur",
            "onChange",
            "onInput",
            "onSubmit"
          ]
        }
      ],
      "jsx-a11y/no-noninteractive-tabindex": ["error", { tags: [], roles: ["tabpanel"] }],
      "jsx-a11y/no-onchange": "off",
      "jsx-a11y/no-redundant-roles": "warn",
      "jsx-a11y/no-static-element-interactions": [
        "warn",
        { allowExpressionValues: true, handlers: ["onClick", "onKeyDown", "onKeyUp", "onKeyPress"] }
      ],
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
      "jsx-a11y/scope": "error",
      "jsx-a11y/tabindex-no-positive": "error",

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
          devDependencies: ["**/*.test.{js,jsx,ts,tsx}", "**/*.spec.{js,jsx,ts,tsx}", "test/**", "scripts/**"],
          optionalDependencies: false
        }
      ],
      "import/no-cycle": ["error", { maxDepth: 1 }],
      "import/no-mutable-exports": "error",
      "import/no-named-as-default": "error",
      "import/no-self-import": "error",

      "eslint-comments/no-unused-disable": "error",
      "eslint-comments/no-duplicate-disable": "error",
      "eslint-comments/require-description": ["warn", { ignore: ["eslint-disable-next-line"] }],
      "eslint-comments/no-use": "off",

      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-function-return-type": ["warn", { allowExpressions: true, allowTypedFunctionExpressions: true }],
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-extra-non-null-assertion": "error",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/prefer-regexp-exec": "warn",
      "@typescript-eslint/prefer-string-starts-ends-with": "warn",
      "@typescript-eslint/prefer-ts-expect-error": "error",
      "@typescript-eslint/restrict-plus-operands": "warn",
      "@typescript-eslint/strict-boolean-expressions": "warn",

      semi: ["error", "always"],
      quotes: ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
      "jsx-quotes": ["error", "prefer-double"],
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

  return [...baseConfigArray, reactSection];
}
