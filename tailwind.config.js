/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

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
      general: '#53576D',
      primaryBlack: '#0f111e',
      accent: {
        primary: '#2e86fa',
        secondary: '#ffd348'
      },
      textLight: '#8c8e9d',
      selectedTextLight: '#fafafc',
      divider: '#3d3f49',
      powderBlue: '#e1eff8',
    }
  },
  plugins: [],
}
