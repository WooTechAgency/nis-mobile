import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Jobs from '@screens/main/jobs';
import React from 'react';
import { RouteName } from './types';

const JobsStack = createNativeStackNavigator();

export function JobsNavigator() {
  return (
    <JobsStack.Navigator initialRouteName={RouteName.Jobs} screenOptions={{ headerShown: false }}>
      <JobsStack.Screen name={RouteName.Jobs} component={Jobs} />
    </JobsStack.Navigator>
  );
}
