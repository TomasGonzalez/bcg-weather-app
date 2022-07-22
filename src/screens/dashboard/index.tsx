import React from 'react';
import { FlatList, View, Text, TouchableOpacityBase } from 'react-native';

import MainView from 'src/components/main-view';
import useDashboardLogic from './hooks/useDashboardLogic';
import HoverAddButton from 'src/components/hover-add-button';
import WeatherLocationItem from './components/weather-location-item';
import WeatherLocationHeader from './components/weather-location-header';

const Dashboard = () => {
  const {
    refreshing,
    onRefresh,
    weatherLocationList,
    renderItem,
    renderHeaderItem,
  } = useDashboardLogic();

  return (
    <MainView>
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        keyExtractor={(item) => `${item.id}`}
        renderItem={(itemProps) => renderItem(itemProps, WeatherLocationItem)}
        ListHeaderComponent={() => renderHeaderItem(WeatherLocationHeader)}
        data={weatherLocationList}
      />
      <HoverAddButton onPress={() => console.log('test')} />
    </MainView>
  );
};

export default Dashboard;
