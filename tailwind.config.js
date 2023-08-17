/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neutral-black': '#060606',
        'neutral-silver': {
          100: '#E6E9ED',
          200: '#C4C9CF',
          300: '#8E939C',
          400: '#646A73',
          500: '#43474F',
          600: '#25292E',
          700: '#15181C',
        },
        'brand-gold': '#FFB447',
        'brand-uva': '#7C59DE',
      },
      fontFamily: {
        'archivo': ['Archivo', 'sans-serif'],
        'thunder': ['ThunderLight', 'sans-serif'],
        'thunder-bold': ['Thunder', 'sans-serif'],
      },
    },
  },
  plugins: [],
}