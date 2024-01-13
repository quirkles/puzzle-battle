import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    colors: {
      black: '#0B0014',
      'gray-dark': '#878793',
      'gray-light': '#EEEEFF',
      gray: '#C1C1CC',
      white: '#fafafa',
      blue: {
        '50': '#f0f9fb',
        '100': '#daf0f3',
        '200': '#b9e1e8',
        '300': '#88cbd8',
        '400': '#47a8bd',
        DEFAULT: '#47a8bd',
        '500': '#3490a6',
        '600': '#2e768c',
        '700': '#2b6073',
        '800': '#2b515f',
        '900': '#274452',
        '950': '#152b37'
      },
      yellow: {
        50: '#fdfce9',
        100: '#fbfac6',
        200: '#f8f290',
        300: '#f5e663',
        DEFAULT: '#f5e663',
        400: '#eed121',
        500: '#dfb913',
        600: '#c0900e',
        700: '#99690f',
        800: '#7f5314',
        900: '#6c4417',
        950: '#3f2309'
      },
      red: {
        50: '#fef2f2',
        100: '#fee3e2',
        200: '#fdcdcb',
        300: '#fba9a6',
        400: '#f67873',
        500: '#ec4d47',
        600: '#db3a34',
        DEFAULT: '#db3a34',
        700: '#b6241f',
        800: '#97211d',
        900: '#7d221f',
        950: '#440d0b'
      },
      purple: {
        50: '#fbf4ff',
        100: '#f7e9fe',
        200: '#edd1fd',
        300: '#e2adfa',
        400: '#d37df5',
        500: '#bd4bea',
        600: '#a32bce',
        700: '#8a20ab',
        800: '#791e94',
        DEFAULT: '#791e94',
        900: '#611d72',
        950: '#3d064c'
      },
      pink: {
        50: '#fef1fa',
        100: '#fee5f7',
        200: '#feccf0',
        300: '#ff88dc',
        DEFAULT: '#ff88dc',
        400: '#fe68ce',
        500: '#f83cb8',
        600: '#e81a98',
        700: '#ca0c7a',
        800: '#a70d64',
        900: '#8b1055',
        950: '#550231'
      },
      orange: {
        50: '#fef6ee',
        100: '#fcead8',
        200: '#f8d2b0',
        300: '#f4b17d',
        400: '#ed7d3a',
        DEFAULT: '#ed7d3a',
        500: '#ea6725',
        600: '#db4e1b',
        700: '#b63a18',
        800: '#91301b',
        900: '#752919',
        950: '#3f120b'
      },
      green: {
        50: '#f4f9f4',
        100: '#e5f3e8',
        200: '#cde5d2',
        300: '#a5d0af',
        400: '#76b284',
        500: '#529562',
        600: '#3f784c',
        DEFAULT: '#3f784c',
        700: '#35603f',
        800: '#2d4e35',
        900: '#27402d',
        950: '#112216'
      }
    },
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    },
    extend: {}
  },
  plugins: []
};
export default config;
