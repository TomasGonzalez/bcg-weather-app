import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

import CONFIG from 'config';
import useStore from 'src/stores/global-store';
import client from 'src/api/weather-client';
import { CountryType } from 'types';

/**
 * useLoadCountries should load the data from all countries
 * inside of the config file and the async storage into the mainStore.
 */

const useLoadCountries = () => {
  const populateCountryList = useStore((store) => store.populateCountryList);
  const [location, setLocation] = useState<null | unknown>(null);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const { defaultLocations } = CONFIG;

  const formatLocationIds = (locations: typeof defaultLocations) => {
    const locationIds = locations.reduce(
      (acc, location) => (acc ? `${acc},${location.id}` : `${location.id}`),
      ''
    );
    return locationIds;
  };

  const fetchCountriesDataByCoords = () => {};

  const fetchCountriesDataById = async (locationIds: string) => {
    try {
      const request = await client.get('group', {
        params: {
          id: locationIds,
        },
      });

      const filteredCountryData = request.data.list.map(
        ({ coord, id, name, main }: CountryType) => ({
          main,
          coord,
          id,
          name,
        })
      );

      populateCountryList(filteredCountryData);
    } catch (err) {
      console.log(err, 'err');
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  useEffect(() => {
    const locationsIds = formatLocationIds(defaultLocations);
    getLocation();
    fetchCountriesDataById(locationsIds);
  }, []);
};

export default useLoadCountries;
