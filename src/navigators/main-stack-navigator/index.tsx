import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Button } from 'react-native';

import Dashboard from 'src/screens/dashboard';
import Details from 'src/screens/details';
import Settings from 'src/screens/settings';

import { WeatherLocationType } from 'types';
import theme from 'theme';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Dashboard: undefined;
  Details: { weatherLocationData: WeatherLocationType };
  Settings: undefined;
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
    <Stack.Screen
      name='Dashboard'
      component={Dashboard}
      options={({ navigation }: any) => ({
        headerRight: () => (
          <Button
            title='settings'
            onPress={() => navigation.navigate('Settings')}
          />
        ),
      })}
    />
    <Stack.Screen
      name='Details'
      component={Details}
      options={({ route }: any) => ({
        title: route?.params?.weatherLocationData.name,
      })}
    />
    <Stack.Screen name='Settings' component={Settings} />
  </Stack.Navigator>
);

export default MainStackNavigator;
