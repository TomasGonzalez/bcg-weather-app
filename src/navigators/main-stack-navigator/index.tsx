import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import Dashboard from 'src/screens/dashboard';
import Details from 'src/screens/details';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Dashboard: undefined;
  Details: undefined;
};
export type ProfileScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const MainStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name='Dashboard' component={Dashboard} />
    <Stack.Screen name='Details' component={Details} />
  </Stack.Navigator>
);

export default MainStackNavigator;
