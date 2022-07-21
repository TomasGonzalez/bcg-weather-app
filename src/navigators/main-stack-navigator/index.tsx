import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import Dashboard from 'src/screens/dashboard';
import Details from 'src/screens/details';
import { WeatherLocationType } from 'types';
import theme from 'theme';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Dashboard: undefined;
  Details: { weatherLocationData: WeatherLocationType };
};

export type ProfileScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const MainStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      headerTitleStyle: {
        color: theme.colors.text,
      },
      headerTintColor: theme.colors.text,
    }}
  >
    <Stack.Screen name='Dashboard' component={Dashboard} />
    <Stack.Screen
      name='Details'
      component={Details}
      options={({ route }: any) => ({
        title: route?.params?.weatherLocationData.name,
      })}
    />
  </Stack.Navigator>
);

export default MainStackNavigator;
