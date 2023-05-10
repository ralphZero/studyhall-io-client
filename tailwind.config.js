/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{js,tsx,ts,jsx}"],
  theme: {
    extend: {},
    colors: {
      primaryBlack: '#0f111e',
      accent: {
        primary: '#2e86fa',
        secondary: '#ffd348'
      },
      textLight: '#8c8e9d',
      selectedTextLight: '#fafafc',
      divider: '#3d3f49'
    }
  },
  plugins: [],
}
