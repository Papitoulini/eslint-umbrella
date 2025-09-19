import base from "./base.js";

/** @returns {import('eslint').Linter.FlatConfig[]} */
export default function nest() {
	return [
		...base(),
		{ ignores: ["dist", "build", "coverage"] },	
		{
			// Node-ish globals commonly used in Nest environments
			languageOptions: {
				globals: {
					process: "readonly",
					__dirname: "readonly",
					__filename: "readonly",
					module: "readonly",
					require: "readonly"
				}
			},

			rules: {
				/* ----- Server-friendly relaxations for Nest patterns ----- */
				// Constructors with only DI are fine
				"no-useless-constructor": "off",

				// Allow empty constructors/handlers when required by decorators/DI
				"no-empty-function": ["warn", { allow: ["constructors", "methods"] }],

				// Nest handlers/providers often don't need `this`
				"class-methods-use-this": "off",

				/* ----- General safety ----- */
				"no-restricted-syntax": [
					"error",
					{ selector: "CallExpression[callee.name='eval']", message: "Avoid eval() in Node." },
					{ selector: "NewExpression[callee.name='Function']", message: "Avoid new Function() in Node." }
				],

				/* ----- Promise discipline (base already enables most good ones) ----- */
				// Keep this mild guard for route handlers/services
				"promise/catch-or-return": ["warn", { allowThen: true, terminationMethod: ["catch", "finally"] }]
			}
		}
	];
}
