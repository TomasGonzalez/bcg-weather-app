import React from 'react';

import CONFIG from 'config';
import { UnitsEnum } from 'types';
import Text from '../text';
import { TextProps } from 'react-native';
import useStore from 'src/stores/global-store';

const TemperatureDisplay = (
  props: TextProps & {
    cropValue?: boolean;
    temperatureValue: number | undefined;
  }
) => {
  const unitSystem = useStore((store) => store.unitSystem);
  const { temperatureValue, cropValue } = props;
  return (
    <Text {...props}>
      {cropValue ? Math.round(temperatureValue as number) : temperatureValue}
      &deg;{UnitsEnum[unitSystem]}
    </Text>
  );
};

export default TemperatureDisplay;
