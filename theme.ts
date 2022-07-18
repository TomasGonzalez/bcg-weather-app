import { DefaultTheme } from 'styled-components';
import { Appearance } from 'react-native';

const getColors = () => {
  const colorScheme = Appearance.getColorScheme();
  if (colorScheme === 'dark')
    return {
      background: '#1B2430',
      primary: '#51557E',
      secondary: '#816797',
      contrast: '#D6D5A8',
    };

  return {
    background: '#FFFFFF',
    primary: '#6EB8B8',
    secondary: '#C7DCB2',
    contrast: '#888888',
  };
};

const theme: DefaultTheme = {
  borderRadius: '4px',
  defaultPadding: '8px',
  colors: getColors(),
};

export default theme;
