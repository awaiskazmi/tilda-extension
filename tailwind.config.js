/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  darkMode: false,
  content: ["./assets/**/*.{js,ts,jsx,tsx,html}"],
  content: ["./components/**/*.{js,ts,jsx,tsx,html}"],
  content: ["./entrypoints/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      fontSize: {
        "text-xs": "12px",
        "text-sm": "14px",
        "text-base": "16px",
        "text-lg": "18px",
        "text-xl": "20px",
        "text-2xl": "24px",
        "text-3xl": "30px",
        "text-4xl": "36px",
        "text-5xl": "48px",
        "text-6xl": "60px",
        "text-7xl": "72px",
        "text-8xl": "96px",
        "text-9xl": "128px",
      },
      spacing: {
        px: "1px",
        0: "0px",
        0.5: "2px",
        1: "4px",
        1.5: "6px",
        2: "8px",
        2.5: "10px",
        3: "12px",
        3.5: "14px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
        11: "44px",
        12: "48px",
        14: "56px",
        16: "64px",
        20: "80px",
        24: "96px",
        28: "112px",
        32: "128px",
        36: "144px",
        40: "160px",
        44: "176px",
        48: "192px",
        52: "208px",
        56: "224px",
        60: "240px",
        64: "256px",
        72: "288px",
        80: "320px",
        96: "384px",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
