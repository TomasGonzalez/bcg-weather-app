import styled, { DefaultTheme } from 'styled-components';

import Text from 'src/components/text';

type StyledPropsType = { theme: DefaultTheme };

const MainTouchableOpacity = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${(props: StyledPropsType) => props.theme.defaultPadding}px;
  background-color: ${(props: StyledPropsType) => props.theme.colors.contrast};
  border-radius: ${(props: StyledPropsType) => props.theme.borderRadius}px;
  margin-top: ${(props: StyledPropsType) => props.theme.defaultMargin}px;
`;

const WeatherLocationHeader = ({ onPress }: { onPress: () => void }) => (
  <MainTouchableOpacity onPress={onPress}>
    <Text>Press to fetch your local weather. </Text>
  </MainTouchableOpacity>
);

export default WeatherLocationHeader;
