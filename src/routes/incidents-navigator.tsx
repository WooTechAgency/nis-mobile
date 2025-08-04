import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Incidents from '@screens/main/incidents';
import { IncidentProvider } from '@screens/main/incidents/context';
import CreateIncident from '@screens/main/incidents/create-incident/create-incident';
import React from 'react';
import { RouteName } from './types';
import PreviewIncident from '@screens/main/incidents/preview';

const IncidentsStack = createNativeStackNavigator();

export function IncidentsNavigator() {
  return (
    <IncidentProvider>
      <IncidentsStack.Navigator initialRouteName={RouteName.Incidents} screenOptions={{ headerShown: false }}>
        <IncidentsStack.Screen name={RouteName.Incidents} component={Incidents} />
        <IncidentsStack.Screen name={RouteName.CreateIncident} component={CreateIncident} />
        <IncidentsStack.Screen name={RouteName.PreviewIncident} component={PreviewIncident} />
      </IncidentsStack.Navigator>
    </IncidentProvider>

  );
}
