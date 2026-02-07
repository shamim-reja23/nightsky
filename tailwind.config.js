/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#05070c",
        starPrimary: "#ffffff",
        starSecondary: "#9bb7ff",
        accent: "#f5e6a8",
      },
    },
  },
  plugins: [],
};
