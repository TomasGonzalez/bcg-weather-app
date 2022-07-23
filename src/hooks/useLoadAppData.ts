import { UnitsType } from './../../types/index';
import { useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CONFIG from 'config';
import useStore from 'src/stores/global-store';

const { unitsSettingsDeviceStorage, defaultLocations, locationsDeviceStorage } =
  CONFIG;

/**
 * useLoadWeatherLocations should init the data from all local sources such as
 * the config file (default weatherLocations), the async storage into the mainStore,
 */

const useLoadAppData = () => {
  const updateUserCoordsWeather = useStore(
    (state) => state.updateUserCoordsWeather
  );
  const updateWeatherLocationsByIds = useStore(
    (state) => state.updateWeatherLocationsByIds
  );
  const setUnitSystem = useStore((state) => state.setUnitSystem);

  const loadConfigs = useCallback(async () => {
    const selectedUnit = await AsyncStorage.getItem(unitsSettingsDeviceStorage);
    if (selectedUnit) setUnitSystem(selectedUnit as UnitsType);
  }, []);

  const loadWeatherData = useCallback(async () => {
    const deviceStoredLocations = await AsyncStorage.getItem(
      locationsDeviceStorage
    );

    const selectedLocations = deviceStoredLocations
      ? [...defaultLocations, ...JSON.parse(deviceStoredLocations)]
      : defaultLocations;

    updateWeatherLocationsByIds(selectedLocations);
    updateUserCoordsWeather();
  }, []);

  useEffect(() => {
    loadConfigs();
    loadWeatherData();
  }, [loadWeatherData]);
};

export default useLoadAppData;
