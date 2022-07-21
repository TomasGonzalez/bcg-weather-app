interface SysType {
  weatherLocation?: string;
  id: number;
  sunrise?: number;
  sunset?: number;
  type?: number;
}

interface WeatherType {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface MainType {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface WeatherLocationType {
  base: string;
  name?: string;
  coord?: Record<string, number>;
  main?: MainType;
  isUserLocationData?: boolean;
  wind: Record<string, number>;
  clouds: Record<string, number>;
  cod: number;
  dt: number;
  id: number;
  weather: WeatherType[];
  visibility: number;
  timezone: number;
  sys: SysType;
}

export interface LocationType {
  id: number;
}

//Units type uitls
export type UnitsType = 'metric' | 'imperial' | 'standar';

export enum UnitsEnum {
  metric = 'C',
  imperial = 'F',
  standar = 'K',
}

export interface ConfigType {
  weatherApiURL: string;
  apiKey: string;
  apiTimeout: number;
  defaultLocations: LocationType[];
  defaultUnits: UnitsType;
}
