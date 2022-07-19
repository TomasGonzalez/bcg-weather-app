import { useEffect } from 'react';

import CONFIG from 'config';
import useStore from 'src/stores/global-store';

/**
 * useLoadCountries should load the data of all countries
 * inside of the config file and the async storage into the mainStore.
 */

const useLoadCountries = () => {
  const populateCountryList = useStore((store) => store.populateCountryList);
  const { defaultLocations } = CONFIG;

  useEffect(() => {
    populateCountryList(defaultLocations);
  }, []);
};

export default useLoadCountries;
