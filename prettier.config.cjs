/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  singleQuote: false,
  trailingComma: "all",
  semi: true,
  proseWrap: "always",
};

module.exports = config;
