import { WEATHER_API_KEY } from '@env';

const CONFIG = {
  weatherApiURL: 'https://api.openweathermap.org/data/2.5',
  apiKey: WEATHER_API_KEY,
  apiTimeout: 1000,
  defaultLocations: [{ name: 'Berlin' }, { name: 'Santo Domingo' }],
};

export default CONFIG;
