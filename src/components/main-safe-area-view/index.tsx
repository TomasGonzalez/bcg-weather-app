import { Platform, StatusBar } from 'react-native';
import styled, { ThemeProps } from 'styled-components';

const MainSafeAreaView = styled.SafeAreaView`
  display: flex;
  flex: 1;
  padding-top: ${Platform.OS === 'android' ? StatusBar.currentHeight : 0}px;
  background-color: ${(props: ThemeProps) => props.theme.colors.background};
`;

export default MainSafeAreaView;
