// eslint.config.js
import { nextConfig, nodeConfig, reactConfig } from "./index.js";

//
// 0) Tell ESLint to ignore all files under "configs/" –
//    this prevents it from trying to interpret default.js, react.js, etc. as configs.
//
const ignoreConfigs = {
	ignores: ["configs/**/*.js"],
};

//
// 1) Everything that is not JSX/Next uses `nodeConfig` by default:
//
const baseNode = [...nodeConfig];

//
// 2) For any `.jsx` or `.tsx` file, apply the React rules:
//
const forReact = [
	{
		files: ["**/*.jsx", "**/*.tsx"],
		...reactConfig[0],
	},
];

//
// 3) For any file under `apps/frontend/**/*.{js,jsx,ts,tsx}`, apply Next rules:
//
const forNext = [
	{
		files: ["apps/frontend/**/*.{js,jsx,ts,tsx}"],
		...nextConfig[0],
	},
];

//
// 4) Export a single flat array. The very first entry is our "ignoreConfigs" object:
//

const config = [
	// (A) Ignore the entire configs/ directory
	ignoreConfigs,

	// (B) Node fallback for everything else
	...baseNode,

	// (C) React overrides for .jsx/.tsx
	...forReact,

	// (D) Next overrides under apps/frontend
	...forNext,
]

export default config;
