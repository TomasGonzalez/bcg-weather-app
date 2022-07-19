import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';

const StyledText = styled.Text`
  color: ${(props: { theme: DefaultTheme }) => props.theme.colors.text};
  font-size: ${(props: { theme: DefaultTheme }) => props.theme.textSize}px;
`;

export default StyledText;
