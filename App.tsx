import { Text } from 'react-native';

import { ThemeProvider } from './styled-components';
import MainSafeAreaView from './src/components/main-safe-area-view';
import theme from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainSafeAreaView>
        <Text>test</Text>
      </MainSafeAreaView>
    </ThemeProvider>
  );
}
