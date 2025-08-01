import Loading from '@components/ui/Loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from '@screens/auth/forgot-password';
import Login from '@screens/auth/login';
import { useLoadingZ } from '@zustand/useLoadingZ';
import { JSX } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { navigationRef } from './navigationRef';
import { RootStackParamList, RouteName, } from './types';
import { useAppSelector } from '@hooks/common';
import { MainNavigator } from './main-mavigator';
import EnterNewPassword from '@screens/auth/enter-new-password';
import EnterCode from '@screens/auth/enter-code';


const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator(): JSX.Element {
  const { top } = useSafeAreaInsets();
  const userInfo = useAppSelector((state) => state.authentication.userInfo);

  console.log('userInfo ', userInfo)
  const { loading } = useLoadingZ();

  const handleRouteInitScreen = () => {
    if (userInfo) {
      return RouteName.MainNavigator
    }
    return RouteName.Login
    // if (cache) {
    //   return 'MainNavigator';
    // } else if (isSeenWelcome) {
    //   return 'AuthenticationNavigator';
    // } else {
    //   return 'Welcome';
    // }
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={handleRouteInitScreen()} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={RouteName.Login} component={Login} />
        <Stack.Screen name={RouteName.ForgotPassword} component={ForgotPassword} />
        <Stack.Screen name={RouteName.EnterCode} component={EnterCode} />
        <Stack.Screen name={RouteName.EnterNewPassword} component={EnterNewPassword} />
        <Stack.Screen name={RouteName.MainNavigator} component={MainNavigator} />
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
