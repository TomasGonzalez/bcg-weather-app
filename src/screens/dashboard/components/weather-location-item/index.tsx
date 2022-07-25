import React from 'react';
import styled, { DefaultTheme } from 'styled-components';

import Text from 'src/components/text';
import { WeatherLocationType } from 'types';
import TemperatureDisplay from 'src/components/temperature-display';

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

const WeatherLocationItem = ({
  item,
  onPress,
}: {
  item: WeatherLocationType;
  onPress: () => void;
}) => (
  <MainTouchableOpacity testID={'listItem'} onPress={onPress}>
    <WrapperView>
      <Text>{item.name}</Text>
      {item.isUserLocationData && (
        <CurrentLocationText>Current location</CurrentLocationText>
      )}
    </WrapperView>
    <UnitWrapperView>
      <TemperatureDisplay temperatureValue={item?.main?.temp} />
    </UnitWrapperView>
  </MainTouchableOpacity>
);

export default WeatherLocationItem;
