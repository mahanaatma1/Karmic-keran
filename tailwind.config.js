/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        sunrise: {
          100: '#FFF7ED',
          200: '#FFE4CA',
          300: '#FFD1A7',
          400: '#FFBE84',
          500: '#FFAB61',
        },
        sunset: {
          100: '#FFF1F1',
          200: '#FFD4D4',
          300: '#FFB7B7',
          400: '#FF9A9A',
          500: '#FF7D7D',
        },
      },
    },
  },
  plugins: [],
}