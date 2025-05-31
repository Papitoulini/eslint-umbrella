// 2. Create “eslint.config.js” at the root of your eslint-umbrella repo:

import createBaseConfig from "./base.config.js";

export default [
  // Use your base config to lint this project itself
  ...createBaseConfig()
];
