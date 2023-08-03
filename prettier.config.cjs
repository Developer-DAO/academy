/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  singleQuote: true,
  trailingComma: "all",
  semi: false,
  proseWrap: "always",
};

module.exports = config;
