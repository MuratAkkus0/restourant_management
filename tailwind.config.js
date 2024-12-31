/** @type {import('tailwindcss').Config} */
import colors, { white } from 'tailwindcss/colors';
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // colors: {
    //   primary: '#FFFFFF',
    //   secondary: 'rgb(220 38 38)',
    //   accent: '#000000',
    //   neutralLight: '#E0E0E0',
    // blackBgShadow: '#00000031',
    // slateBlack:rgb(2 6 23),

    // },
    fontFamily: {
      Phenomena: ['Phenomena', 'sans-serif'],
      Lobster: ['Caveat', 'cursive'],
      Poppins: ['Poppins', 'serif'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
