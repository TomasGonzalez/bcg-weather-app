import React from 'react';
import { Button } from 'react-native';

import MainView from 'src/components/main-view';
import Text from 'src/components/text';
import styled from 'styled-components';
import useStore from 'src/stores/global-store';

const StyledMainView = styled(MainView)`
  justify-content: center;
  align-items: center;
`;

const SettingWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

function Settings() {
  const unitSystem = useStore((store) => store.unitSystem);
  const updateUnitSystem = useStore((store) => store.updateUnitSystem);
  return (
    <StyledMainView>
      <SettingWrapper>
        <Text>Change Units to:</Text>
        <Button
          title={unitSystem === 'metric' ? 'Imperial' : 'Metric'}
          onPress={() => {
            updateUnitSystem(unitSystem === 'metric' ? 'imperial' : 'metric');
          }}
        />
      </SettingWrapper>
    </StyledMainView>
  );
}

export default Settings;
