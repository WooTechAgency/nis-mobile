import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Account from '@screens/main/account';
import React from 'react';
import { RouteName } from './types';
import UpdateAccount from '@screens/main/account/update-account';
import ChangePassword from '@screens/main/account/change-password';

const AccountStack = createNativeStackNavigator();

export function AccountNavigator() {
  return (
    <AccountStack.Navigator initialRouteName={RouteName.Account} screenOptions={{ headerShown: false }}>
      <AccountStack.Screen name={RouteName.Account} component={Account} />
      <AccountStack.Screen name={RouteName.ChangePassword} component={ChangePassword} />
      <AccountStack.Screen name={RouteName.UpdateAccount} component={UpdateAccount} />
    </AccountStack.Navigator>
  );
}
