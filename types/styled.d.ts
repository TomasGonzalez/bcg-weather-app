import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: number;
    defaultMargin: number;
    defaultPadding: number;
    textSize: number;
    colors: Record<string, string>;
  }
  export interface ThemeProps {
    theme: DefaultTheme;
  }
}
