import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';

import styled from 'styled-components';
import MainView from 'src/components/main-view';
import Text from 'src/components/text';
import { RootStackParamList } from 'src/navigators/main-stack-navigator';
import TemperatureDisplay from 'src/components/temperature-display';

const StyledMainView = styled(MainView)`
  justify-content: space-between;
`;

const MainDataContainerView = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const SecondaryDataContainerView = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

function Details() {
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const { weatherLocationData } = route?.params;

  return (
    <StyledMainView>
      <MainDataContainerView>
        <Text>{weatherLocationData.sys.weatherLocation}</Text>
        <Text>{weatherLocationData.weather[0].description}</Text>
        <TemperatureDisplay temperatureValue={weatherLocationData.main?.temp} />
      </MainDataContainerView>
      <SecondaryDataContainerView>
        <Text>secondary Data seciton</Text>
      </SecondaryDataContainerView>
    </StyledMainView>
  );
}

export default Details;
