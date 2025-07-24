import { View as ViewComponent, ViewProps } from 'react-native';
import React from 'react';

export function View(props: ViewProps) {
  return <ViewComponent {...props}>{props.children}</ViewComponent>;
}
