import create from 'zustand';

import { CountryType } from 'types';
import { CountryListType, StoreType } from './types';

const useStore = create<StoreType>()((set) => ({
  countryList: [{}],
  addCountry: (country: CountryType) =>
    set((state) => ({ countryList: [...state.countryList, country] })),
  populateCountryList: (newCountryList: CountryListType) =>
    set({ countryList: newCountryList }),
}));

export default useStore;
