import react from "./react.js";
import nextPlugin from "@next/eslint-plugin-next";
export default function next() {
  return [
    ...react(),
    { plugins: { "@next/next": nextPlugin }, rules: { "@next/next/no-img-element": "off" } }
  ];
}
