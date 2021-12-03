const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {},
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        8: ['8px', '1'],
        9: ['9px', '1'],
        10: ['10px', '1'],
        11: ['11px', '1'],
        12: ['12px', '1'],
        14: ['14px', '1'],
        xxs: '0.6875rem',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      margin: ['last'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
