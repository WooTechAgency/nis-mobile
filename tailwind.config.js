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
        primary: '#61DCDD',
        primary2: '#212B36',
        white: '#FFFFFF',
        black: '#000000',
        black2: '#000000',
        black3: '#1E1E1E',
        black50s: 'rgba(0,0,0,0.5)',
        gray: '#666666',
        neutral2: 'rgba(250, 250, 250, 1)',
        neutral5: '#F1F1F1',
        neutral10: '#FAFAFA',
        neutral15: '#F5F5F5',
        neutral20: '#DFDFDF',
        neutral25: '#D3D3D3',
        neutral30: '#E4E4E4',
        neutral40: '#BEBEBE',
        neutral50: '#BEBEBE',
        neutral60: '#9F9F9F',
        neutral70: '#666666',
        neutral80: '#000',
        teal10: '#DFF8F8',
        teal20: '#CAF3F4',
        border: '#BEBEBE',
        red: '#E80000',
        negative30: '#FE8080',
        // green: '#2D6617',
        positive10: '#D7F6DD',
        positive30: '#9BE8AB',
        positive60: '#2FAE48',
      
        btnDisable: '#DFDFDF',
        disable: '#DFDFDF',
        orange10: '#FFDB80',
        orange1: '#FFE254',
        orange2: '#FF9A02',
        orange3: '#FFC738',
        orange3: '#FFC738',
        
        dropBack: 'rgba(0,0,0,0.1)',
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
    plugin(({ matchUtilities }) => {
      matchUtilities(
        {
          'common-shadow': () => ({
            shadowColor: '#000',
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 11,
            elevation: 2,
          }),
          center: () => ({
            justifyContent: 'center',
            alignItems: 'center',
          }),
          'row-center': () => ({
            flexDirection: 'row',
            alignItems: 'center',
          }),
        },
        { values: { DEFAULT: '' } }
      );
    }),
  ],
}