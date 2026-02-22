/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#800020",   // Deep Maroon
        secondary: "#5D3FD3", // Royal Purple
        gold: "#D4AF37",
        soft: "#F8F5F2",
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};