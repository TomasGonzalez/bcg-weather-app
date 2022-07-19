import React from 'react';

import { ThemeProvider } from 'styled-components';
import MainRouter from 'src/navigators';
import MainSafeAreaView from 'src/components/main-safe-area-view';
import ErrorBoundary from 'src/hoc/error-boundary';

import theme from 'theme';
import useLoadContries from 'src/hooks/useLoadCountries';

export default function App() {
  useLoadContries();
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <MainSafeAreaView>
          <MainRouter />
        </MainSafeAreaView>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
