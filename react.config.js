// eslint-config-custom/react.config.js

import path from "path";
import { FlatCompat } from "@eslint/eslintrc";
import createBaseConfig from "./base.config.js";

// Default options specifically for React config:
const reactDefaultOptions = {
  // Forwarded to createBaseConfig
  baseOptions: {},

  // Whether to include full Airbnb (React + import + JSX-a11y) on top of base
  enableAirbnbFull: true,

  // Whether to include react/recommended and jsx-a11y/recommended
  enableReactRecommended: true,
  enableJsxA11yRecommended: true,

  // Always keep Prettier on last
  enablePrettier: true,

  // Any extra React-specific rule overrides
  extraRules: {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off"
  }
};

/**
 * Factory: createReactConfig(customOptions)
 *
 * @param {Object} customOptions
 * @param {Object} [customOptions.baseOptions]             // forwarded to createBaseConfig
 * @param {boolean} [customOptions.enableAirbnbFull]
 * @param {boolean} [customOptions.enableReactRecommended]
 * @param {boolean} [customOptions.enableJsxA11yRecommended]
 * @param {boolean} [customOptions.enablePrettier]
 * @param {Object} [customOptions.extraRules]
 *
 * @returns {Array} Flat-config array for React projects
 */
export default function createReactConfig(customOptions = {}) {
  const opts = {
    ...reactDefaultOptions,
    ...customOptions,
    baseOptions: {
      ...reactDefaultOptions.baseOptions,
      ...(customOptions.baseOptions || {})
    },
    extraRules: {
      ...reactDefaultOptions.extraRules,
      ...(customOptions.extraRules || {})
    }
  };

  // 1) Create the base configs first (TS + Google/Airbnb-base/Standard + Prettier etc.)
  const baseConfigArray = createBaseConfig(opts.baseOptions);

  // 2) FlatCompat to wrap legacy “airbnb” + “plugin:react/recommended” + “plugin:jsx-a11y/recommended”
  const compat = new FlatCompat({
    baseDirectory: path.resolve(new URL(import.meta.url).pathname, ".")
  });

  // 3) Build a list of “extends” on top of base
  const extendsList = [];
  if (opts.enableAirbnbFull) extendsList.push("airbnb");
  if (opts.enableReactRecommended) extendsList.push("plugin:react/recommended");
  if (opts.enableJsxA11yRecommended)
    extendsList.push("plugin:jsx-a11y/recommended");
  if (opts.enablePrettier) extendsList.push("plugin:prettier/recommended");

  // 4) React-specific section (applies to all .jsx/.tsx)
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
        react: require("eslint-plugin-react"),
        "jsx-a11y": require("eslint-plugin-jsx-a11y"),
        import: require("eslint-plugin-import"),
        "eslint-comments": require("eslint-plugin-eslint-comments"),
        ...(opts.enablePrettier ? { prettier: require("eslint-plugin-prettier") } : {})
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
          },
          node: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
            paths: ["src"]
          }
        }
      }
    },
    // 5) Extend the selected presets
    ...compat.extends(...extendsList),
    // 6) React-specific rules + extraRules
    rules: {
      // ==== React Plugin Rules ====
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

      // ==== JSX-A11Y Plugin Rules ====
      "jsx-a11y/accessible-emoji": "warn",
      "jsx-a11y/alt-text": [
        "error",
        {
          elements: ["img", "object", "area", "input[type='image']"],
          img: ["Image"]
        }
      ],
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          aspects: ["noHref", "preferButton"]
        }
      ],
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
          ignoreRoles: ["grid", "listbox", "menu", "menubar", "radiogroup", "row", "tablist", "toolbar", "tree", "treegrid"],
          includeRoles: ["alert", "dialog"]
        }
      ],
      "jsx-a11y/heading-has-content": "error",
      "jsx-a11y/html-has-lang": "error",
      "jsx-a11y/iframe-has-title": "off",
      "jsx-a11y/img-redundant-alt": "error",
      "jsx-a11y/interactive-supports-focus": [
        "warn",
        {
          tabbable: ["button", "checkbox", "link", "searchbox", "spinbutton", "switch", "textbox"]
        }
      ],
      "jsx-a11y/label-has-associated-control": [
        "error",
        {
          assert: "either",
          depth: 3
        }
      ],
      "jsx-a11y/lang": "error",
      "jsx-a11y/media-has-caption": "warn",
      "jsx-a11y/mouse-events-have-key-events": "error",
      "jsx-a11y/no-access-key": "warn",
      "jsx-a11y/no-autofocus": ["warn", { ignoreNonDOM: true }],
      "jsx-a11y/no-distracting-elements": ["warn", { elements: ["marquee", "blink"] }],
      "jsx-a11y/no-interactive-element-to-noninteractive-role": ["error", { tr: ["none"] }],
      "jsx-a11y/no-noninteractive-element-interactions": [
        "warn",
        {
          handlers: ["onClick", "onError", "onMouseDown", "onMouseUp", "onKeyDown", "onKeyUp", "onKeyPress", "onFocus", "onBlur", "onChange", "onInput", "onSubmit"]
        }
      ],
      "jsx-a11y/no-noninteractive-tabindex": [
        "error",
        {
          tags: [],
          roles: ["tabpanel"]
        }
      ],
      "jsx-a11y/no-onchange": "off",
      "jsx-a11y/no-redundant-roles": "warn",
      "jsx-a11y/no-static-element-interactions": [
        "warn",
        {
          allowExpressionValues: true,
          handlers: ["onClick", "onKeyDown", "onKeyUp", "onKeyPress"]
        }
      ],
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
      "jsx-a11y/scope": "error",
      "jsx-a11y/tabindex-no-positive": "error",

      // ==== Import Plugin Rules ====
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
            "**/*.test.{js,jsx,ts,tsx}",
            "**/*.spec.{js,jsx,ts,tsx}",
            "test/**",
            "scripts/**"
          ],
          optionalDependencies: false
        }
      ],
      "import/no-cycle": ["error", { maxDepth: 1 }],
      "import/no-mutable-exports": "error",
      "import/no-named-as-default": "error",
      "import/no-self-import": "error",

      // ==== ESLint-comments Plugin Rules ====
      "eslint-comments/no-unused-disable": "error",
      "eslint-comments/no-duplicate-disable": "error",
      "eslint-comments/require-description": ["warn", { ignore: ["eslint-disable-next-line"] }],
      "eslint-comments/no-use": "off",

      // ==== TypeScript-specific Rules via @typescript-eslint ====
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        { allowExpressions: true, allowTypedFunctionExpressions: true }
      ],
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

      // ==== Common Stylistic Rules ====
      "semi": ["error", "always"],
      "quotes": ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
      "jsx-quotes": ["error", "prefer-double"],
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

      // ==== Jest/Testing (if used) ====
      // "jest/no-disabled-tests": "warn",
      // "jest/no-focused-tests": "error",
      // "jest/no-identical-title": "error",
      // "jest/prefer-to-have-length": "warn",
      // "jest/valid-expect": "error",

      // ==== Security-related (optional if eslint-plugin-security installed) ====
      // "security/detect-object-injection": "warn",
      // "security/detect-non-literal-regexp": "warn",
      // "security/detect-eval-with-expression": "error",

      // ==== React-specific overrides from extraRules ====
      ...opts.extraRules
    }
  };

  // 7) Combine everything: [ ignorePatterns, baseFiles, reactSection ]
  return [...baseConfigArray, reactSection];
}
