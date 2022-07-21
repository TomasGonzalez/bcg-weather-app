import { LocationType } from './../../../types/index';
import { WeatherLocationType } from 'types';
import { LocationObject } from 'expo-location';

export type WeatherLocationListType = WeatherLocationType[];

export interface StoreType {
  weatherLocationList: WeatherLocationListType | [];
  addWeatherLocations: (weatherLocations: WeatherLocationType[]) => void;
  updateWeatherLocationsByIds: (locationIdList: LocationType[]) => void;
  updateWeatherLocationByCoords: (
    location: LocationObject,
    isUserLocationData: boolean
  ) => void;
  userLocation: LocationObject | null;
  userLocationId: number | null;
  updateUserCoordsWeather: () => void;
  refreshAllWeatherLocationData: () => void;
  refreshing: boolean;
}
