import nextPlugin from "@next/eslint-plugin-next";

import react from "./react.js";

/** @returns {import('eslint').Linter.FlatConfig[]} */
export default function next() {
	return [
		...react(),
		{ ignores: [".next", ".vercel", "out"] },
		{
			plugins: { "@next/next": nextPlugin },

			// Browser + Node globals commonly used in Next apps
			languageOptions: {
				globals: {
					window: "readonly",
					document: "readonly",
					navigator: "readonly",
					fetch: "readonly",
					URL: "readonly",
					Request: "readonly",
					Response: "readonly",
					Headers: "readonly",
					process: "readonly"
				}
			},

			rules: {
				"@next/next/no-img-element": "off",
				"@next/next/no-sync-scripts": "error",
				"@next/next/inline-script-id": "error",
				"@next/next/no-css-tags": "error",
				"@next/next/no-document-import-in-page": "error",
				"@next/next/no-unwanted-polyfillio": "error",
				"@next/next/no-typos": "error",
				"@next/next/next-script-for-ga": "warn",
				"@next/next/no-html-link-for-pages": "off"
			}
		}
	];
}
