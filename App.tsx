import React from 'react';
import { ThemeProvider } from 'styled-components';

import MainRouter from 'src/navigators';
import MainSafeAreaView from 'src/components/main-safe-area-view';
import ErrorBoundary from 'src/hocs/error-boundary';
import useLoadContriesData from 'src/hooks/useLoadCountriesData';
import theme from 'theme';

export default function App() {
  useLoadContriesData();
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
