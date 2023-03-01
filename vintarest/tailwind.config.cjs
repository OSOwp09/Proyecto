/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        inter:"'Inter', sans-serif"
      },
      colors: {
				"primary-dark": '#4D455D',
        "secondary-dark": '#968EA6',
        "primary-light":'#F5E9CF',
        "secondary-light":'#FFFDF9',
        "primary-highlight":'#7DB9B6',
        "secondary-highlight":'#E5F2F2',
        "primary-red":'#E96479',
			}
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
