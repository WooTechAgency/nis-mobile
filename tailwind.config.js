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
      colors: {...colors},
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