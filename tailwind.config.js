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
        "ghost-white": "#f9f9ff",
        azure: "#3f7ce2",
        "pigment-blue": "#3035a1",
        "midnight-blue": "#251e7c",
        "purple-navy": "#4d4d73",
        black: "#000000",
        gray: "#757575",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
});
