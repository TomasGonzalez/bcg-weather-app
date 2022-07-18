import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainStackNavigator from './main-stack-navigator';

const MainNavigator = () => (
  <NavigationContainer>
    <MainStackNavigator />
  </NavigationContainer>
);

export default MainNavigator;
