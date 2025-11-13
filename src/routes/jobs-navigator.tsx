import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RouteName } from './types';
import Jobs from '@screens/main/jobs/screens/list';
import UpdateJob from '@screens/main/jobs/screens/update';

const JobsStack = createNativeStackNavigator();

export function JobsNavigator() {
  return (
    <JobsStack.Navigator initialRouteName={RouteName.Jobs} screenOptions={{ headerShown: false }}>
      <JobsStack.Screen name={RouteName.Jobs} component={Jobs} />
      <JobsStack.Screen name={RouteName.UpdateJob} component={UpdateJob} />
    </JobsStack.Navigator>
  );
}
