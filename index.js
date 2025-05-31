// eslint-config-custom/index.js

import createBaseConfig from "./base.config.js";
import createReactConfig from "./react.config.js";
import createNextConfig from "./next.config.js";
import createNodeConfig from "./node.config.js";

// 1) Export factory functions so that advanced users can pass options:
export {
  createBaseConfig,
  createReactConfig,
  createNextConfig,
  createNodeConfig
};

// 2) Export “default” static configs (no-options):
//    • Base default: createBaseConfig()
//    • React default: createReactConfig()
//    • Next default: createNextConfig()
//    • Node default: createNodeConfig()
const baseDefault = createBaseConfig();
const reactDefault = createReactConfig();
const nextDefault = createNextConfig();
const nodeDefault = createNodeConfig();

// 3) For backward-compatibility / quick imports, we’ll export named defaults:
export { 
  baseDefault as base, 
  reactDefault as react, 
  nextDefault as next, 
  nodeDefault as node 
};

// 4) Finally, make the overall “default export” the base config itself:
export default baseDefault;
