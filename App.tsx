import React from 'react';

import { ThemeProvider } from './styled-components';
import MainRouter from 'src/navigators';
import MainSafeAreaView from './src/components/main-safe-area-view';
import theme from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainSafeAreaView>
        <MainRouter />
      </MainSafeAreaView>
    </ThemeProvider>
  );
}
