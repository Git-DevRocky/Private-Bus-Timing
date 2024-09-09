/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-bg": "url('/src/assets/bg4.jpg')",
        road: "url('/src/assets/scattered-forcefields.png')",
        err: "url('/src/assets/errr.webp')",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        silkScreen: ["Silkscreen", "sans-serif"],
      },
    },
  },

  plugins: [],
};
