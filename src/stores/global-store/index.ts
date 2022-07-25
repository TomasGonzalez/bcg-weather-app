import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import CONFIG from 'config';

const useStore = create<StoreType>()((set, get) => ({
  unitSystem: CONFIG.defaultUnits,
  setUnitSystem: async (unit) => {
    await AsyncStorage.setItem(CONFIG.unitsSettingsDeviceStorage, unit);
    set({ unitSystem: unit });
  },
  updateUnitSystem: async (unit) => {
    await get().setUnitSystem(unit);
    get().refreshAllWeatherLocationData();
  },
  weatherLocationList: [],
  userLocationId: null,
  userLocation: null,
  updateUserCoordsWeather: async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Toast.show({
        type: 'error',
        text1: 'Upps! There was an error!',
        text2: "Couldn't fetch the current location wether!",
      });
      return;
    }
    const userLocation = await getCurrentPositionAsync({});
    set({ userLocation });
    get().updateWeatherLocationByCoords(userLocation, true);
  },
  addWeatherLocations: async (weatherLocations: WeatherLocationType[]) => {
    const filteredWeatherLocationList = get().weatherLocationList.filter(
      (weatherLocation: WeatherLocationType) =>
        !weatherLocations.some(
          (updatedWeatherLocation: WeatherLocationType) =>
            weatherLocation.id === updatedWeatherLocation.id
        )
    );

    const newWeatherLocationList = [
      ...filteredWeatherLocationList,
      ...weatherLocations,
    ];

    const locationsIdsToSave = newWeatherLocationList
      .filter(
        (weatherLocation: WeatherLocationType) =>
          !CONFIG.defaultLocations
            .map(({ id }: LocationType) => id)
            .includes(weatherLocation.id) && !weatherLocation.isUserLocationData
      )
      .map(({ id }: LocationType) => ({ id }));

    if (locationsIdsToSave.length) {
      await AsyncStorage.setItem(
        'bcg-weather-saved-locations',
        JSON.stringify(locationsIdsToSave)
      );
    }
    set({
      weatherLocationList: newWeatherLocationList,
    });
  },
  updateWeatherLocationByCoords: async (
    { coords }: LocationObject,
    isUserLocationData = false
  ) => {
    set({ refreshing: true });
    try {
      const { data } = await client.get('weather', {
        params: {
          lat: coords.latitude,
          lon: coords.longitude,
          units: get().unitSystem,
        },
      });
      get().addWeatherLocations([{ ...data, isUserLocationData }]);
      if (isUserLocationData) set({ userLocationId: data.id });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Upps! There was an error!',
        text2:
          'There was an error while fetching weather. Our team is working on it!',
      });
      console.log(err, 'err'); //send error to sentry or something.
    }
    set({ refreshing: false });
  },
  updateWeatherLocationsByIds: async (locationsIdList: LocationType[]) => {
    set({ refreshing: true });
    try {
      const { data } = await client.get('group', {
        params: {
          id: formatLocationIds(locationsIdList),
          units: get().unitSystem,
        },
      });

      //Pass the isUserLocationData flag
      const listWithUserLocationData = data.list.map(
        (location: WeatherLocationType) =>
          location.id === get().userLocationId
            ? { ...location, isUserLocationData: true }
            : location
      );

      get().addWeatherLocations(listWithUserLocationData);
    } catch (err) {
      const errMessage =
        // @ts-ignore For some reason "err: any" crashes on web.
        err?.code === 'ERR_BAD_REQUEST'
          ? {
              type: 'error',
              text1: 'Error',
              text2: 'Seems that the entered Id is not valid!',
            }
          : {
              type: 'error',
              text1: 'Upss! There Was an error while fetching weather data!',
              text2: 'Our team is working on it!',
            };

      Toast.show(errMessage);
      console.log(err, 'err'); //send error to sentry or something.
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
