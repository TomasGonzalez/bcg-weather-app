import axios from 'axios';
import CONFIG from 'config';

const { weatherApiURL, apiTimeout, apiKey } = CONFIG;

const client = axios.create({
  baseURL: weatherApiURL,
  timeout: apiTimeout,
  params: {
    appid: apiKey,
  },
});

export default client;
