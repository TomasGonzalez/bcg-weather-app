import { WeatherLocationType } from 'types';

export type WeatherLocationListType = WeatherLocationType[];

export interface StoreType {
  weatherLocationList: WeatherLocationListType | null;
  addWeatherLocation: (weatherLocation: WeatherLocationType) => void;
  populateWeatherLocationList: (
    newWeatherLocationList: WeatherLocationListType
  ) => void;
}
