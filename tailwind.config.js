/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)", "sans-serif"],
      },
      colors: {
        "chetwode-blue": "#8284fa",
        "cod-gray": "#121212",
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        ":root": {
          "--color-chetwode-blue": theme("colors.chetwode-blue"),
          "--color-cod-gray": theme("colors.cod-gray"),
        },
      });
    },
  ],
};
