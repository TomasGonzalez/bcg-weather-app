import { CountryType } from 'types';

export type CountryListType = CountryType[];

export interface StoreType {
  countryList: CountryListType | null;
  addCountry: (country: CountryType) => void;
  populateCountryList: (newCountryList: CountryListType) => void;
}
