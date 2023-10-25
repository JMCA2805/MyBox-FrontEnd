const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      ssm: { min: "320px", max: "575px" },
      sm: { min: "576px", max: "767px" },
      md: { min: "768px", max: "991px" },
      lg: { min: "992px", max: "1199px" },
      xl: { min: "1200px" },
    },
    extend: {
      colors: {
        white: "#ffffff",
        "white-smoke": "#f5f5f5",
        gray: "#757575",
        "pastel-orange": "#ffb74d",
        "dark-tangerine": "#ffa726",
        "pizazz": "#FF9100",
        "blaze-orange": "#FF6D00",
        woodsmoke: "#141414",
        black: "#000000",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
});
