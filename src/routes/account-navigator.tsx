import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Incidents from '@screens/main/incidents';
import React from 'react';
import { RouteName } from './types';
import Account from '@screens/main/account';

const AccountStack = createNativeStackNavigator();

export function AccountNavigator() {
  return (
    <AccountStack.Navigator initialRouteName={RouteName.Account} screenOptions={{ headerShown: false }}>
      <AccountStack.Screen name={RouteName.Account} component={Account} />
    </AccountStack.Navigator>
  );
}
