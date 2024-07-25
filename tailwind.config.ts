import type { Config } from "tailwindcss";

const config = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    fontFamily: {
      display: ["var(--font-eugusto)", "system-ui"],
    },
    extend: {
      keyframes: {
        fade: {
          "0%": { opacity: "0" },
          "25%": { opacity: "1" },
          "75%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        fade: "fade 4s linear infinite",
      },
      boxShadow: {
        "fab-default": "0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)",
        "fab-hover": "0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3)",
        "fab-pressed": "0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        darkColors: {
          600: "#000000",
          700: "#506172",
          900: "#1A2A54",
        },
        redPink: {
          500: "#FC5555",
        },
        greyTones: {
          300: "#EFF4F7",
          400: "#DED5C6",
          500: "#C9BEBE",
          600: "#BAAEAE",
        },
        brownBeige: {
          500: "#BDAB8C",
          510: "#A89B7E", // 10% darker for hover
          520: "#948B70", // 20% darker for pressed
          600: "#4C4438",
        },
      },
    },
  },
} satisfies Config;

// eslint-disable-next-line import/no-unused-modules
export default config;
