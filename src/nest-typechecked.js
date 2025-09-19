import baseTypeChecked from "./base-typechecked.js";

/**
 * Type-aware NestJS preset (requires tsconfig).
 * @param {string[]} project - tsconfig paths (default: ["tsconfig.json"])
 * @returns {import('eslint').Linter.FlatConfig[]}
 */
export default function nestTypeChecked(project = ["tsconfig.json"]) {
	return [
		...baseTypeChecked(project),

		{
			languageOptions: {
				globals: {
					process: "readonly",
					__dirname: "readonly",
					__filename: "readonly",
					module: "readonly",
					require: "readonly"
				},
				parserOptions: {
					project
				}
			},

			rules: {
				"no-useless-constructor": "off",
				"no-empty-function": ["warn", { allow: ["constructors", "methods"] }],
				"class-methods-use-this": "off",

				// TS-specific niceties for Nest
				"@typescript-eslint/no-floating-promises": ["error", { ignoreVoid: true }],
				"@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { attributes: false } }],
				"@typescript-eslint/consistent-type-imports": [
					"error",
					{ prefer: "type-imports", fixStyle: "inline-type-imports" }
				],

				"no-restricted-syntax": [
					"error",
					{ selector: "CallExpression[callee.name='eval']", message: "Avoid eval() in Node." },
					{ selector: "NewExpression[callee.name='Function']", message: "Avoid new Function() in Node." }
				],

				"promise/catch-or-return": ["warn", { allowThen: true, terminationMethod: ["catch", "finally"] }]
			}
		}
	];
}
