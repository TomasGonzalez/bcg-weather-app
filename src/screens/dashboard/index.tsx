import React from 'react';
import { FlatList } from 'react-native';

import MainView from 'src/components/main-view';
import useDashboardLogic from './hooks/useDashboardLogic';
import countryItem from './components/country-item';

const Dashboard = () => {
  const { countryList } = useDashboardLogic();

  return (
    <MainView>
      <FlatList
        keyExtractor={(item) => `${item.name}`}
        renderItem={countryItem}
        data={countryList}
      />
    </MainView>
  );
};

export default Dashboard;
