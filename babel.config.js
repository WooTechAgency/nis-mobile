module.exports = {
  presets: ['module:@react-native/babel-preset','nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'], // đường dẫn gốc
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@screens': './src/screens',
          '@constants': './src/constants',
          '@hooks': './src/hooks',
          '@store': './src/store',
          '@utils': './src/utils',
          '@zustand': './src/zustand',
          '@routes': './src/routes',
          '@services': './src/services',
          '@lib': './src/lib',
        },
      },
      'react-native-worklets/plugin',
    ],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};