import { ThemeProvider } from 'styled-components';
import theme from 'theme';

const MockedStyledComponents = (component) => {
  return <ThemeProvider theme={theme}>{component}</ThemeProvider>;
};

export default MockedStyledComponents;
