// configs/index.js

import createDefaultConfig, { configWithJsx } from "./configs/default.js";
import nextConfig from "./configs/next.js";
import nodeConfig from "./configs/node.js";
import reactConfig from "./configs/react.js";

/**
 * Factory functions for custom usage:
 *   • createDefaultConfig(options)  – returns an array of base ESLint configs
 *   • configWithJsx                 – equivalent to createDefaultConfig({ jsx: true, a11y: true })
 *
 * Ready-made, no-options config arrays:
 *   • nodeConfig    – the “node” variant (base + Node override)
 *   • reactConfig   – the “react” variant (base(JSX+a11y) + React plugin)
 *   • nextConfig    – the “next” variant (base(JSX+a11y) + Next.js plugin)
 */
export {
	configWithJsx,
	createDefaultConfig,
	nextConfig,
	nodeConfig,
	reactConfig
};

// (Optional) If you want a default export—export the base factory function:
export default createDefaultConfig;
