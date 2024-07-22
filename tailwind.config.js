/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        itim: ['"Itim-Regular"', 'Helvetica'],
      },
      colors: {
        customColor: '#F5DDF7',
      },
    },
  },
  plugins: [],
}

