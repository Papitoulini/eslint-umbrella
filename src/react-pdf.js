import reactHooks from "eslint-plugin-react-hooks";

import base from "./base.js";
export default function reactPdf() {
	return [
		...base(),
		{ plugins: { "react-hooks": reactHooks },
			languageOptions: { globals: { process: "readonly", Buffer: "readonly" } },
			rules: {
				"react-hooks/rules-of-hooks": "error",
				"react-hooks/exhaustive-deps": "warn"
			} }
	];
}
