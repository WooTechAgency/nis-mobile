import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Incidents from '@screens/main/incidents';
import React from 'react';
import { ScreenName } from './types';

const IncidentsStack = createNativeStackNavigator();

export function IncidentsNavigator() {
  return (
    <IncidentsStack.Navigator initialRouteName={ScreenName.Incidents} screenOptions={{ headerShown: false }}>
      <IncidentsStack.Screen name={ScreenName.Incidents} component={Incidents} />
    </IncidentsStack.Navigator>
  );
}
