// src/index.js

// Import each preset’s default export:
import baseTypeChecked from "./base-typechecked.js";
import base from "./base.js";
import express from "./express.js";
import nestTypeChecked from "./nest-typechecked.js";
import nest from "./nest.js";
import next from "./next.js";
import reactNative from "./react-native.js";
import reactPdf from "./react-pdf.js";
import react from "./react.js";

// Re-export as **named** exports:
export {
	base,
	baseTypeChecked,
	react,
	next,
	express,
	nest,
	reactNative,
	reactPdf,
	nestTypeChecked,
};

// Optional: also provide a default object for people who prefer it.
// (Named imports are better for tree-shaking.)
export default {
	base,
	baseTypeChecked,
	react,
	next,
	express,
	nest,
	reactNative,
	reactPdf,
	nestTypeChecked,
};
