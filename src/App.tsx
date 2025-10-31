import ErrorModal from '@components/modal/error-modal';
import { DailyAssessmentModel } from '@lib/models/daily-assessment-model';
import { IncidentModel } from '@lib/models/incident-model';
import { toastConfig } from '@lib/toast';
import { RealmProvider, useRealm } from '@realm/react';
import RootNavigator from '@routes/root-navigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from "react-native-keyboard-controller";
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { Realm } from 'realm';
import "../global.css";
import { store } from './store';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://50612f8932251d36185fc34bd850eaba@o4508839267008512.ingest.us.sentry.io/4510163831291904',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

const realmConfig: Realm.Configuration = {
  schema: [IncidentModel, DailyAssessmentModel],
  deleteRealmIfMigrationNeeded: true
};

// Component to clean old records when app opens
const RealmCleaner = () => {
  const realm = useRealm();

  useEffect(() => {
    console.log('RealmCleaner running')
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    realm.write(() => {
      // Delete old incidents
      const oldIncidents = realm.objects<IncidentModel>('FieldNote').filtered('createdAt < $0', today);
      realm.delete(oldIncidents);

      // Delete old daily assessments
      const oldDailyAssessments = realm.objects<DailyAssessmentModel>('DailyAssessmentModel').filtered('createdAt < $0', today);
      realm.delete(oldDailyAssessments);
    });
  }, [realm]);

  return null;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

if (__DEV__) {
  require("../ReactotronConfig");
}

function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <SafeAreaProvider>
        <PaperProvider>
          <KeyboardProvider>
            <QueryClientProvider client={queryClient}>
              <RealmProvider {...realmConfig}>
                <RealmCleaner />
                <GestureHandlerRootView className='flex-1'>
                  <RootNavigator />
                  <Toast config={toastConfig} position='top' />
                  <ErrorModal />
                </GestureHandlerRootView>
              </RealmProvider>
            </QueryClientProvider>
          </KeyboardProvider>
        </PaperProvider>
      </SafeAreaProvider>
      {/* </PersistGate> */}
    </Provider>


  );
}

export default Sentry.wrap(App);