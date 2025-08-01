import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Incidents from '@screens/main/incidents';
import React from 'react';
import { RouteName } from './types';

const IncidentsStack = createNativeStackNavigator();

export function IncidentsNavigator() {
  return (
    <IncidentsStack.Navigator initialRouteName={RouteName.Incidents} screenOptions={{ headerShown: false }}>
      <IncidentsStack.Screen name={RouteName.Incidents} component={Incidents} />
    </IncidentsStack.Navigator>
  );
}
