/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      colors: {
        green: {
          500: '#96DA84'
        },
        gray:{100:'#F2F2F2',200:'RGBA(0,0,0,0.4)'},
      },
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif']
    },
  },
  plugins: [],
}}
