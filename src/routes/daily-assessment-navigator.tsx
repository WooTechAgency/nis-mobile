import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DailyAssessment from '@screens/main/daily-assessment';
import React from 'react';
import { ScreenName } from './types';

const DailyAssessmentStack = createNativeStackNavigator();
export function DailyAssessmentNavigator() {
  return (
    <DailyAssessmentStack.Navigator initialRouteName={ScreenName.DailyAssessment} screenOptions={{ headerShown: false }}>
      <DailyAssessmentStack.Screen name={ScreenName.DailyAssessment} component={DailyAssessment} />
    </DailyAssessmentStack.Navigator>
  );
}
