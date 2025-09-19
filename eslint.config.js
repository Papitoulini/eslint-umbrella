// eslint.config.js
import base from "./src/base.js";

export default [
  ...base(),
  { files: ["src/**/*.{js,ts}"],
         rules: {
      // These rules are noisy/meaningless for plugin objects in config files
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off"
    }}
  
];
