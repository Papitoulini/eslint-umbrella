import createDefaultConfig from "./default.js";

export default [
  ...createDefaultConfig({
    jsx: true,
    a11y: true,
    unicorn: true,
    importSort: true,
  }),

  {
    name: "eslint-umbrella/next",
    rules: { },
  },
];
