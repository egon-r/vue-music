module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "@vue/standard",
    "@vue/typescript/recommended",
    "plugin:tailwindcss/recommended"
  ],
  overrides: [{
    files: ["cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}"],
    extends: ["plugin:cypress/recommended"]
  }],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    quotes: [2, "double", { avoidEscape: true }],
  }
}
