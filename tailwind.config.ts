import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E84C3D",
          blue: "#003580"
        }
      },
      borderRadius: {
        "2xl": "1rem"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.18)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
