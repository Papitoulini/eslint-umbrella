import security from "eslint-plugin-security";

import base from "./base.js";

/** @returns {import('eslint').Linter.FlatConfig[]} */
export default function express() {
	return [
		...base(),
		{ ignores: ["dist", "build", "coverage"] },	
		{
			plugins: { security },
			rules: {
				/* ---------- Server-friendly overrides ---------- */
				// Servers usually allow logging:
				"no-console": "off",

				/* ---------- Import hygiene ---------- */
				// Disallow requiring deps not listed in package.json
				"import/no-extraneous-dependencies": ["error", {
					devDependencies: [
						"**/*.test.*",
						"**/*.spec.*",
						"**/tests/**",
						"**/scripts/**",
						"**/*.config.*",
						"**/eslint.config.*"
					],
					optionalDependencies: false,
					peerDependencies: true
				}],

				/* ---------- Security checks (pragmatic set) ---------- */
				// Avoid eval and similar dynamic code execution
				"no-restricted-syntax": [
					"error",
					{ selector: "CallExpression[callee.name='eval']", message: "Avoid eval() in Node." },
					{ selector: "NewExpression[callee.name='Function']", message: "Avoid new Function() in Node." }
				],
				"security/detect-child-process": "warn",
				"security/detect-non-literal-fs-filename": "warn",
				"security/detect-non-literal-regexp": "off",
				"security/detect-possible-timing-attacks": "warn",
				"security/detect-unsafe-regex": "warn",
				// Too noisy for route objects & query builders:
				"security/detect-object-injection": "off",

				/* ---------- Promise discipline (adds to base) ---------- */
				"promise/catch-or-return": ["warn", { allowThen: true, terminationMethod: ["catch", "finally"] }],
				"promise/no-return-in-finally": "error",
				"promise/prefer-await-to-then": "warn",
				"promise/prefer-await-to-callbacks": "off"
			}
		}
	];
}
