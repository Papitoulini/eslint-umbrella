import eslintJs from "@eslint/js";
import eslintPluginStylistic from "@stylistic/eslint-plugin";
import eslintPluginImportX from "eslint-plugin-import-x";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";

const createDefaultConfig = (options = {}) => {
  const {
    jsx = false,
    a11y = jsx,
    unicorn = true,
    importSort = true,
  } = options;

  const baseConfigs = [
    eslintJs.configs.recommended,
    eslintPluginStylistic.configs.customize({
      arrowParens: true,
      braceStyle: "1tbs",
      commaDangle: "always-multiline",
      indent: "tab",
      quoteProps: "as-needed",
      quotes: "double",
      semi: true,
      jsx,
      maxLen: 120,
      objectCurlySpacing: "always",
      spaceBeforeFunctionParen: {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      },
    }),
    ...(unicorn ? [eslintPluginUnicorn.configs.recommended] : []),
    ...(importSort ? [eslintPluginImportX.flatConfigs.recommended] : []),
    ...(a11y ? [eslintPluginJsxA11y.configs.recommended] : []),
  ];

  const sharedSettings = {
    name: "eslint-umbrella/default",
    linterOptions: { reportUnusedDisableDirectives: "error" },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx } },
      globals: {
        ...globals.nodeBuiltin,
        ...(jsx ? globals.browser : {}),
      },
    },
    settings: { react: { version: "detect" } },
    rules: {
      "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "@stylistic/comma-spacing": "error",
      "@stylistic/func-call-spacing": "error",
      "@stylistic/function-paren-newline": ["error", "consistent"],
      "@stylistic/indent": ["error", "tab", { SwitchCase: 1 }],
      "@stylistic/keyword-spacing": "error",
      "@stylistic/lines-between-class-members": "error",
      "@stylistic/max-len": [
        "error",
        {
          code: 120,
          tabWidth: 2,
          ignoreUrls: true,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      "@stylistic/no-extra-semi": "error",
      "@stylistic/no-mixed-operators": [
        "error",
        {
          groups: [
            ["%", "**"],
            ["%", "+"],
            ["%", "-"],
            ["%", "*"],
            ["%", "/"],
            ["/", "*"],
            ["&", "|", "<<", ">>", ">>>"],
            ["==", "!=", "===", "!=="],
            ["&&", "||"],
          ],
          allowSamePrecedence: false,
        },
      ],
      "@stylistic/no-multiple-empty-lines": ["error", { max: 1 }],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "multiline-block-like", next: "*" },
      ],
      "@stylistic/quotes": ["error", "double", { allowTemplateLiterals: "avoidEscape" }],
      "@stylistic/space-before-blocks": "error",
      "@stylistic/space-before-function-paren": [
        "error",
        { anonymous: "always", named: "never", asyncArrow: "always" },
      ],
      "@stylistic/space-infix-ops": "error",
      "@stylistic/wrap-iife": ["error", "inside", { functionPrototypeMethods: true }],

      "array-callback-return": ["error", { allowImplicit: true }],
      "func-names": ["error", "never"],
      "no-async-promise-executor": "error",
      "no-await-in-loop": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-cond-assign": ["error", "always"],
      "no-constant-condition": ["error", { checkLoops: false }],
      "no-debugger": "error",
      "no-duplicate-case": "error",
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-ex-assign": "error",
      "no-extra-bind": "error",
      "no-extra-label": "error",
      "no-func-assign": "error",
      "no-global-assign": ["error", { exceptions: [] }],
      "no-implied-eval": "error",
      "no-iterator": "error",
      "no-label-var": "error",
      "no-labels": ["error", { allowLoop: false, allowSwitch: false }],
      "no-lone-blocks": "error",
      "no-mixed-spaces-and-tabs": "error",
      "no-multi-spaces": "error",
      "no-multi-str": "error",
      "no-new": "error",
      "no-new-func": "error",
      "no-new-wrappers": "error",
      "no-proto": "error",
      "no-redeclare": "error",
      "no-return-await": "error",
      "no-self-assign": ["error", { props: true }],
      "no-self-compare": "error",
      "no-sequences": "error",
      "no-throw-literal": "error",
      "no-unmodified-loop-condition": "error",
      "no-unused-expressions": ["error", { allowShortCircuit: true, allowTernary: true }],
      "no-unused-labels": "error",
      "no-useless-call": "error",
      "no-useless-concat": "error",
      "no-useless-escape": "error",
      "no-useless-return": "error",
      "no-void": "error",
      "no-warning-comments": ["warn", { terms: ["todo", "fixme", "xxx"], location: "start" }],
      "prefer-promise-reject-errors": ["error", { allowEmptyReject: true }],
        radix: ["error", "always"],
      "require-await": "error",
      "require-unicode-regexp": "error",
      yoda: ["error", "never"],

      "callback-return": ["error", ["callback", "cb", "next"]],
      "global-require": "error",
      "handle-callback-err": ["error", "^.*(e|E)rr"],
      "no-buffer-constructor": "error",
      "no-mixed-requires": ["error", { grouping: true, allowCall: false }],
      "no-new-require": "error",
      "no-path-concat": "error",
      "no-process-env": "warn",
      "no-sync": "warn",

      ...(importSort
        ? {
            "import-x/default": "off",
            "import-x/extensions": ["error", "ignorePackages"],
            "import-x/namespace": "off",
            "import-x/no-anonymous-default-export": "error",
            "import-x/no-duplicates": ["error", { considerQueryString: true, "prefer-inline": true }],
            "import-x/no-named-as-default": "off",
            "import-x/no-named-as-default-member": "off",
            "import-x/order": ["error", {
              "newlines-between": "always",
              distinctGroup: true,
              named: { enabled: true, types: "types-last" },
              alphabetize: { order: "asc", orderImportKind: "asc", caseInsensitive: true },
              pathGroupsExcludedImportTypes: [],
              groups: ["builtin", "external", "internal", "parent", "sibling", "index", "type"],
              sortTypesGroup: true,
              pathGroups: [
                { pattern: "#assets/**", group: "internal" },
                { pattern: "#constants/**", group: "internal", position: "after" },
                { pattern: "#components/**", group: "internal", position: "after" },
                { pattern: "#hooks/**", group: "internal", position: "after" },
                { pattern: "#styles/**", group: "internal", position: "after" },
                { pattern: "#utils/**", group: "internal", position: "after" }
              ],
            }],
            "import-x/prefer-default-export": "off",
          }
        : {}),

      ...(unicorn
        ? {
            "unicorn/consistent-destructuring": "error",
            "unicorn/error-message": "error",
            "unicorn/no-array-callback-reference": "off",
            "unicorn/no-for-loop": "off",
            "unicorn/no-nested-ternary": "off",
            "unicorn/no-null": "off",
            "unicorn/prefer-switch": ["error", { emptyDefaultCase: "do-nothing-comment" }],
            "unicorn/prevent-abbreviations": "off",
            "unicorn/require-array-join-separator": "error",
            "unicorn/string-content": "off",
          }
        : {}),

      ...(jsx
        ? {
            "react/jsx-boolean-value": ["error", "never"],
            "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
            "react/jsx-indent": ["error", "tab"],
            "react/jsx-indent-props": ["error", "tab"],
            "react/jsx-key": "error",
            "react/jsx-max-props-per-line": ["error", { maximum: 3 }],
            "react/jsx-sort-props": ["error", {
              callbacksLast: true,
              shorthandFirst: true,
              shorthandLast: false,
              ignoreCase: true,
              reservedFirst: true,
            }],
            "react/jsx-wrap-multilines": ["error", {
              declaration: "parens-new-line",
              assignment: "parens-new-line",
              return: "parens-new-line",
              arrow: "parens-new-line",
              condition: "parens-new-line",
              logical: "parens-new-line",
              prop: "parens-new-line",
            }],
            "react/react-in-jsx-scope": "off",
          }
        : {}),

      ...(a11y
        ? {
            "jsx-a11y/accessible-emoji": "warn",
            "jsx-a11y/alt-text": ["error", {
              elements: ["img", "object", "area", "input[type='image']"],
              img: ["Image"],
              object: [],
              area: [],
              "input[type='image']": [],
            }],
            "jsx-a11y/anchor-has-content": "error",
            "jsx-a11y/anchor-is-valid": ["error", { aspects: ["noHref", "invalidHref"] }],
            "jsx-a11y/aria-activedescendant-has-tabindex": "error",
            "jsx-a11y/aria-props": "error",
            "jsx-a11y/aria-proptypes": "error",
            "jsx-a11y/aria-role": ["error", { ignoreNonDOM: false }],
            "jsx-a11y/aria-unsupported-elements": "error",
            "jsx-a11y/click-events-have-key-events": "error",
            "jsx-a11y/heading-has-content": "error",
            "jsx-a11y/html-has-lang": "error",
            "jsx-a11y/iframe-has-title": "error",
            "jsx-a11y/img-redundant-alt": "error",
            "jsx-a11y/interactive-supports-focus": "error",
            "jsx-a11y/label-has-associated-control": ["error", {
              labelComponents: [],
              labelAttributes: [],
              controlComponents: [],
              assert: "htmlFor",
              depth: 25,
            }],
            "jsx-a11y/lang": "error",
            "jsx-a11y/media-has-caption": "error",
            "jsx-a11y/mouse-events-have-key-events": "error",
            "jsx-a11y/no-access-key": "error",
            "jsx-a11y/no-autofocus": ["error", { ignoreNonDOM: true }],
            "jsx-a11y/no-distracting-elements": ["error", { elements: ["marquee", "blink"] }],
            "jsx-a11y/no-redundant-roles": "error",
            "jsx-a11y/no-static-element-interactions": ["error", {
              handlers: ["onClick", "onError", "onLoad", "onMouseDown", "onMouseUp", "onKeyPress", "onKeyDown", "onKeyUp"],
            }],
            "jsx-a11y/role-has-required-aria-props": "error",
            "jsx-a11y/role-supports-aria-props": "error",
            "jsx-a11y/scope": "error",
          }
        : {}),
    },
  };

  return baseConfigs.map((cfg) => ({
    ...cfg,
    ...sharedSettings,
  }));
};

export default createDefaultConfig;
export const configWithJsx = createDefaultConfig({ jsx: true, a11y: true });
