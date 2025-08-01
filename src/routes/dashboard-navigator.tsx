import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '@screens/main/dashboard';
import React from 'react';
import { RouteName } from './types';

const DashboardStack = createNativeStackNavigator();

export function DashboardNavigator() {
  return (
    <DashboardStack.Navigator initialRouteName={RouteName.Dashboard} screenOptions={{ headerShown: false }}>
      <DashboardStack.Screen name={RouteName.Dashboard} component={Dashboard} />
    </DashboardStack.Navigator>
  );
}
