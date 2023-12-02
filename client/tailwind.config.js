/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {}
  },
  darkMode: "class",
  plugins: [require('@tailwindcss/typography'),
  nextui({
    themes: {
      light: {
        colors: {
          selection: "#FF6BD5"
        },
        borderWeights: {
          none: "0px",
        },
      },
      dark: {
        borderWeights: {
          none: "0px",
        },
      }
    }
  })]
};