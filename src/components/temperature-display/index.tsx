import React from 'react';

import CONFIG from 'config';
import { UnitsEnum } from 'types';
import Text from '../text';
import { TextProps } from 'react-native';

const { defaultUnits } = CONFIG;

const TemperatureDisplay = (
  props: TextProps & {
    cropValue?: boolean;
    temperatureValue: number | undefined;
  }
) => {
  const { temperatureValue, cropValue } = props;
  return (
    <Text {...props}>
      {cropValue ? Math.round(temperatureValue as number) : temperatureValue}
      &deg;{UnitsEnum[defaultUnits]}
    </Text>
  );
};

export default TemperatureDisplay;
