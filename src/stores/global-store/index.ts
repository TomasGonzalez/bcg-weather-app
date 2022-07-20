import create from 'zustand';

import { WeatherLocationType } from 'types';
import { WeatherLocationListType, StoreType } from './types';

const useStore = create<StoreType>()((set) => ({
  weatherLocationList: null,
  addWeatherLocation: (weatherLocation: WeatherLocationType) =>
    set((state) => ({
      weatherLocationList: [...state.weatherLocationList, weatherLocation],
    })),
  populateWeatherLocationList: (
    newWeatherLocationList: WeatherLocationListType
  ) => set({ weatherLocationList: newWeatherLocationList }),
}));

export default useStore;
