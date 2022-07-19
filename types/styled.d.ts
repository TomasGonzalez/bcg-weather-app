import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    defaultPadding: string;
    textSize: string;
    colors: Record<string, string>;
  }
  export interface ThemeProps {
    theme: DefaultTheme;
  }
}
