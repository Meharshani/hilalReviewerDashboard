/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",'./public/index.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
      },
      colors: {
        customGray: '#79747E',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(95.15deg, #7147B4 0%, #423CAC 112.53%)',
      },
    },
  },
  plugins: [],
}
