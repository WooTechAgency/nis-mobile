import {StackNavigationProp, StackScreenProps} from "@react-navigation/stack";

export enum RouteName{
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
  CreateDailyAssessment = 'CreateDailyAssessment',
  DailyAssessmentPreview = 'DailyAssessmentPreview',
  ShowDocument = 'ShowDocument',

  // job
  JobsNavigator = 'JobsNavigator',
  Jobs = 'Jobs',

  // Incidents
  IncidentsNavigator = 'IncidentsNavigator',
  Incidents = 'Incidents',
  CreateIncident = 'CreateIncident',
  PreviewIncident = 'PreviewIncident',
  // account
  AccountNavigator = 'AccountNavigator',
  Account = 'Account',
  ChangePassword = 'ChangePassword',
  UpdateAccount = 'UpdateAccount',
}

export type RootStackParamList = {
  [RouteName.Login]: undefined;
  [RouteName.ForgotPassword]: undefined;
  [RouteName.EnterCode]: {email: string};
  [RouteName.EnterNewPassword]: { code: string,email: string};
};

// type
export type EnterCodeProps = StackScreenProps<
  RootStackParamList,
  RouteName.EnterCode
>;

export type EnterNewPasswordProps = StackScreenProps<
  RootStackParamList,
  RouteName.EnterNewPassword
>;

export type ForgotPasswordProps = StackScreenProps<
  RootStackParamList,
  RouteName.ForgotPassword
>;