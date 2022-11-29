/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        square: 'var(--square-size)',
      },
      width: {
        square: 'var(--square-size)',
      },
    },
  },
  plugins: [],
}
