import base from "./base.js";
export default function test() {
	return [
		...base(),
		{ languageOptions: { globals: {
			describe: "readonly", it: "readonly", test: "readonly", expect: "readonly",
			beforeAll: "readonly", afterAll: "readonly", beforeEach: "readonly", afterEach: "readonly"
		} },
		rules: { "no-undef": "off" } }
	];
}
