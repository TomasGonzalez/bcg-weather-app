import React from 'react';

import Text from 'src/components/text';
import MainView from 'src/components/main-view';
import useDashboardLogic from './hooks/useDashboardLogic';

const Dashboard = () => {
  const {} = useDashboardLogic();

  return (
    <MainView>
      <Text>Navigation Test Dashboard</Text>
    </MainView>
  );
};

export default Dashboard;
