/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./docs/**/*.{html,js}'],
  darkMode: 'selector',
  theme: {
    extend: {
      keyframes: {
        'hue-rotate': {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
      },
      animation: {
        'hue-rotate': 'hue-rotate 20s linear infinite',
      },
    },
  },
  plugins: [],
}

