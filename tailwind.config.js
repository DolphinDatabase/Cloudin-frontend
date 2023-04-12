/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      colors: {
        green: {
          500: '#96DA84',
          100: '#00CB54'
        },
        gray: { 
          100: '#F2F2F2', 
          200: 'RGBA(0,0,0,0.4)', 
          201: 'RGBA(0,0,0,0.6)', 
          300: '#787878' 
        },
        white: {
          100: '#FFFFFF',
          200: '#F8F8F8',

        },
        red: {
          100: '#FF5344'
        },
        yellow: {
          100: '#FFCF4F'
        }
      },
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif']
      },
    },
    letterSpacing: {
      '1': '0em',
      '2': '0.025em',
      '3': '0.05em',
      '4': '0.1em',
    },
    plugins: [],
  }
}
