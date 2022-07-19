export interface CountryType {
  name?: string;
  coord?: Record<string, number>;
  main?: Record<string, number>;
  id: number;
  userLocationData?: boolean;
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
  defaultLocations: Record<string, unknown>[];
  defaultUnits: UnitsType;
}
