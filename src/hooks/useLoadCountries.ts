import { useEffect, useState } from 'react';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
} from 'expo-location';

import CONFIG from 'config';
import useStore from 'src/stores/global-store';
import client from 'src/api/weather-client';
import { CountryType } from 'types';

/**
 * useLoadCountries should init the data from all local sources such as
 * the config file (default countries), the async storage into the mainStore,
 * and the users locoation.
 */

const useLoadCountries = () => {
  const populateCountryList = useStore((state) => state.populateCountryList);
  const addCountry = useStore((state) => state.addCountry);
  const [userLocation, setUserLocation] = useState<null | LocationObject>(null);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const { defaultLocations } = CONFIG;

  const formatLocationIds = (locations: typeof defaultLocations) => {
    const locationIds = locations.reduce(
      (acc, location) => (acc ? `${acc},${location.id}` : `${location.id}`),
      ''
    );
    return locationIds;
  };

  const fetchUserLocataionData = async (lat: number, lon: number) => {
    try {
      const request = await client.get('weather', {
        params: { lat, lon },
      });

      const { main, coord, id, name } = request.data;
      addCountry({ main, coord, id, name, userLocationData: true });
    } catch (err) {
      console.log(err, 'err');
    }
  };

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
    let { status } = await requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    const location = await getCurrentPositionAsync({});
    setUserLocation(location);
  };

  useEffect(() => {
    if (userLocation) {
      fetchUserLocataionData(
        userLocation.coords.latitude,
        userLocation.coords.longitude
      );
    }
  }, [userLocation]);

  useEffect(() => {
    const locationsIds = formatLocationIds(defaultLocations);
    getLocation();
    fetchCountriesDataById(locationsIds);
  }, []);
};

export default useLoadCountries;
