// filepath: c:\Users\msi\React\practice\cinemate\tailwind.config.js
/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        other: { min: "340px", max: "1200px" },
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
