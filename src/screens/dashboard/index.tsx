import React from 'react';
import { FlatList } from 'react-native';

import MainView from 'src/components/main-view';
import useDashboardLogic from './hooks/useDashboardLogic';
import HoverAddButton from 'src/components/hover-add-button';

const Dashboard = () => {
  const { refreshing, onRefresh, weatherLocationList, renderItem } =
    useDashboardLogic();

  return (
    <MainView>
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        data={weatherLocationList}
      />
      <HoverAddButton onPress={() => console.log('test')} />
    </MainView>
  );
};

export default Dashboard;
