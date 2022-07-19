import React from 'react';
import { View, Text } from 'react-native';

import { CountryType } from 'types';

const countryItem = ({ item }: { item: CountryType }) => (
  <View>
    <Text>This is {item.name}</Text>
  </View>
);

export default countryItem;
