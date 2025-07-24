import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DailyAssessment from '@screens/main/daily-assessment/daily-assessment';
import CreateDailyAssessment from '@screens/main/daily-assessment/create-daily-assessment/create-daily-assessment';
import React from 'react';
import { ScreenName } from './types';
import { DailyAssessmentProvider } from '@screens/main/daily-assessment/context';

const DailyAssessmentStack = createNativeStackNavigator();
export function DailyAssessmentNavigator() {
  return (
    <DailyAssessmentProvider>
      <DailyAssessmentStack.Navigator initialRouteName={ScreenName.DailyAssessment} screenOptions={{ headerShown: false }}>
        <DailyAssessmentStack.Screen name={ScreenName.DailyAssessment} component={DailyAssessment} />
        <DailyAssessmentStack.Screen name={ScreenName.CreateDailyAssessment} component={CreateDailyAssessment} />
      </DailyAssessmentStack.Navigator>
    </DailyAssessmentProvider>

  );
}
