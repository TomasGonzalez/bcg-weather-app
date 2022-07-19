import React, { useCallback } from 'react';
import { FlatList } from 'react-native';

import Text from 'src/components/text';
import MainView from 'src/components/main-view';
import useDashboardLogic from './hooks/useDashboardLogic';
import countryItem from './components/country-item';
import { CountryType } from 'types';

const Dashboard = () => {
  const { countryList, renderItem } = useDashboardLogic();

  if (!countryList) {
    return (
      <MainView>
        <Text>Fetching Weather...</Text>
      </MainView>
    );
  }

  return (
    <MainView>
      <FlatList
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        data={countryList}
      />
    </MainView>
  );
};

export default Dashboard;
