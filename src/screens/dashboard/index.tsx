import React from 'react';
import { FlatList, View, Text, TouchableOpacityBase } from 'react-native';

import MainView from 'src/components/main-view';
import useDashboardLogic from './hooks/useDashboardLogic';
import HoverAddButton from 'src/components/hover-add-button';
import WeatherLocationItem from './components/weather-location-item';
import WeatherLocationHeader from './components/weather-location-header';
import AddLocationModal from './components/add-location-modal';

const Dashboard = () => {
  const {
    refreshing,
    onRefresh,
    weatherLocationList,
    renderItem,
    renderHeaderItem,
    isModalVisible,
    setIsModalVisible,
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
      <HoverAddButton onPress={() => setIsModalVisible(!isModalVisible)} />
      <AddLocationModal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(!isModalVisible)}
      />
    </MainView>
  );
};

export default Dashboard;
