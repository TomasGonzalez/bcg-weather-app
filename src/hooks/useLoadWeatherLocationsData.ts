import { useEffect, useState } from 'react';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
} from 'expo-location';

import CONFIG from 'config';
import useStore from 'src/stores/global-store';
import client from 'src/api/weather-client';

/**
 * useLoadWeatherLocations should init the data from all local sources such as
 * the config file (default weatherLocations), the async storage into the mainStore,
 * and the users locoation.
 */

const useLoadWeatherLocationsData = () => {
  const populateWeatherLocationList = useStore(
    (state) => state.populateWeatherLocationList
  );
  const addWeatherLocation = useStore((state) => state.addWeatherLocation);
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

  const fetchWeatherLocationsDataById = async (locationIds: string) => {
    try {
      const request = await client.get('group', {
        params: {
          id: locationIds,
        },
      });

      populateWeatherLocationList(request.data.list);
    } catch (err) {
      console.log(err, 'err');
    }
  };

  const fetchUserLocataionData = async (lat: number, lon: number) => {
    try {
      const request = await client.get('weather', {
        params: { lat, lon },
      });
      addWeatherLocation({ ...request.data, isUserLocationData: true });
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
    fetchWeatherLocationsDataById(locationsIds);
  }, []);
};

export default useLoadWeatherLocationsData;