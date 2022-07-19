import React from 'react';
import { ThemeProvider } from 'styled-components';

import MainRouter from 'src/navigators';
import MainSafeAreaView from 'src/components/main-safe-area-view';
import ErrorBoundary from 'src/hoc/error-boundary';
import useLoadContries from 'src/hooks/useLoadCountries';
import theme from 'theme';

export default function App() {
  useLoadContries();
  return (
    <ThemeProvider theme={theme}>
      <MainSafeAreaView>
        <ErrorBoundary>
          <MainRouter />
        </ErrorBoundary>
      </MainSafeAreaView>
    </ThemeProvider>
  );
}
