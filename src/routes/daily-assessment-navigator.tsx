import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DailyAssessment from '@screens/main/daily-assessment/daily-assessment';
import CreateDailyAssessment from '@screens/main/daily-assessment/create-daily-assessment/create-daily-assessment';
import React from 'react';
import { RouteName } from './types';
import { DailyAssessmentProvider } from '@screens/main/daily-assessment/context';
import Preview from '@screens/main/daily-assessment/preview';

const DailyAssessmentStack = createNativeStackNavigator();
export function DailyAssessmentNavigator() {
  return (
    <DailyAssessmentProvider>
      <DailyAssessmentStack.Navigator initialRouteName={RouteName.DailyAssessment} screenOptions={{ headerShown: false }}>
        <DailyAssessmentStack.Screen name={RouteName.DailyAssessment} component={DailyAssessment} />
        <DailyAssessmentStack.Screen name={RouteName.CreateDailyAssessment} component={CreateDailyAssessment} />
        <DailyAssessmentStack.Screen name={RouteName.Preview} component={Preview} />
      </DailyAssessmentStack.Navigator>
    </DailyAssessmentProvider>

  );
}
