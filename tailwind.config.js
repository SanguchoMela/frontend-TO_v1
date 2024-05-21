/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "naranja": "#f27f1b",
      "verde-amarillo": "#a8bf56",
      "turquesa-100": "#B7D5CF",
      "turquesa-300": "#5D9896",
      "turquesa-500": "#3F8483",
      "turquesa-fuerte": "#267373",
      "blanco": "#ffffff",
      "negro": "#000000",
    },
    fontFamily: {
      titulos: ['"Lexend Exa"'],
      sans: ['"Quicksand"'],
    },
    extend: {},
  },
  plugins: [],
};
