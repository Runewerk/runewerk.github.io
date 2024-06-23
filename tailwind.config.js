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
        'blink': {
          '0%, 49%': { opacity: '0' },
          '50%, 100%': { opacity: '1' },
        },
      },
      animation: {
        'hue-rotate': 'hue-rotate 10s linear infinite',
        'blink': 'blink 1s infinite',
      },
    },
  },
  plugins: [],
}

