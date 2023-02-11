/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      
        'danube': {
          '50': '#f4f7fb',
          '100': '#e7eff7',
          '200': '#cadeed',
          '300': '#9cc2dd',
          '400': '#64a0c9',
          '500': '#4386b4',
          '600': '#316b98',
          '700': '#29567b',
          '800': '#254967',
          '900': '#243f56',
        },
      },
    },
  },
  plugins: [],
}