import React from 'react';

import CONFIG from 'config';
import { UnitsEnum } from 'types';
import Text from '../text';
import { TextProps } from 'react-native';

const { defaultUnits } = CONFIG;

const TemperatureDisplay = (
  props: TextProps & {
    temperatureValue: number | undefined;
  }
) => {
  const { temperatureValue } = props;
  return (
    <Text {...props}>
      {temperatureValue}
      &deg;{UnitsEnum[defaultUnits]}
    </Text>
  );
};

export default TemperatureDisplay;
