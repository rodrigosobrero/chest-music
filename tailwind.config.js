/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 10s linear infinite'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100vw)' },
          '0%': { transform: 'translateX(-100%)' }
        }
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          xl: '0rem',
        }
      },
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
        'brand-bronze': '#C58831',
        'brand-uva': '#7C59DE',
        'brand-uva-light': '#B296FF',
        'error-red': '#FF3636'
      },
      fontFamily: {
        'archivo': ['Archivo', 'sans-serif'],
        'thunder': ['ThunderLight', 'sans-serif'],
        'thunder-bold': ['Thunder', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
  ],
}