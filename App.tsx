import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import Toast from 'react-native-toast-message';

import MainRouter from 'src/navigators';
import MainSafeAreaView from 'src/components/main-safe-area-view';
import ErrorBoundary from 'src/hocs/error-boundary';
import useLoadAppData from 'src/hooks/useLoadAppData';
import theme from 'theme';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  useLoadAppData();
  // useEffect(() => {
  //   (async () => {
  //     await AsyncStorage.clear();
  //   })();
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <MainSafeAreaView>
        <ErrorBoundary>
          <MainRouter />
          <Toast />
        </ErrorBoundary>
      </MainSafeAreaView>
    </ThemeProvider>
  );
}
