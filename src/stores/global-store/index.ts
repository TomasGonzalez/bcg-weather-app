import create from 'zustand';
import {
  getCurrentPositionAsync,
  LocationObject,
  requestForegroundPermissionsAsync,
} from 'expo-location';

import { WeatherLocationType } from 'types';
import { StoreType } from './types';
import { formatLocationIds } from 'src/utils/formatIds';
import client from 'src/api';
import { LocationType } from './../../../types/index';

const useStore = create<StoreType>()((set, get) => ({
  weatherLocationList: [],
  userLocationId: null,
  userLocation: null,
  updateUserCoordsWeather: async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Display error message'); //alert
      return;
    }
    const userLocation = await getCurrentPositionAsync({});
    set({ userLocation });
    get().updateWeatherLocationByCoords(userLocation, true);
  },
  addWeatherLocations: (weatherLocations: WeatherLocationType[]) =>
    set((state) => {
      const filteredWeatherLocationList = state.weatherLocationList.filter(
        (weatherLocation: WeatherLocationType) =>
          !weatherLocations.some(
            (updatedWeatherLocation: WeatherLocationType) =>
              weatherLocation.id === updatedWeatherLocation.id
          )
      );
      return {
        weatherLocationList: [
          ...filteredWeatherLocationList,
          ...weatherLocations,
        ],
      };
    }),
  updateWeatherLocationByCoords: async (
    { coords }: LocationObject,
    isUserLocationData = false
  ) => {
    set({ refreshing: true });
    try {
      const { data } = await client.get('weather', {
        params: { lat: coords.latitude, lon: coords.longitude },
      });
      get().addWeatherLocations([{ ...data, isUserLocationData }]);
      if (isUserLocationData) set({ userLocationId: data.id });
    } catch (err) {
      console.log(err, 'err');
    }
    set({ refreshing: false });
  },
  updateWeatherLocationsByIds: async (locationsIdList: LocationType[]) => {
    set({ refreshing: true });
    try {
      const { data } = await client.get('group', {
        params: {
          id: formatLocationIds(locationsIdList),
        },
      });

      const listWithUserLocationData = data.list.map(
        (location: WeatherLocationType) =>
          location.id === get().userLocationId
            ? { ...location, isUserLocationData: true }
            : location
      );

      get().addWeatherLocations(listWithUserLocationData);
    } catch (err) {
      console.log(err, 'err');
    }
    set({ refreshing: false });
  },
  refreshing: false,
  refreshAllWeatherLocationData: () => {
    const ids = get().weatherLocationList.map(({ id }) => ({
      id,
    }));
    get().updateWeatherLocationsByIds(ids);
  },
}));

export default useStore;
