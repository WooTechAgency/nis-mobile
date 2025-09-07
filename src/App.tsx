
import ErrorModal from '@components/modal/error-modal';
import { toastConfig } from '@lib/toast';
import RootNavigator from '@routes/root-navigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import "../global.css";
import { store } from './store';
import { RealmProvider } from '@realm/react';
import { IncidentModel } from '@lib/models/incident-model';

const realmConfig: Realm.Configuration = {
  schema: [IncidentModel],
  deleteRealmIfMigrationNeeded: true
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
          <QueryClientProvider client={queryClient}>
            <RealmProvider {...realmConfig} >

              <GestureHandlerRootView className='flex-1'>

                <RootNavigator />
                <Toast config={toastConfig} position='top' />
                <ErrorModal />
              </GestureHandlerRootView>
            </RealmProvider>
          </QueryClientProvider>
        </PaperProvider>
      </SafeAreaProvider>
      {/* </PersistGate> */}

    </Provider>


  );
}

export default App;
