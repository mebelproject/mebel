/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        luxury: '0 24px 80px rgba(63, 43, 20, 0.12)',
        soft: '0 14px 40px rgba(63, 43, 20, 0.08)',
      },
      colors: {
        ivory: '#f6f1e8',
        sand: '#eadfcd',
        gold: '#b89453',
        emerald: '#1f5d4f',
        ink: '#241910',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxury: '0.2em',
      },
    },
  },
  plugins: [],
};
