import React, { useEffect } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';

import styled from 'styled-components';
import MainView from 'src/components/main-view';
import Text from 'src/components/text';
import { RootStackParamList } from 'src/navigators/main-stack-navigator';
import TemperatureDisplay from 'src/components/temperature-display';
import { View } from 'react-native';
import { ThemeProps } from 'styled-components/native';
import moment from 'moment';

const StyledMainView = styled(MainView)`
  justify-content: space-between;
`;

const MainDataContainerView = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const SecondaryDataContainerView = styled.View`
  border-radius: 32px;
  background-color: ${(props: ThemeProps) => props.theme.colors.secondary}
  justify-content: center;
  align-items: center;
  flex: 1;
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
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const { weatherLocationData } = route?.params;

  const getDateValue = (date: number) => {
    const _date = new Date(date as number);
    return moment(_date).format('LT');
  };

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
        <Text>
          Sunrise: {getDateValue(weatherLocationData.sys.sunrise as number)}
        </Text>
        <Text>
          Sunset: {getDateValue(weatherLocationData.sys.sunset as number)}
        </Text>
      </SecondaryDataContainerView>
    </StyledMainView>
  );
}

export default Details;
