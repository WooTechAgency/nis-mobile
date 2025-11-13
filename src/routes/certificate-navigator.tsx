import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CertificateList from '@screens/main/certificate/screens/list';
import UpdateCertificate from '@screens/main/certificate/screens/update';
import React from 'react';
import { RouteName } from './types';

const CertificateStack = createNativeStackNavigator();

export function CertificateNavigator() {
  return (
    <CertificateStack.Navigator initialRouteName={RouteName.Certificates} screenOptions={{ headerShown: false }}>
      <CertificateStack.Screen name={RouteName.Certificates} component={CertificateList} />
      <CertificateStack.Screen name={RouteName.UpdateCertificate} component={UpdateCertificate} />
    </CertificateStack.Navigator>

  );
}
