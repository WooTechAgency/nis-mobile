import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Jobs from '@screens/main/jobs';
import React from 'react';
import { ScreenName } from './types';

const JobsStack = createNativeStackNavigator();

export function JobsNavigator() {
  return (
    <JobsStack.Navigator initialRouteName={ScreenName.Jobs} screenOptions={{ headerShown: false }}>
      <JobsStack.Screen name={ScreenName.Jobs} component={Jobs} />
    </JobsStack.Navigator>
  );
}
