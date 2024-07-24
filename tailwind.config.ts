import type { Config } from "tailwindcss";

const config = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    fontFamily: {
      display: ["var(--font-eugusto)", "system-ui"],
    },
    extend: {
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
        },
      },
    },
  },
} satisfies Config;

export default config;
