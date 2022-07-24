import React from 'react';
import styled, { ThemeProps } from 'styled-components';
import { View, StyleSheet } from 'react-native';

import MainView from 'src/components/main-view';
import Text from 'src/components/text';
import TemperatureDisplay from 'src/components/temperature-display';
import theme from 'theme';
import useDetailsLogic from './hooks/useDetailsLogic';

const StyledMainView = styled(MainView)`
  justify-content: space-between;
`;

const InfoText = styled(Text)`
  font-size: 18px;
  font-weight: bold;
`;

const MainDataContainerView = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const SecondaryDataContainerView = styled.View`
  border-radius: 32px;
  padding: ${(props: ThemeProps) => props.theme.defaultPadding}px;
  background-color: ${(props: ThemeProps) => props.theme.colors.secondary}
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const SecondaryHorizontalView = styled.View`
  flex: 1;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

const SecondarySectionView = styled.View`
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledTemperatureDisplay = styled(TemperatureDisplay)`
  font-size: 64px;
  font-weight: bold;
`;

const HorizontalWrapperView = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

function Details() {
  const { weatherLocationData, getDateValue } = useDetailsLogic();

  return (
    <StyledMainView>
      <MainDataContainerView>
        <Text>{weatherLocationData.sys.weatherLocation}</Text>
        <Text>{weatherLocationData.weather[0].description}</Text>
        <StyledTemperatureDisplay
          cropValue
          temperatureValue={weatherLocationData.main?.temp}
        />
        <HorizontalWrapperView>
          <Text>
            H:{' '}
            <TemperatureDisplay
              cropValue
              temperatureValue={weatherLocationData.main?.temp_max}
            />
          </Text>
          <View style={{ marginLeft: 8 }} />
          <Text>
            L:{' '}
            <TemperatureDisplay
              cropValue
              temperatureValue={weatherLocationData.main?.temp_min}
            />
          </Text>
        </HorizontalWrapperView>
      </MainDataContainerView>
      <SecondaryDataContainerView>
        <SecondaryHorizontalView>
          <SecondarySectionView
            style={[{ borderRightWidth: 0.2 }, styles.crussBorderStyle]}
          >
            <Text>Sunrise:</Text>
            <InfoText>
              {getDateValue(weatherLocationData.sys.sunrise as number)}
            </InfoText>
          </SecondarySectionView>
          <SecondarySectionView>
            <Text>Sunset:</Text>
            <InfoText>
              {getDateValue(weatherLocationData.sys.sunset as number)}
            </InfoText>
          </SecondarySectionView>
        </SecondaryHorizontalView>
        <SecondaryHorizontalView
          style={[{ borderTopWidth: 0.2 }, styles.crussBorderStyle]}
        >
          <SecondarySectionView
            style={[{ borderRightWidth: 0.2 }, styles.crussBorderStyle]}
          >
            <Text>Humidity:</Text>
            <InfoText>{weatherLocationData.main?.humidity as number}%</InfoText>
          </SecondarySectionView>
          <SecondarySectionView>
            <Text>Visibility:</Text>
            <InfoText>
              {(weatherLocationData.visibility / 1000) as number}km
            </InfoText>
          </SecondarySectionView>
        </SecondaryHorizontalView>
      </SecondaryDataContainerView>
    </StyledMainView>
  );
}

const styles = StyleSheet.create({
  crussBorderStyle: {
    borderStyle: 'solid',
    borderColor: theme.colors.contrast,
  },
});

export default Details;
