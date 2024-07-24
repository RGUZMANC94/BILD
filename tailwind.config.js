/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        light: {
          1: '#ffffff',
          2: '#e2e2e2',
          3: '#cccccc',
          4: '#a6a6a6',
        },
        dark: {
          1:'#1c1c1c',
          2:'#343434',
          3:'#282624',
          4:'#565555',
        },
        bild: {
          1: '#2467ff'
        }
      }
    },
  },
  plugins: [],
};
