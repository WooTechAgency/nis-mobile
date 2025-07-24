import Drawer from '@components/drawer';
import { isIpad } from '@constants/app.constants';
import { useAppSelector } from '@hooks/common';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { DailyAssessmentNavigator } from './daily-assessment-navigator';
import { DashboardNavigator } from './dashboard-navigator';
import { ScreenName } from './types';
import { JobsNavigator } from './jobs-navigator';
import { IncidentsNavigator } from './incidents-navigator';
import { AccountNavigator } from './account-navigator';

const DrawerNavigator = createDrawerNavigator();
const Parent = isIpad ? DrawerNavigator : DrawerNavigator;

export function MainNavigator() {
  const collapsedDrawer = useAppSelector((state) => state.common.collapsedDrawer);
  return (
    <Parent.Navigator
      // tabBar={(props) => <MyBottomTab {...props} countUnreadNoti={data?.unread_notification || 0} />}
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
        name={ScreenName.DashboardNavigator}
        component={DashboardNavigator}
        options={{ headerShown: false, title: 'Dashboard' }}
      />
      <Parent.Screen
        name={ScreenName.JobsNavigator}
        component={JobsNavigator}
        options={{ headerShown: false, title: 'Jobs' }}
      />
      <Parent.Screen
        name={ScreenName.DailyAssessmentNavigator}
        component={DailyAssessmentNavigator}
        options={{ headerShown: false, title: 'Daily assessment' }}
      />
      <Parent.Screen
        name={ScreenName.IncidentsNavigator}
        component={IncidentsNavigator}
        options={{ headerShown: false, title: 'Incidents' }}
      />
      <Parent.Screen
        name={ScreenName.AccountNavigator}
        component={AccountNavigator}
        options={{ headerShown: false, title: 'Account' }}
      />
      {/* {isIpad && (
        <Parent.Screen
          name='LogoutStack'
          component={AccountNavigator}
          options={{ headerShown: false, title: 'Dashboard' }}
        />
      )} */}
    </Parent.Navigator>
  );
}
