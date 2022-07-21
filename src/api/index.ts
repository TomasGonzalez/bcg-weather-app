import axios from 'axios';
import CONFIG from 'config';

const { defaultUnits, weatherApiURL, apiTimeout, apiKey } = CONFIG;

const client = axios.create({
  baseURL: weatherApiURL,
  timeout: apiTimeout,
  params: {
    appid: apiKey,
    units: defaultUnits,
  },
});

export default client;
