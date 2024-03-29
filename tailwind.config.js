/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{js,tsx,ts,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', ...defaultTheme.fontFamily.sans],
      }
    },
    colors: {
      ...colors,
      general: '#53576D',
      primaryBlack: '#0f111e',
      primaryWhite: '#EEF0F4',
      accent: {
        primary: '#2e86fa',
        secondary: '#ffd348'
      },
      textLight: '#8c8e9d',
      selectedTextLight: '#fafafc',
      divider: '#3d3f49',
      dividerDark: '#DFDFDF',
      powderBlue: '#e1eff8',
      hallifyWhite: '#EEF0F4'
    }
  },
  plugins: [],
}
