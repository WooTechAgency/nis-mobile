
import RootNavigator from '@routes/root-navigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import "../global.css";
import { persistor, store } from './store';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@lib/toast';
import ErrorModal from '@components/modal/error-modal';

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
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView className='flex-1'>
              <RootNavigator />
              <Toast config={toastConfig} position='bottom' />
              <ErrorModal />
            </GestureHandlerRootView>
          </QueryClientProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>


  );
}

export default App;
