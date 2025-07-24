import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '@screens/main/dashboard';
import React from 'react';
import { ScreenName } from './types';

const DashboardStack = createNativeStackNavigator();

export function DashboardNavigator() {
  return (
    <DashboardStack.Navigator initialRouteName={ScreenName.Dashboard} screenOptions={{ headerShown: false }}>
      <DashboardStack.Screen name={ScreenName.Dashboard} component={Dashboard} />
    </DashboardStack.Navigator>
  );
}
