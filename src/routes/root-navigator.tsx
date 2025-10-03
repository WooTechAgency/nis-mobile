import Loading from '@components/ui/Loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from '@screens/auth/forgot-password';
import Login from '@screens/auth/login';
import { useAppSelector } from '@hooks/common';
import EnterCode from '@screens/auth/enter-code';
import EnterNewPassword from '@screens/auth/enter-new-password';
import { useLoadingZ } from '@zustand/useLoadingZ';
import { JSX } from 'react';
import { MainNavigator } from './main-mavigator';
import { navigationRef } from './navigationRef';
import { RootStackParamList, RouteName, } from './types';
import ShowDocument from '@screens/main/daily-assessment/screens/show-document';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator(): JSX.Element {
  const userInfo = useAppSelector((state) => state.authentication.userInfo);
  const { loading } = useLoadingZ();

  const handleRouteInitScreen = () => {
    if (userInfo) {
      return RouteName.MainNavigator
    }
    return RouteName.Login
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={handleRouteInitScreen()} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={RouteName.Login} component={Login} />
        <Stack.Screen name={RouteName.ForgotPassword} component={ForgotPassword} />
        <Stack.Screen name={RouteName.EnterCode} component={EnterCode} />
        <Stack.Screen name={RouteName.EnterNewPassword} component={EnterNewPassword} />
        <Stack.Screen name={RouteName.MainNavigator} component={MainNavigator} />
        <Stack.Screen name={RouteName.ShowDocument} component={ShowDocument} />

        {/* <Stack.Screen
          name='MainNavigator'
          component={MainStackNavigator}
          options={{ headerShown: false, title: 'MainStackNavigator' }}
        /> */}

      </Stack.Navigator>
      <Loading loading={loading} />
    </NavigationContainer>
  );
}

export default RootNavigator;
