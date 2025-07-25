import { Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');
export const isIpad = width > 640;
export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

export const PER_PAGE = 10


export const supportedOrientations = [
  'landscape',
  'landscape-left',
  'landscape-right',
  'portrait',
  'portrait-upside-down',
];
