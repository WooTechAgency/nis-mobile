import Loading from '@components/ui/Loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from '@screens/auth/forgot-password';
import Login from '@screens/auth/login';
import { useLoadingZ } from '@zustand/useLoadingZ';
import { JSX } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { navigationRef } from './navigationRef';
import { RootStackParamList, ScreenName, } from './types';
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
      return ScreenName.MainNavigator
    }
    return ScreenName.Login
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
        <Stack.Screen name={ScreenName.Login} component={Login} />
        <Stack.Screen name={ScreenName.ForgotPassword} component={ForgotPassword} />
        <Stack.Screen name={ScreenName.EnterCode} component={EnterCode} />
        <Stack.Screen name={ScreenName.EnterNewPassword} component={EnterNewPassword} />
        <Stack.Screen name={ScreenName.MainNavigator} component={MainNavigator} />
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
