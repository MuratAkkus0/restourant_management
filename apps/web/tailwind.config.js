/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

// Explicit allow-list of modern color families (as opposed to `...colors`,
// which would also enumerate - and trigger deprecation warnings for -
// renamed v2/v3 aliases like `lightBlue`/`coolGray`).
const {
  slate,
  gray,
  zinc,
  neutral,
  stone,
  red,
  orange,
  amber,
  yellow,
  lime,
  green,
  emerald,
  teal,
  cyan,
  sky,
  blue,
  indigo,
  violet,
  purple,
  fuchsia,
  pink,
  rose,
  white,
  black,
  transparent,
  current,
} = colors;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    colors: {
      slate,
      gray,
      zinc,
      neutral,
      stone,
      red,
      orange,
      amber,
      yellow,
      lime,
      green,
      emerald,
      teal,
      cyan,
      sky,
      blue,
      indigo,
      violet,
      purple,
      fuchsia,
      pink,
      rose,
      white,
      black,
      transparent,
      current,
      // Manegio's brand tokens, documented in README.md#design-system.
      // `primary` (dark slate) is always paired with `accent` (white) for
      // text/icons on top of it - header, hero section and the public menu
      // banner - which keeps contrast >= 4.5:1 (WCAG AA) everywhere it's used.
      primary: slate[900],
      accent: white,
      neutralLight: slate[50],
    },
    fontFamily: {
      Lobster: ['Lobster Two', 'cursive'],
      Poppins: ['Poppins', 'serif'],
    },
    extend: {},
  },
  plugins: [],
};
