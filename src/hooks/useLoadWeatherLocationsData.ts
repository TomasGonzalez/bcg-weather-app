import { useEffect } from 'react';

import CONFIG from 'config';
import useStore from 'src/stores/global-store';

const { defaultLocations } = CONFIG;

/**
 * useLoadWeatherLocations should init the data from all local sources such as
 * the config file (default weatherLocations), the async storage into the mainStore,
 */

const useLoadWeatherLocations = () => {
  const updateUserCoordsWeather = useStore(
    (state) => state.updateUserCoordsWeather
  );
  const updateWeatherLocationsByIds = useStore(
    (state) => state.updateWeatherLocationsByIds
  );

  useEffect(() => {
    updateWeatherLocationsByIds(defaultLocations);
    updateUserCoordsWeather();
  }, []);
};

export default useLoadWeatherLocations;
