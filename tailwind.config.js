const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: "335px",
      "semi-sm": "460px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontSize: {
      xs: "0.71rem",
      sm: "0.875rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    colors: {
      ...defaultTheme.colors,
      red: "#EF476F",
      "light-red": "#f87171",
      blue: "#457B9D",
      "light-blue": "#06b6d4",
      white: "#FFFFFF",
      black: "#000000",
      "dark-gray": "#4b5563",
      "light-gray": "#d1d5db",
      gray: "#6b7280",
      "extra-gray": "#f1f5f9",
      "light-choose": "#4ade80",
      "semi-choose": "#22c55e",
    },
    extend: {
      boxShadow: {
        "3xl":
          "rgba(255, 255, 255, 0.3) 0px 1px 2px 0px, rgba(255, 255, 255, 0.15) 0px 0px 4px 3px",
      },
      backgroundImage: {
        "nav-background": "url('../public/images/background.png')",
        light: "linear-gradient(to right, #fff, #ffffff)",
        dark: "linear-gradient(to left, #614385 0%, #516395 100%)",
      },
    },
  },
  plugins: [],
};
