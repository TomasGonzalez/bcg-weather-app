import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from 'src/screens/dashboard';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name='Dashboard' component={Dashboard} />
  </Stack.Navigator>
);

export default MainStackNavigator;
