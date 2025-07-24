import {StackNavigationProp, StackScreenProps} from "@react-navigation/stack";

export enum ScreenName{
  Login = 'Login',
  ForgotPassword = 'ForgotPassword',
  EnterCode = 'EnterCode',
  EnterNewPassword = 'EnterNewPassword',

  MainNavigator = 'MainNavigator',
  // dashboard
  DashboardNavigator = 'DashboardNavigator',
  Dashboard = 'DashboardScreen',
  // daily
  DailyAssessmentNavigator = 'DailyAssessmentNavigator',
  DailyAssessment = 'DailyAssessment',
  // job
  JobsNavigator = 'JobsNavigator',
  Jobs = 'Jobs',
  // Incidents
  IncidentsNavigator = 'IncidentsNavigator',
  Incidents = 'Incidents',
  // account
  AccountNavigator = 'AccountNavigator',
  Account = 'Account',
}

export type RootStackParamList = {
  [ScreenName.Login]: undefined;
  [ScreenName.ForgotPassword]: undefined;
  [ScreenName.EnterCode]: {email: string};
  [ScreenName.EnterNewPassword]: { code: string};
};

// type
export type EnterCodeProps = StackScreenProps<
  RootStackParamList,
  ScreenName.EnterCode
>;

export type EnterNewPasswordProps = StackScreenProps<
  RootStackParamList,
  ScreenName.EnterNewPassword
>;

export type ForgotPasswordProps = StackScreenProps<
  RootStackParamList,
  ScreenName.ForgotPassword
>;