import { CountryType } from 'types';

export type CountryListType = CountryType[];

export interface StoreType {
  countryList: CountryListType;
  addCountry: (country: CountryType) => void;
  populateCountryList: (newCountryList: CountryListType) => void;
}
