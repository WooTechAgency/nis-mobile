import Drawer from '@components/drawer';
import { isIpad } from '@constants/app.constants';
import { useAppSelector } from '@hooks/common';
import { useLLM, } from '@hooks/useLLM';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect } from 'react';
import { AccountNavigator } from './account-navigator';
import { DailyAssessmentNavigator } from './daily-assessment-navigator';
import { DashboardNavigator } from './dashboard-navigator';
import { IncidentsNavigator } from './incidents-navigator';
import { JobsNavigator } from './jobs-navigator';
import { RouteName } from './types';
import MyBottomTab from '@components/bottom-tab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CertificateNavigator } from './certificate-navigator';

const DrawerNavigator = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Parent = isIpad ? DrawerNavigator : Tab;

export function MainNavigator() {
  const collapsedDrawer = useAppSelector((state) => state.common.collapsedDrawer);
  const { loadModel } = useLLM()

  useEffect(() => {
    loadModel();
  }, []);

  return (
    <Parent.Navigator
      tabBar={(props) => <MyBottomTab {...props} />}
      screenOptions={
        isIpad
          ? {
            drawerType: 'permanent',
            drawerStyle: {
              width: collapsedDrawer ? 96 : 264,
              borderRightWidth: 1,
              shadowColor: '#000',
              shadowOffset: { width: 5, height: 0 },
              shadowOpacity: 0.03,
              shadowRadius: 5,
            },
          }
          : {}
      }
      drawerContent={(props) => (
        <Drawer {...props} collapsedDrawer={collapsedDrawer} />
      )}
    >
      <Parent.Screen
        name={RouteName.DashboardNavigator}
        component={DashboardNavigator}
        options={{ headerShown: false, title: 'Dashboard' }}
      />
      {/* <Parent.Screen
        name={RouteName.JobsNavigator}
        component={JobsNavigator}
        options={{ headerShown: false, title: 'Jobs' }}
      /> */}
      {isIpad &&
        <Parent.Screen
          name={RouteName.DailyAssessmentNavigator}
          component={DailyAssessmentNavigator}
          options={{ headerShown: false, title: 'Daily assessment' }}
        />
      }
      <Parent.Screen
        name={RouteName.IncidentsNavigator}
        component={IncidentsNavigator}
        options={{ headerShown: false, title: 'Incidents' }}
      />
      {/* <Parent.Screen
        name={RouteName.CertificateNavigator}
        component={CertificateNavigator}
        options={{ headerShown: false, title: 'Certificate' }}
      /> */}
      <Parent.Screen
        name={RouteName.AccountNavigator}
        component={AccountNavigator}
        options={{ headerShown: false, title: 'Account' }}
      />
    </Parent.Navigator>
  );
}
