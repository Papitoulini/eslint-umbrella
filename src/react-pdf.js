import reactHooks from "eslint-plugin-react-hooks";

import base from "./base.js";

/** @returns {import('eslint').Linter.FlatConfig[]} */
export default function reactPdf() {
	return [
		...base(),
		{ ignores: ["*.pdf"] },
		{
			plugins: { "react-hooks": reactHooks },

			// React-PDF usually runs in Node, not the browser
			languageOptions: {
				globals: {
					process: "readonly",
					Buffer: "readonly",
					__dirname: "readonly",
					__filename: "readonly",
					module: "readonly",
					require: "readonly"
				}
			},

			rules: {
				/* React Hooks basics */
				"react-hooks/rules-of-hooks": "error",
				"react-hooks/exhaustive-deps": "warn",

				/* Node-side safety */
				"no-restricted-syntax": [
					"error",
					{ selector: "CallExpression[callee.name='eval']", message: "Avoid eval() in Node." },
					{ selector: "NewExpression[callee.name='Function']", message: "Avoid new Function() in Node." }
				],

				/* Servers can log while generating PDFs */
				"no-console": "off"
			}
		}
	];
}
