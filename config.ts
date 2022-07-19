import { ConfigType } from './types/index';
import { WEATHER_API_KEY } from '@env';

const DEFAULT_LOCATIONS = [
  { id: 2950159 }, //Berlin
  { id: 3492908 }, //Santo Domingo
];

const CONFIG: ConfigType = {
  weatherApiURL: 'https://api.openweathermap.org/data/2.5',
  apiKey: WEATHER_API_KEY,
  apiTimeout: 1000,
  defaultLocations: DEFAULT_LOCATIONS,
  defaultUnits: 'metric',
};

export default CONFIG;
