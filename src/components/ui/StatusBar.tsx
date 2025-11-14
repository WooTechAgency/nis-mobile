import React from 'react';
import { StatusBar } from 'react-native';

interface GlobalStatusBarProps {
  //* Background color of status bar. Only works on Android
  backgroundColor?: string;
  barStyle?: 'default' | 'light-content' | 'dark-content';
  translucent?: boolean;
}
export default function GlobalStatusBar({ barStyle, backgroundColor }: GlobalStatusBarProps) {
  return (
    <StatusBar
      animated={true}
      backgroundColor={backgroundColor || 'white'}
      barStyle={barStyle || 'dark-content'}
      translucent
    />
  );
}
