import React from 'react';
import styled, { DefaultTheme } from 'styled-components';

import Text from 'src/components/text';
import { CountryType, UnitsEnum } from 'types';
import CONFIG from 'config';
import useCountryItemLogic from './hooks/useCountryItemLogic';
import { useNavigation } from '@react-navigation/native';
import { ProfileScreenNavigationProp } from 'src/navigators/main-stack-navigator';

type StyledPropsType = { theme: DefaultTheme };

const MainTouchableOpacity = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${(props: StyledPropsType) => props.theme.defaultPadding}px;
  background-color: ${(props: StyledPropsType) => props.theme.colors.primary};
  border-radius: ${(props: StyledPropsType) => props.theme.borderRadius}px;
  margin-top: ${(props: StyledPropsType) => props.theme.defaultMargin}px;
`;

const UnitWrapperView = styled.View`
  flex-direction: row;
  background-color: ${(props: StyledPropsType) => props.theme.colors.secondary};
  border-radius: ${(props: StyledPropsType) => props.theme.borderRadius}px;
  padding: ${(props: StyledPropsType) => props.theme.defaultPadding}px;
`;

const WrapperView = styled.View`
  flex-direction: column;
  border-radius: ${(props: StyledPropsType) => props.theme.borderRadius}px;
  align-items: center;
`;

const CurrentLocationText = styled(Text)`
  font-size: 8px;
`;

const { defaultUnits } = CONFIG;

const countryItem = ({
  item,
  onPress,
}: {
  item: CountryType;
  onPress: () => void;
}) => (
  <MainTouchableOpacity onPress={onPress}>
    <WrapperView>
      <Text>{item.name}</Text>
      {item.userLocationData && (
        <CurrentLocationText>Current location</CurrentLocationText>
      )}
    </WrapperView>
    <UnitWrapperView>
      <Text>{item?.main?.temp}</Text>
      <Text>&deg;{UnitsEnum[defaultUnits]}</Text>
    </UnitWrapperView>
  </MainTouchableOpacity>
);

export default countryItem;
