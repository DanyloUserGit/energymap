/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#FFC94D",
          yellowDark: "#E0AD3A",
          blue: "#0077B6",
          blueDark: "#005F8A",
          grayLight: "#F7F8FA",
          gray: "#A0A0A0",
          grayDark: "#3F3F3F",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.08)",
        soft: "0 4px 20px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
