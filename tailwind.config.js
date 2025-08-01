/** @type {import('tailwindcss').Config} */
const { colors } = require('./src/constants/colors.constants');
const plugin = require('tailwindcss/plugin');

module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./src/App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      'full-screen-overlay': {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: -1, // Đặt zIndex để nó nằm dưới modal
      },
      colors: {
        primary: '#4188E3',
        secondary: '#122132',
        secondary2: '#171717',
        secondary3: '#121212',
        secondary4: '#191919',
        white: '#FFFFFF',
        black: '#000000', //neutral100
        black50s: 'rgba(0,0,0,0.5)',
        gray: '#666666',
        neutral2: 'rgba(250, 250, 250, 1)',
        neutral5: '#F1F1F1',
        neutral10: '#E4E4E4',
        neutral20: '#DFDFDF',
        neutral25: '#D3D3D3',
        neutral40: '#BEBEBE',
        neutral50: '#9F9F9F',
        neutral70: '#666666',
        gray100: '#BEBEBE',
        gray200: '#DFDFDF',
        grayLight: '#F1F1F1',
        des: '#9F9F9F',
        violet: '#6F63FF', //Primary
        violet1: '#8F86FF', //Primary50
        violet2: '#BBB6FF', //Primary20
        violet3: '#DDDAFF', //Primary10
        violet4: '#F6F5FF', //Primary5
        violet5: '#7162FF',
        border: '#BEBEBE',
        red: '#E80000',
        // green: '#2D6617',
        green2: '#92D1AE',
        green3: '#EAFAEB',
        btnDisable: '#DFDFDF',
        disable: '#DFDFDF',
        bgViolet: '#F6F5FF',
        orangeBg: '#FFE3BA',
        orange: '#FF9A02',
        bgArea: 'rgb(250, 250, 250)',
        dropBack: 'rgba(0,0,0,0.1)',
        alt1: '#FF9400',
      },
      fontFamily: {
        thin: ['Poppins-Thin'],
        regular: ['Poppins-Regular'],
        medium: ['Poppins-Medium'],
        semibold: ['Poppins-SemiBold'],
        bold: ['Poppins-Bold'],
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        center: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        'row-center': {
          flexDirection: 'row',
          alignItems: 'center',
        },
      });
    }),
  ],
}