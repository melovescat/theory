/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f8ff',
          100: '#d4e6ff',
          200: '#a9ccff',
          300: '#7db1ff',
          400: '#5399ff',
          500: '#2b7eff',
          600: '#1d61db',
          700: '#1446aa',
          800: '#0d2f78',
          900: '#071a47'
        }
      }
    }
  },
  plugins: []
};
