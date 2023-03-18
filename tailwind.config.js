/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      colors: {
        green: {
          500: '#96DA84'
        }
      },
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif']
      }
    },
  },
  plugins: [],
}
