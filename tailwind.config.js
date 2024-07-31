/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './HOC/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        light: {
          1: '#ffffff',
          2: '#efefef',
          3: '#cccccc',
          4: '#333333',
        },
        dark: {
          1: '#1c1c1c',
          2: '#282624',
          3: '#2c2c2c',
          4: '#343434',
          5: '#565555',
        },
        bild: {
          1: '#2467ff',
        },
      },
      boxShadow: {
        '3xl': '0px 0px 10px 10px rgba(0, 0, 0, 0.1)',
        '4xl': '0px 0px 10px 10px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        bild: '10px',
      },
      fontWeight: {
        thin: '100',
        hairline: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
    },
  },
  plugins: [],
};
