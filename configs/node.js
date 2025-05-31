import createDefaultConfig from "./default.js";
import globals from "globals";

export default [
  ...createDefaultConfig({
    jsx: false,
    a11y: false,
    unicorn: true,
    importSort: true,
  }),
  {
    name: "eslint-umbrella/node",
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.nodeBuiltin,
      },
    },
    rules: {
      "no-process-env": "off",
    },
  },
];
