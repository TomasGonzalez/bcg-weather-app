import React, { useCallback } from 'react';
import { FlatList } from 'react-native';

import Text from 'src/components/text';
import MainView from 'src/components/main-view';
import useDashboardLogic from './hooks/useDashboardLogic';

const Dashboard = () => {
  const { weatherLocationList, renderItem } = useDashboardLogic();

  if (!weatherLocationList) {
    return (
      <MainView>
        <Text>Fetching Weather...</Text>
      </MainView>
    );
  }

  return (
    <MainView>
      <FlatList
        keyExtractor={(item) => {
          return `${item.id}`;
        }}
        renderItem={renderItem}
        data={weatherLocationList}
      />
    </MainView>
  );
};

export default Dashboard;
