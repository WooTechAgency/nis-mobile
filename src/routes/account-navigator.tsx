import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Account from '@screens/main/account';
import React from 'react';
import { RouteName } from './types';

const AccountStack = createNativeStackNavigator();

export function AccountNavigator() {
  return (
    <AccountStack.Navigator initialRouteName={RouteName.Account} screenOptions={{ headerShown: false }}>
      <AccountStack.Screen name={RouteName.Account} component={Account} />
    </AccountStack.Navigator>
  );
}
